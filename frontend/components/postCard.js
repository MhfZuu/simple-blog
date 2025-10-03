'use client';

import { useRouter } from 'next/navigation';

export default function PostCard({ title, content, id }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/post/${id}`);
  };

  return (
    <div
      className="bg-white border-4 border-black rounded-lg p-6 shadow-[6px_6px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_#000] transition-transform"
      onClick={handleClick}
    >
      <h2 className="text-2xl font-extrabold text-black">{title}</h2>
      <p className="text-gray-800 mt-3">{content}</p>
    </div>
  );
}
