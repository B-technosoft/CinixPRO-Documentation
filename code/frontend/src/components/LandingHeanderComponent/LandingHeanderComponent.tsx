import { LazyLoadImage } from "react-lazy-load-image-component";

import logo5 from "../../assets/logos/logo-5.svg";
import logo6 from "../../assets/logos/logo-6.svg";
import { useCallback, useEffect, useState } from "react";

const LandingHeanderComponent = () => {
  const [isScrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 flex justify-center py-[20px] ${
        isScrolled ? "bg-white shadow-md" : ""
      }`}
    >
      <nav className="w-3/4 flex justify-between items-center">
        <a href="#home" className="flex justify-center items-center">
          {isScrolled ? (
            <LazyLoadImage
              effect="blur"
              src={logo5}
              alt="logo5"
              className="w-[8rem]"
            />
          ) : (
            <LazyLoadImage
              effect="blur"
              src={logo6}
              alt="logo6"
              className="w-[8rem]"
            />
          )}
        </a>
        <div
          className={`flex gap-12 text-xl 
          ${isScrolled ? "text-black" : "text-white"}
        `}
        >
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#check-demo">Check Demo</a>
          <a href="#contact">Contact</a>
        </div>
        <a
          href=""
          className={`text-center flex justify-center items-center h-full rounded-none w-40 drop-shadow-xl ${
            isScrolled ? "bg-[#0da574]" : "bg-white"
          } ${
            isScrolled ? "text-white" : ""
          } transition-colors duration-500 ease-in-out hover:bg-[#001f3f] hover:text-white`}
        >
          Get Started
        </a>
      </nav>
    </header>
  );
};

export default LandingHeanderComponent;
