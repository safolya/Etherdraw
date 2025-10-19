import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateUsersSchema, SigninSchema, RoomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import { authMiddle as middleware } from "./middleware";

const app = express();
const port = 3001;

// --- FIX 1: Add this middleware to parse JSON request bodies ---
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from HTTP backend!");
});

// --- FIX 2: Make the handler 'async' and use 'await' ---
app.post("/signup", async (req, res) => {
  const parseddata = CreateUsersSchema.safeParse(req.body);

  if (!parseddata.success) {
    return res.status(400).json({ // Use a 400 status for bad input
      message: "incorrect inputs", 
    });
  }

  // --- FIX 3: Wrap the 'await' in the 'try...catch' block ---
  try {
    const user = await prismaClient.user.create({
      data: {
        username: parseddata.data.username,
        email: parseddata.data.email,
        password: parseddata.data.password, // Remember to HASH passwords
      },
    });

    // --- FIX 4: Send a success response with a token ---
    res.json({
      message: "User created successfully",
      userId: user.id
    });

  } catch (error) {
    // This will now catch errors from Prisma (like "user already exists")
    res.status(411).json({
      message: "User already exists or database error",
    });
  }
});

app.post("/signin", async (req, res) => { // Made async
  const parseddata = SigninSchema.safeParse(req.body);
  if (!parseddata.success) {
    return res.status(400).json({
      message: "incorrect inputs",
    });
  }

  const user = await prismaClient.user.findFirst({
    where:{
      username:parseddata.data.username,
      password:parseddata.data.password
    }
  });

  if (!user) {
    return res.status(401).json({
      message: "invalid credentials"
    });
  }
  const userId = user?.id; 

  const token = jwt.sign({ userId }, JWT_SECRET);
  res.json({
    token: token,
  });
});

app.post("/room", middleware, async (req, res) => {
  const parsedData = RoomSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(400).json({
      message: "incorrect inputs",
    });
  }
  // @ts-ignore
   const userId = req.userId;
   try {
      const room = await prismaClient.room.create({
        data:{
          slug:parsedData.data.room,
          adminId:userId
        }
      })
   } catch (error) {
     res.json({
       message: "room already exists"
     })
   }


  // Add your room creation logic here
  res.json({ message: "Room logic not implemented" });
});

// This will only run if the server doesn't crash
app.listen(port, () => {
  console.log(`HTTP backend listening at http://localhost:${port}`);
});
