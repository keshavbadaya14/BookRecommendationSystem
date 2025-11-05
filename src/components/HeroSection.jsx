import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const books = [
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    img: "https://images-na.ssl-images-amazon.com/images/I/81eB+7+CkUL.jpg",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    img: "https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    img: "https://images-na.ssl-images-amazon.com/images/I/71aFt4+OTOL.jpg",
  },
  {
    title: "Educated",
    author: "Tara Westover",
    img: "https://images-na.ssl-images-amazon.com/images/I/81WojUxbbFL.jpg",
  },
];

const HeroSection = () => {
  return (
    <section className="bg-[rgba(255,196,107,0.3)] w-[1520px] h-[765px] mx-auto py-16 px-10 flex flex-col md:flex-row items-center justify-between">
      <div className="md:w-[35%] mb-10 md:mb-0 ml-28">
        <p className="md:text-2xl mb-2 text-4xl font-bold">Latest Picks</p>
        <h1 className="text-6xl md:text-7xl font-bold text-black leading-tight mb-6">
          Ignite Your Mind One <br /> Page At <br /> a Time
        </h1>
        <p className="text-lg md:text-xl text-gray-800 mb-8 w-[300px]">
          Dive into handpicked books that inspire, inform, and entertain.
          Discover a new favorite every day.
        </p>
        <button className="bg-[#ffc46b] text-black px-8 py-4 text-base md:text-lg hover:bg-[#ffac2f] font-semibold hover:opacity-90 transition-all">
          DISCOVER NOW
        </button>
      </div>

      <div className="md:w-[60%] relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={80}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 80 },
            768: { slidesPerView: 2, spaceBetween: 84 },
            1024: { slidesPerView: 3, spaceBetween: 84 },
          }}
          className="book-swiper"
        >
          {books.map((book, index) => (
            <SwiperSlide key={index}>
              <div className="min-w-[300px] bg-white shadow rounded-md overflow-hidden mx-auto max-w-[300px] ">
                <img
                  src={book.img}
                  alt={book.title}
                  className="w-full h-[450px] object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-xl">{book.title}</h3>
                  <p className="text-md text-gray-600">{book.author}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button className="swiper-button-prev-custom absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-3 text-white  bg-opacity-20 rounded-full hover:bg-opacity-50 transition-all cursor-pointer">
          <ChevronLeft size={30} />
        </button>
        <button className="swiper-button-next-custom absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-3 text-white bg-opacity-20 rounded-full hover:bg-opacity-50 transition-all cursor-pointer">
          <ChevronRight size={30} />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
