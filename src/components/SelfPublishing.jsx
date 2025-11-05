import React from "react";

function SelfPublishing() {
  return (
    <>
      <section class="bg-gray-50 py-16">
        <div class="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          {/* Left: Image */}
          <div class="md:w-1/2 mb-10 md:mb-0 flex justify-center">
            <img
              src="https://websitedemos.net/book-store-04/wp-content/uploads/sites/1029/2022/02/publisher-image.png"
              alt="Typewriter"
              class=" h-[450px] md:w-[450px] object-contain ml-[120px]"
            />
          </div>

          {/* Right: Text Content */}
          <div class="md:w-1/2 text-center md:text-left">
            <p class="text-gray-600 font-semibold w-[600px] h-[18px] text-2xl mb-8">
              Become Our Partner
            </p>
            <h2 class="text-3xl md:text-4xl w-[600px] h-[93px] font-bold noto-serif mb-4 leading-snug">
              Self - Publishing And Book
              <br class="hidden md:block" /> Writing
            </h2>
            <p class="text-gray-600 mb-6 w-[572px] h-[67.9px]">
              Share your story with the world—our platform empowers authors to
              write, publish, and distribute their books with ease and creative
              freedom. Start your journey with us today.
            </p>
            <div className="mt-10">
              <a
                href="#contact"
                class="bg-[#ffc46b] text-black font-semibold px-7 py-4 hover:bg-[#ffac2f] transition duration-300 "
              >
                CONTACT NOW
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SelfPublishing;
