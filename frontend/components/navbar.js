'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-10 transition-all duration-300 mx-auto ${
        scrolled
          ? 'my-2 w-[80%] bg-yellow-200 border-4 border-black shadow-[6px_6px_0px_#000]'
          : 'w-full bg-white border-b-4 border-black'
      }`}
    >
      <div className="flex justify-end p-4">
        <Link href="/new-post">
          <div className="cursor-pointer bg-blue-400 border-4 border-black rounded-md px-4 py-2 shadow-[4px_4px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000] transition-transform">
            <p className="text-black font-semibold">Profil Saya</p>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
