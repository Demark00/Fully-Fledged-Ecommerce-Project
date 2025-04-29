'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Banner = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="banners mt-5">
        <Link href='/'>
          <Image
            src="https://res.cloudinary.com/dyozhx3tg/image/upload/v1745908548/Group-33704_nyeil7.jpg"
            alt=""
            width={1500}
            height={400}
            className="w-full h-auto object-cover"
          />
        </Link>

        <div className="downside-banners mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mx-5">
          <Link href='/'>
            <Image
              src="https://res.cloudinary.com/dyozhx3tg/image/upload/v1745908548/pharmacy-WEB_ufdwto.jpg"
              alt=""
              width={380}
              height={200}
              className="w-full h-auto object-cover"
            />
          </Link>
          <Link href='/'>
            <Image
              src="https://res.cloudinary.com/dyozhx3tg/image/upload/v1745908548/Pet-Care_WEB_tx5dl6.jpg"
              alt=""
              width={380}
              height={200}
              className="w-full h-auto object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Banner
