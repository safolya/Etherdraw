import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateUsersSchema, SigninSchema, RoomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import { authMiddle as middleware } from "./middleware";
import bcrypt from "bcrypt";

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

  const exsistingUser=await prismaClient.user.findUnique({
    where:{
      username:parseddata.data.username,
      email:parseddata.data.email
    }
  })
  if(exsistingUser){
    return res.status(400).json({
      message:"username and email already taken"
    })
  }

  // --- FIX 3: Wrap the 'await' in the 'try...catch' block ---
  try {
    bcrypt.hash(parseddata.data.password, 10, async function (err, hash) {
      // Store hash in your password DB.
      const user = await prismaClient.user.create({
        data: {
          username: parseddata.data.username,
          email: parseddata.data.email,
          password: hash, // Remember to HASH passwords
        },
      });
      res.json({
        message: "User created successfully",
        userId: user.id
      });
    });

    // --- FIX 4: Send a success response with a token ---


  } catch (error) {
    // This will now catch errors from Prisma (like "user already exists")
    res.status(411).json({
      message: "Something went wrong",
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
    where: {
      username: parseddata.data.username,
    }
  });
  //@ts-ignore
  bcrypt.compare(parseddata.data.password, user?.password, (err, result) => {
    if (result) {
      const userId = user?.id;
      const token = jwt.sign({ userId }, JWT_SECRET);
      res.json({
        token: token,
      });
    }else{
      return res.status(411).json({
        message:"incorrect password"
      })
    }
  })

  if (!user) {
    return res.status(401).json({
      message: "invalid credentials"
    });
  }

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
      data: {
        slug: parsedData.data.room,
        adminId: userId
      }
    })
    res.json({
      roomId:room.id
    })
  } catch (error) {
    res.json({
      message: "room already exists"
    })
  }
});

app.get("/chats/:roomId", middleware, async (req , res)=>{
  const roomId = Number(req.params.roomId);
  const chats = await prismaClient.chat.findMany({
    where:{
      roomId:roomId
    },
    orderBy:{
      id:'desc'
    },
    take:50
  });
  res.json({
    chats
  });
});

// This will only run if the server doesn't crash
app.listen(port, () => {
  console.log(`HTTP backend listening at http://localhost:${port}`);
});
