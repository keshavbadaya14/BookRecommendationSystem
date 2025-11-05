import React from "react";

const categories = [
  {
    title: "Religion & Spirituality",
    img: "https://media.istockphoto.com/id/1313456479/photo/man-and-soul-yoga-lotus-pose-meditation-on-nebula-galaxy-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=kBFnEX0koqiL50oQI9-xfgzLa4TJxbh1lERTriIfMwY=",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    title: "Teen & Young Adult",
    img: "https://media.istockphoto.com/id/2167307385/photo/creative-team-operating-professional-camera-in-modern-studio.webp?a=1&b=1&s=612x612&w=0&k=20&c=f2UhWcSIrr8jxvMAakan4d1QMxREJGQdYfPZdDaAMCQ=",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    title: "Crime & Suspense",
    img: "https://images.unsplash.com/photo-1590962413662-21a4c35d370a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNyaW1lJTIwYW5kJTIwc3VzcGVuY2V8ZW58MHx8MHx8fDA%3D",
    colSpan: 1,
    rowSpan: 2,
  },
  {
    title: "Biographies & Memoirs",
    img: "https://images.unsplash.com/photo-1708043489210-6f119a6b862c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fEJpb2dyYXBoaWVzJTIwJTI2JTIwTWVtb2lyc3xlbnwwfHwwfHx8MA%3D%3D",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    title: "Literature & Fiction",
    img: "https://images.unsplash.com/photo-1498019559366-a1cbd07b5160?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZpY3Rpb258ZW58MHx8MHx8fDA%3D",
    colSpan: 2,
    rowSpan: 1,
  },
  {
    title: "Mystery & Thriller",
    img: "https://images.unsplash.com/photo-1523712900580-a5cc2e0112ed?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TXlzdGVyeSUyMCUyNiUyMFRocmlsbGVyfGVufDB8fDB8fHww",
    colSpan: 1,
    rowSpan: 1,
  },
];

const CategoryGrid = () => {
  return (
    <section className="w-[1520px] mx-auto py-16 px-6 bg-[#f8f8f8]">
      <h2 className="text-5xl font-bold text-center mb-10">
        Choose By Category
      </h2>
      <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[575px]">
        {categories.map((category, idx) => (
          <div
            key={idx}
            className={`relative col-span-${category.colSpan} row-span-${category.rowSpan} group overflow-hidden`}
            style={{
              gridColumn: `span ${category.colSpan}`,
              gridRow: `span ${category.rowSpan}`,
            }}
          >
            <img
              src={category.img}
              alt={category.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <h3 className="text-white text-xl font-semibold underline">
                {category.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <button className="bg-[#ffc46b] text-black px-8 py-4 text-base md:text-lg font-semibold hover:opacity-90 hover:hover:bg-[#ffac2f] transition-all mt-[30px]">
          SEE ALL CATEGORIES
        </button>
      </div>
    </section>
  );
};

export default CategoryGrid;
