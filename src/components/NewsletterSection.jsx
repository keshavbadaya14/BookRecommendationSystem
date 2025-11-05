import React from 'react';

const NewsletterSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-24 py-20 bg-[#fce8c8] h-[607px]">
      {/* Left Section */}
      <div className="flex flex-col space-y-6 mb-10 md:mb-0 ml-16">
        <h2 className="text-4xl md:text-5xl mb-16 noto-serif font-bold leading-tight w-[650px] h-[172px]">
          Join Book Lovers <br />
          Community and Get <br />
          Latest Updates
        </h2>
        <div className="flex flex-col sm:flex-row">
          <input
            type="email"
            placeholder="Your Email Address"
            className="bg-white px-6 py-3 sm:w-[400px] text-base border-none outline-none mb-4 sm:mb-0 sm:mr-4"
            style={{width: "500px"}}
          />
          <button className="bg-[#fdb54a] text-black font-semibold px-6 py-3 w-full sm:w-auto">
            SUBSCRIBE
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="relative ">
        <img
          src="https://websitedemos.net/book-store-04/wp-content/uploads/sites/1029/2022/02/subscribe-image.png"
          alt="Book 1"
          className=" md:w-[250px]  "
          style={{width: "448px", height: "407px", marginRight: "60px"}}
        />
       
      </div>
    </div>
  );
};

export default NewsletterSection;
