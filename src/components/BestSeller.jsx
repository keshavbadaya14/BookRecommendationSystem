import React from "react";

function BestSeller() {
  return (
    <>
      <div className="relative w-[1520px] h-[800px] flex items-center justify-center bg-[#fefefe] overflow-hidden">
        {/* Big Transparent Image in Background */}
        <img
          src={
            "https://m.media-amazon.com/images/I/91EirnRPMcL._UF1000,1000_QL80_.jpg"
          }
          alt={"Book Background"}
          className="absolute w-[55%] blur-xs z-10 h-[800px] "
          style={{ marginRight: "700px" }}
        />

        {/* Foreground content */}
        <div className="flex flex-col md:flex-row items-center gap-6 z-10">
          {/* Smaller visible image */}
          <img
            src={
              "https://m.media-amazon.com/images/I/91EirnRPMcL._UF1000,1000_QL80_.jpg"
            }
            alt={"Book Foreground"}
            className="w-[150px] md:w-[400px] shadow-lg ml-32"
          />

          {/* Book Info */}
          <div
            className="text-center md:text-left w-[50%]"
            style={{ marginLeft: "150px", marginRight: "-20px" }}
          >
            <h2 className="text-3xl md:text-xl w-[514px] h-[18px] font-semibold font-serif">
              World’s Best Seller
            </h2>
            <br />
            <h1 className="text-3xl md:text-5xl w-[514px] h-[62.4px] font-bold font-serif">
              A Tale Of Two Cities
            </h1>
            <p className="text-gray-600 text-md mt-2">by Charles Dickens</p>
            <p className="mt-4 text-sm text-gray-700 max-w-md">
              Charles Dickens was a renowned English novelist of the 19th
              century, celebrated for his vivid characters and powerful social
              commentary. His works, including Oliver Twist, A Tale of Two
              Cities, and Great Expectations, highlighted the struggles of the
              poor and criticized the injustices of Victorian society. 
            </p>
            <button className="mt-6 px-8 py-4 bg-[#ffc46b] text-black md:text-lg hover:bg-[#ffac2f] font-semibold transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default BestSeller;
