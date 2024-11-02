import React from "react";
import Link from "next/link"; // Import Next.js Link
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"; // Import Lucide icons

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white py-10">
      <footer className="container mx-auto px-5">
        <div className="flex flex-wrap justify-center text-center md:text-left">
          {/* Links Section */}
          <div className="w-full lg:w-1/4 md:w-1/3 px-4 mb-8">
            <h2 className="title-font font-medium text-white tracking-widest text-lg mb-3">
              Links
            </h2>
            <nav className="list-none space-y-2">
              <li>
                <Link href="/">
                  <span className="text-gray-100 hover:text-white cursor-pointer">
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/jobs">
                  <span className="text-gray-100 hover:text-white cursor-pointer">
                    Jobs
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span className="text-gray-100 hover:text-white cursor-pointer">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-gray-100 hover:text-white cursor-pointer">
                    Contact
                  </span>
                </Link>
              </li>
            </nav>
          </div>

          {/* Privacy & Support Section */}
          <div className="w-full lg:w-1/4 md:w-1/3 px-4 mb-8">
            <h2 className="title-font font-medium text-white tracking-widest text-lg mb-3">
              Legal & Support
            </h2>
            <nav className="list-none space-y-2">
              <li>
                <Link href="/privacy">
                  <span className="text-gray-100 hover:text-white cursor-pointer">
                    Privacy Policy
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <span className="text-gray-100 hover:text-white cursor-pointer">
                    Terms of Service
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/support">
                  <span className="text-gray-100 hover:text-white cursor-pointer">
                    Support
                  </span>
                </Link>
              </li>
            </nav>
          </div>

          {/* Social Links Section */}
       
          <div className="w-full lg:w-1/4 md:w-1/3 px-4 mb-8">
            <h2 className="title-font font-medium text-white tracking-widest text-lg mb-3">
              Address :
            </h2>
            <div className="flex justify-center md:justify-start space-x-4">
              <p>
                Fortunovet Resources Pvt Ltd <br/> Shop No. 1023, Runghta Shopping
                Hub, <br/>National Highway 3, Madhumangal Rd, Suchita Nagar, Kamod
                Nagar, Indira Nagar, Nashik, Maharashtra, India Pin: 422009
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl py-4">
        <div className="w-full px-4 flex justify-center items-center mb-2">
   
            <div className="flex justify-center md:justify-start space-x-4">
              <Link href="#" aria-label="Facebook">
                <span className="text-gray-100 hover:text-white cursor-pointer">
                  <Facebook className="w-6 h-6" />
                </span>
              </Link>
              <Link href="#" aria-label="Twitter">
                <span className="text-gray-100 hover:text-white cursor-pointer">
                  <Twitter className="w-6 h-6" />
                </span>
              </Link>
              <Link href="#" aria-label="Instagram">
                <span className="text-gray-100 hover:text-white cursor-pointer">
                  <Instagram className="w-6 h-6" />
                </span>
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <span className="text-gray-100 hover:text-white cursor-pointer">
                  <Linkedin className="w-6 h-6" />
                </span>
              </Link>
            </div>
          </div>
          <div className="container mx-auto flex justify-center">
            <p className="text-sm text-gray-500">
              © 2024 Peperk.in —
              <span
                className="text-gray-100 hover:text-white ml-1 cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                @oxybrain
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
