'use client';

import { use, useEffect, useState } from 'react';
import axios from 'axios';

export default function PostDetail({ params }) {
  const [isLogin, setIsLogin] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [ctn, setCtn] = useState('');
  const { id } = use(params);

  useEffect(() => {
    setMounted(true);

    const token = localStorage.getItem('token');
    if (token) setIsLogin(true);
    const fecthData = async () => {
      const res = await axios.get(`http://localhost:5050/posts/${id}`);

      if (res.status == 200) {
        setCtn(res.data.post);
      }
    };

    fecthData();
  }, [id]);

  if (!mounted) return null;

  return (
    <div className="bg-yellow-100 min-h-screen flex flex-col items-center justify-center p-10">
      {isLogin && <Navbar />}
      <h1 className="text-4xl font-extrabold text-black mb-10 border-4 border-black px-6 py-3 bg-pink-300 shadow-[6px_6px_0px_#000]">
        Detail Postingan
      </h1>

      <div className="bg-white border-4 border-black rounded-lg p-6 shadow-[6px_6px_0px_#000] transition-transform max-w-3xl w-full">
        <h2 className="text-2xl font-extrabold text-black">{ctn.title}</h2>
        <p className="text-gray-800 mt-3">{ctn.content}</p>
      </div>
    </div>
  );
}
