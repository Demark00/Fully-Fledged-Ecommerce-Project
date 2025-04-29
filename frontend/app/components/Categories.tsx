import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Categories = () => {
  const categories = [
    {
      title: 'Smart Electronics Deals',
      url: 'https://res.cloudinary.com/dzmvas8cy/image/upload/v1745918145/Electronics_foofzp.jpg',
    },
    {
      title: 'Power-Packed Laptops',
      url: 'https://res.cloudinary.com/dzmvas8cy/image/upload/v1745918136/Laptops_ug7oz6.jpg',
    },
    {
      title: 'Fresh Farm Vegetables',
      url: 'https://res.cloudinary.com/dzmvas8cy/image/upload/v1745918135/vegetables_zwsjfe.jpg',
    },
    {
      title: 'Tasty Snack Collection',
      url: 'https://res.cloudinary.com/dzmvas8cy/image/upload/v1745918134/Snacks_pypovm.jpg',
    },
    {
      title: 'Latest Mobile Phones',
      url: 'https://res.cloudinary.com/dzmvas8cy/image/upload/v1745918132/Mobiles_gvweoq.jpg',
    },
    {
      title: 'Elegant Home Furnishings',
      url: 'https://res.cloudinary.com/dzmvas8cy/image/upload/v1745918132/furnitures_lqycud.jpg',
    },
    {
      title: 'Premium Beauty Essentials',
      url: 'https://res.cloudinary.com/dzmvas8cy/image/upload/v1745918131/beautyProducts_pzzjcz.jpg',
    },
    {
      title: 'Trendy Fashion Apparel',
      url: 'https://res.cloudinary.com/dzmvas8cy/image/upload/v1745918129/Clothes_vyjtgs.jpg',
    },
    {
      title: 'Modern Kitchenware',
      url: 'https://res.cloudinary.com/dzmvas8cy/image/upload/v1745919149/utensils_ppkwj7.jpg',
    },
    {
      title: 'Fresh Dairy Delights',
      url: 'https://res.cloudinary.com/dzmvas8cy/image/upload/v1745919149/DairyProducts_wihu0z.jpg',
    },
  ]

  return (
    <div className="mx-auto py-10 max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 poppins-bold">
        Shop by Category
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {categories.map((category, index) => (
          <Link href="/" key={index}>
            <div className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
              <div className="relative w-full h-[160px]">
                <Image
                  src={category.url}
                  alt={category.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="absolute bottom-2 left-2 right-2 flex justify-center">
                <div className="text-center text-sm font-semibold text-white bg-gradient-to-r rounded-full shadow-md backdrop-blur-sm transition-all duration-300 group-hover:scale-105 poppins-semibold">
                  {category.title}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Categories
