import React from "react";
import { useCart } from '../pages/CartContent';
import { FaShoppingBag } from "react-icons/fa";
const books = [
  {
    title: " Rich Dad Poor Dad",
    author: " Robert T. Kiyosaki",
    img: "https://m.media-amazon.com/images/I/81BE7eeKzAL._UF1000,1000_QL80_.jpg",
    price: 18.5,
    pdf_url: "https://drive.google.com/file/d/1_FrM-PVRWsm2c7TSoJzqPVEuAoX83-q-/view"
  },
  {
    title: "The Power of Now",
    author: "Eckhart Tolle",
    img: "https://m.media-amazon.com/images/I/61Ij8nLooNL.jpg",
    price: 20.0,
    pdf_url: "https://ia800406.us.archive.org/4/items/ThePowerOfNowEckhartTolle_201806/The%20Power%20Of%20Now%20-%20Eckhart%20Tolle.pdf"
  },
  {
    title: "1984",
    author: "George Orwell",
    img: "https://m.media-amazon.com/images/I/715WdnBHqYL._UF1000,1000_QL80_.jpg",
    price: 17.0,
    pdf_url: "https://www.clarkchargers.org/ourpages/auto/2015/3/10/50720556/1984.pdf"
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    img: "https://m.media-amazon.com/images/I/81r81MTfTuL._UF1000,1000_QL80_.jpg",
    price: 14.0,
    pdf_url: "https://www.raio.org/TKMFullText.pdf"
  },
  {
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    img: "https://m.media-amazon.com/images/I/61IxJuRI39L.jpg",
    price: 19.0,
    pdf_url: "https://www.cole13.com/wp-content/uploads/2023/03/Think-And-Grow-Rich_2011-06.pdf"
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    img: "https://m.media-amazon.com/images/I/71XEsXS5RlL._UF1000,1000_QL80_.jpg",
    price: 21.5,
    pdf_url:"https://hostnezt.com/cssfiles/general/the-psychology-of-money-by-morgan-housel.pdf"
  },
  {
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    img: "https://m.media-amazon.com/images/I/71rmHeQeuRL._UF1000,1000_QL80_.jpg",
    price: 22.0,
    pdf_url: "https://www.proemergency.com/assets/dokumen/ebook_platinum/20231124142557-The_7_Habits_of_Highly_Effective_Families_(_PDFDrive_com_).pdf"
  },
  {
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    img: "https://m.media-amazon.com/images/I/61157LApbuL.jpg",
    price: 16.0,
    pdf_url: "https://img1.wsimg.com/blobby/go/2ad2e274-a4f3-4a49-a754-b2cc3670307b/downloads/Man_s%20Search%20For%20Meaning%20(%20PDFDrive.com%20).pdf?ver=1614706661817"
  },
];

const BookShowcaseSection = () => {
  const { addToCart } = useCart();

  return (
    <section className="bg-[#f8f8f8] py-20 md:px-12">
      <div className="text-center mb-2 mt-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Discover Your New Book
        </h2>
        <p className="text-gray-500 text-md md:text-lg max-w-xl mx-auto">
          Congue, gravida placeat nibh sunt semper elementum anim Integer lectus
          debitis auctor.
        </p>
      </div>

      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-[2px] w-[1200px]"
        style={{ marginLeft: "110px" }}
      >
        {books.map((book, index) => (
          <div key={index} className="text-left group relative">
            <img
              src={book.img}
              alt={book.title}
              className="h-[428px] w-[285px] object-cover shadow mt-9"
            />
            <button
              className="absolute top-10 right-4 opacity-0 group-hover:opacity-100 transition-all bg-white p-2 rounded-full shadow cursor-pointer"
              onClick={() => addToCart(book)}
            >
              <FaShoppingBag className="text-black" />
            </button>
            <div style={{ lineHeight: "1" }}>
              <h3 className="mt-3 font-semibold text-lg">{book.title}</h3>
              <div className="text-yellow-400">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i}>☆</span>
                ))}
              </div>
              <p className="text-black text-md font-medium mt-1">
                ${book.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button className="bg-[#ffc46b] text-black px-8 py-4 text-base md:text-lg font-semibold hover:opacity-90 hover:hover:bg-[#ffac2f] transition-all ms-[580px] mt-[100px]">
        DISCOVER MORE BOOKS
      </button>
    </section>
  );
};


export default BookShowcaseSection;
