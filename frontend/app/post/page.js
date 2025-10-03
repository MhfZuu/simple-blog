'use client';
import PostCard from '@/components/postCard';
import Navbar from '@/components/navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function PostAll() {
  const [isLogin, setIsLogin] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [ctn, setCtn] = useState([]);

  useEffect(() => {
    setMounted(true);

    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if (token) setIsLogin(true);

    const fetchPost = async () => {
      try {
        const response = await axios.get('http://localhost:5050/posts');
        setCtn(response.data.posts);
        console.log(response.data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPost();
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-yellow-100 min-h-screen flex flex-col items-center justify-center p-10 relative">
      {isLogin && <Navbar />}
      <h1 className="text-4xl font-extrabold text-black mb-10 border-4 border-black px-6 py-3 bg-pink-300 shadow-[6px_6px_0px_#000]">
        Semua Postingan
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {ctn.map((post, index) => (
          <PostCard
            key={index}
            title={post.title}
            content={post.content}
            id={post.id}
          />
        ))}
      </div>
    </div>
  );
}
