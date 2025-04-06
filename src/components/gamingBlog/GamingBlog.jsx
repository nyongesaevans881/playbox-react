"use client"

import React, { useState, useEffect } from 'react';
import './GamingBlog.css';

const GamingBlog = () => {
  const releaseDate = new Date('September 25, 2025 00:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const difference = releaseDate - now;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className='max-md:px-4'>
      <h1 className='text-white py-10 text-4xl uppercase font-extrabold blog-heading'>Let's Talk About Gaming</h1>
      <div className='grid grid-cols-4 gap-4 pt-10 max-md:flex max-md:flex-col max-md:pt-5'>
        <div className='col-span-3'>
          <div className='flex gap-6 max-md:flex-col max-md:items-center'>
            <div>
              <img src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743936148/gta6-4k_csdhvy.jpg" alt="" loading="lazy"className='w-100 h-160 object-cover max-md:w-full max-md:h-100' />
            </div>
            <div className='flex flex-col gap-0'>
              <div className='flex items-center gap-6 max-md:gap-0'>
                <div>
                  <img src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743936148/rockstar_edjmon.png" alt="" loading="lazy"className='h-20 w-20' />
                </div>
                <div>
                  <span className='text-white text-xl font-medium flex items-center gap-2'>
                    <img src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743936147/game_kk5otz.png" alt="" loading="lazy"className='h-8' />
                    Upcomming Game Review
                  </span>
                  <h1 className='m-0 p-0 text-4xl font-extrabold text-gray-300 uppercase max-md:text-2xl'>Grand Theft Auto 6</h1>
                </div>
              </div>
              <div className='flex gap-2 items-center mt-5 text-gray-400 max-w-180'>
                <img src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743936147/icon-1_uy9spc.png" alt="" loading="lazy"className='h-28 w-28' />
                <div>
                  <h3 className='mb-1 text-lg font-bold'>Expected Price & Editions</h3>
                  <p className='text-sm'>GTA 6 is anticipated to launch with multiple editions, including Standard, Deluxe, and Collector’s Editions. Analysts predict a base price of around <span className='font-bold text-secondary'>$70</span>, with premium editions offering exclusive in-game content and bonuses.</p>
                </div>
              </div>
              <div className='flex gap-2 items-center mt-5 text-gray-400 max-w-180'>
                <img src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743936147/icon-2_ofrr1b.png" alt="" loading="lazy"className='h-28 w-28' />
                <div>
                  <h3 className='mb-1 text-lg font-bold'>Immersive Open-World Gameplay</h3>
                  <p className='text-sm'>With a dynamic NPC system, advanced AI, and an expansive Vice City map, GTA 6 promises realistic heists, upgraded driving mechanics, and a deep storyline featuring dual protagonists.</p>
                </div>
              </div>
              <div className='flex gap-2 items-center mt-5 text-gray-400 max-w-180'>
                <img src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743936148/icon-3_dvtqby.png" alt="" loading="lazy"className='h-28 w-28' />
                <div>
                  <h3 className='mb-1 text-lg font-bold'>Massive Online Evolution</h3>
                  <p className='text-sm'>GTA Online is expected to expand significantly with new multiplayer modes, property investments, and criminal empire-building features. Rockstar aims to create a persistent world with real-time updates and evolving storylines.</p>
                </div>
              </div>
              {/* Countdown Timer */}
              <div className='w-full h-30 countdown-container text-white mt-5 max-md:flex max-md:justify-center'>
                <div className='countdown flex gap-4 mt-2'>
                  <div className='flex flex-col items-center border-2 border-[#ff00ff] max-md:w-20  w-25 h-30 justify-center'><span className='font-extrabold text-4xl'>{timeLeft.days}</span> <span>Days</span></div>
                  <div className='flex flex-col items-center border-2 border-[#ff00ff] w-25 max-md:w-20  h-30 justify-center'><span className='font-extrabold text-4xl'>{timeLeft.hours}</span> <span> Hours</span></div>
                  <div className='flex flex-col items-center border-2 border-[#ff00ff] w-25 max-md:w-20  h-30 justify-center'><span className='font-extrabold text-4xl'>{timeLeft.minutes}</span> <span> Minutes</span></div>
                  <div className='flex flex-col items-center border-2 border-[#ff00ff] w-25 max-md:w-20 h-30 justify-center'><span className='font-extrabold text-4xl'>{timeLeft.seconds}</span> <span> Seconds</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-6'>
          <div className='p-2'>
            <img src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743936148/nfs-unbound_fj4h7z.jpg" alt="" loading="lazy"/>
          </div>
          <div className='p-2'>
            <img src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743936148/ps5-accessories_kx4gmn.jpg" alt="" loading="lazy" />
          </div>
          <div className='p-2'>
            <img src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743936148/fc25_ytr89z.jpg" alt="" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamingBlog;
