import { useEffect, useState } from 'react';
import { WS_URL } from '../app/config';

export function useSocket() {
   const [loading, setLoading] = useState(true);
   const [socket , setSocket] = useState<WebSocket | null>(null);

   useEffect(()=>{
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4OWM4MWE3MC0xZjJmLTRkMGQtOTU3NS00YmUyYTJjZTViOTYiLCJpYXQiOjE3NjA5MDg2MTJ9.xt43lh6YyhsOMKj8K9rU1nB2yQoaRvg7Jro15JtjUyM`);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        };
   },[])

   return { loading, socket };
}   