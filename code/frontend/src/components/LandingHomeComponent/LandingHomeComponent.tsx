import { LazyLoadImage } from "react-lazy-load-image-component";

import SmoothScroll from "smooth-scroll";

import screen1 from "../../assets/images/screen-1.png";
import screen2 from "../../assets/images/screen-2.png";
import screen3 from "../../assets/images/screen-3.png";
import logo6 from "../../assets/logos/logo-6.svg";
import LandingHeanderComponent from "../LandingHeanderComponent/LandingHeanderComponent";
import CredentialCardComponent from "../CredentialCardComponent/CredentialCardComponent";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const LandingHomeComponent = () => {
  return (
    <>
      <LandingHeanderComponent />
      <section
        id="home"
        className="bg-[url('/assets/images/hero-bg1.jpg')] bg-center bg-no-repeat bg-cover h-[50rem] flex justify-center"
      >
        <div className="w-3/4 flex items-center justify-center">
          <div className="w-[32rem] text-white flex gap-6 flex-col">
            <p className="text-5xl leading-tight">
              A premium web app design for your website
            </p>
            <p className="text-2xl font-serif">
              There are many variations of passages of lorem ipsum available but
              the majority have suffered alteration in some form.
            </p>
            <p className="text-2xl font-serif">
              Sed quia non numquam eius modi tempora.
            </p>
            <div>
              <a
                href="#check-demo"
                className="inline-flex items-center justify-center h-12 px-6 font-medium text-black tracking-wide transition duration-200 bg-white rounded-lg hover:bg-black hover:text-white focus:shadow-outline focus:outline-none"
              >
                Check Demo
              </a>
            </div>
          </div>
          <div className="bg-[url('/assets/images/hero-img-mac.png')] w-[63%] h-[40rem] bg-contain bg-no-repeat bg-center"></div>
        </div>
      </section>
      <section id="features" className="py-20 flex justify-center">
        <div className="w-3/4 grid grid-cols-2 gap-8 p-4 justify-center items-center">
          <div className="w-[32rem] flex gap-6 flex-col">
            <p className="text-3xl leading-relaxed">
              Your saas web app with just a few clicks
            </p>
            <p className="text-lg">
              There are many variations of passages of lorem ipsum available but
              the majority have suffered alteration in some form.
            </p>
            <p className="text-lg">Sed quia non numquam eius modi tempora.</p>
          </div>
          <LazyLoadImage effect="blur" src={screen1} alt="Screen1" />
          <LazyLoadImage effect="blur" src={screen2} alt="Screen2" />
          <div className="w-[32rem] flex gap-6 flex-col">
            <p className="text-3xl leading-relaxed">
              Your saas web app with just a few clicks
            </p>
            <p className="text-lg">
              There are many variations of passages of lorem ipsum available but
              the majority have suffered alteration in some form.
            </p>
            <p className="text-lg">Sed quia non numquam eius modi tempora.</p>
          </div>
          <div className="w-[32rem] flex gap-6 flex-col">
            <p className="text-3xl leading-relaxed">
              Your saas web app with just a few clicks
            </p>
            <p className="text-lg">
              There are many variations of passages of lorem ipsum available but
              the majority have suffered alteration in some form.
            </p>
            <p className="text-lg">Sed quia non numquam eius modi tempora.</p>
          </div>
          <LazyLoadImage effect="blur" src={screen3} alt="Screen3" />
        </div>
      </section>
      <CredentialCardComponent />
      <section id="contact" className="py-20 flex justify-center items-center">
        <div className="w-3/4 flex justify-between flex-col gap-8">
          <div className="flex justify-center items-center flex-col">
            <h3 className="text-center text-[2.333em] leading-[1.3em]">
              Get in touch
            </h3>
            <p className="font-serif">Contact us</p>
          </div>
          <div className="flex justify-center">
            <div className="flex flex-1 justify-center items-start">
              <LazyLoadImage
                effect="blur"
                src="https://tanshcreative.com/saasflix-lp-preview/saasflix/assets/images/contact-img.png"
                alt="contact-img"
              />
            </div>
            <div className="flex flex-1 flex-col">
              <form
                action=""
                method="post"
                onSubmit={(e) => e.preventDefault()}
                className="flex gap-3 flex-col"
              >
                <input
                  type="text"
                  placeholder="john.doe@gmail.com"
                  className="input input-bordered w-full rounded-none border-2"
                />
                <textarea
                  className="textarea textarea-bordered rounded-none border-2"
                  placeholder="Write Message"
                  rows={5}
                ></textarea>
                <div>
                  <button
                    type="submit"
                    className="btn btn-active btn-neutral w-[20%]"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <footer className="py-20 bg-[url('/assets/images/footer-bg.png')] bg-[#001f3f] flex text-white justify-center">
        <div className="w-3/4 flex gap-8">
          <div className="flex flex-col flex-1 gap-6 font-serif">
            <LazyLoadImage
              effect="blur"
              src={logo6}
              alt="logo6"
              className="w-[10rem]"
            />
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Consequatur officia debitis eos deleniti et nihil tempore, ipsam
              rerum iusto ea vitae. Quia, perspiciatis? Fugiat neque corporis
              fuga nihil, commodi dolorum?
            </p>
            <p>&copy; 2020 Saasflix. All rights reserved.</p>
          </div>
          <div className="flex flex-col flex-1 gap-6 font-serif">
            <a href="" className="text-2xl h-[3rem]">
              Company
            </a>
            <a href="">Features</a>
            <a href="">Plan</a>
            <a href="">Blog</a>
            <a href="">Contact</a>
          </div>
          <div className="flex flex-col flex-1 gap-6 font-serif">
            <a href="" className="text-2xl h-[3rem]">
              Support
            </a>
            <a href="">Careers</a>
            <a href="">Help</a>
            <a href="">Privacy Policy</a>
            <a href="">Terms</a>
          </div>
          <div className="flex flex-col flex-1 gap-6 font-serif">
            <a href="" className="text-2xl h-[3rem]">
              Newsletter
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingHomeComponent;
