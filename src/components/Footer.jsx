import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 md:px-20 h-[483px]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Logo */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-white text-2xl font-bold">
            <div className=" text-black p-1 rounded" style={{marginLeft: "40px", marginTop: "60px"}}>
              <span role="img" aria-label="owl" style={{fontSize: "34px"}}>🦉</span>
            </div>

            <div style={{ fontSize: "34px", marginTop: "60px"}}>
                BookWise
            </div>
            
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row gap-12 text-sm" style={{marginTop: "60px", marginRight: "180px", gap: "180px"}}>
          <div>
            <h4 className="text-[21px] font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-[#ffb43a] text-[16px] flex flex-col gap-0" style={{marginTop: "37px"}}>
              <Link to="/"><li>Home</li></Link>
              <Link to="/your-books"><li>Your Books</li></Link>
              <Link to="/predict"><li>Predict Time</li></Link>
              <Link to="/about"><li>About</li></Link>
              <Link to="/contact"><li>Contact</li></Link>
            </ul>
          </div>
          <div>
            <h4 className="text-[21px] font-semibold mb-3">Explore</h4>
            <ul className="space-y-2 text-[#ffb43a] text-[16px] " style={{marginTop: "37px"}}>
              <li>Bestsellers</li>
              <li>On Sale</li>
              <li>Editors Pick</li>
              <li>Best Of 2022</li>
              <li>Featured</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[21px] font-semibold mb-3">Help</h4>
            <ul className="space-y-2 text-[#ffb43a] text-[16px]" style={{marginTop: "37px"}}>
              <li>Track Order</li>
              <li>Delivery & Returns</li>
              <li>FAQs</li>
              <li>Community</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{position: "relative", marginTop: "90px"}}>
        <hr style={{}}/>
      <div className=" border-gray-700 mt-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Copyright */}
        <p className="text-sm text-gray-300" style={{marginLeft: "70px"}}>
          Copyright © 2025 Book Worms | Powered by <br />Book Worms
        </p>

        {/* Payment Icons */}
        <div className="flex items-center gap-2" style={{marginRight: "160px"}}>
          <img src= "https://websitedemos.net/book-store-04/wp-content/uploads/sites/1029/2022/02/payment-image.png" alt="MasterCard" className="h-6" />
          
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4 text-white text-lg" style={{marginRight: "100px"}}>
          <FaFacebookF />
          <FaTwitter />
          <FaInstagram />
        </div>
      </div>
      </div>
      
    </footer>
  );
}
