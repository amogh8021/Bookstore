import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import AuthorSection from "./AuthorSection";
import Recommendation from "./Recommendation";
import CaategorySection from "./CaategorySection";
import FeaturedBooks from "./FeaturedBooks";
import BestSellers from "./BestSellers";
import Offers from "./Offers";
import Services from "./Services";
import Testimonials from "./Testimonials";
import Newsletter from "./NewsLetter";
import Footer from "./Footer";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

import img1 from "./assets/bookst.jpg";
import img2 from "./assets/bookst1.jpg";
import img3 from "./assets/bookst2.jpg";
import img4 from "./assets/bookst1.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="container flex p-8 gap-4 md:mx-auto h-full px-6 items-center">
        <div className="left flex flex-col max-w-xl animate-fadeIn">
          <h1 className="font-bold font-serif text-primary text-5xl leading-tight tracking-wide">
            Find Your <br /> <span className="text-accent">Next Book</span>
          </h1>

          <h2 className="hidden md:flex font-medium text-xl leading-relaxed tracking-wide text-secondary mt-4">
            Discover a world where every page brings a new adventure.
            <br /> At BookStore, we curate a diverse collection of books.
          </h2>

          <button
            onClick={() => navigate("/shop")}
            className="hidden md:flex items-center justify-center bg-primary hover:bg-slate-800 transition-all duration-300 h-12 w-60 text-white p-5 align-middle rounded-full shadow-lg tracking-wide leading-tight mt-8 transform hover:scale-105"
          >
            Explore Now <IoIosArrowRoundForward className="ml-2 text-2xl" />
          </button>
        </div>

        {/* Swiper Hero Banner */}
        <div className="swiper w-full mt-8 md:mt-0">
          <Swiper
            modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
            pagination={{ clickable: true }}
            spaceBetween={30}
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="w-full py-8"
          >
            {[img1, img2, img3, img4].map((img, idx) => (
              <SwiperSlide key={idx} className="w-64 md:w-80">
                <img
                  src={img}
                  alt={`Book ${idx + 1}`}
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl border-4 border-white"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Mobile Content */}
      <div className="content px-8 pb-8 md:hidden text-center">
        <h2 className="font-medium text-lg leading-relaxed tracking-wide text-secondary mt-4">
          Discover a world where every page brings a new adventure.
          <br /> At BookStore, we curate a diverse collection of books.
        </h2>

        <button
          onClick={() => navigate("/shop")}
          className="flex items-center justify-center bg-primary h-12 w-full text-white align-middle rounded-full shadow-md tracking-wide leading-tight mt-6 hover:bg-slate-800 transition"
        >
          Explore Now <IoIosArrowRoundForward className="ml-2 text-xl" />
        </button>
      </div>

      <AuthorSection />
      <Recommendation />
      <CaategorySection />
      <FeaturedBooks />
      <BestSellers />
      <Offers />
      <Services />
      <Testimonials />
      <Newsletter />
      <Footer />
    </>
  );
};

export default HeroSection;
