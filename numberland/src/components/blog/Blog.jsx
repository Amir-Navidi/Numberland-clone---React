import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import google from "../../assets/images/blog/google-slide.webp";
import gpt from "../../assets/images/blog/gpt-slide.webp";
import data from "../data/blog";

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = data.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(data.length / articlesPerPage);

  return (
    <div className="lg:max-w-[90%] mx-auto">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop
        navigation
        modules={[Navigation, Pagination]}
        className="sm:rounded-2xl blog-slider"
      >
        <SwiperSlide>
          <Link to="#">
            <img src={gpt} alt="GPT Slide" />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="#">
            <img src={google} alt="Google Slide" />
          </Link>
        </SwiperSlide>
      </Swiper>
      <div className="mt-20 flex items-start justify-evenly flex-wrap gap-y-10 gap-x-2">
        {currentArticles.map((item, index) => (
          <article
            key={index}
            className="flex flex-col shadow-3xl rounded-2xl pb-7 blog-article"
          >
            <Link to={`/blogs/post/${item.urlTitle}`}>
              <div className="h-[40%] relative">
                <div className="flex absolute justify-center gap-x-3 top-[-18.5px] w-full text-white z-10">
                  {item.categories.map((category, idx) => (
                    <Link
                      key={idx}
                      to="#"
                      className="flex items-center px-5 py-1 h-[37px] font-semibold rounded-3xl text-[15px] transition-all duration-400 hover:-translate-y-1/5"
                      style={{ backgroundColor: category.color }}
                    >
                      {category.category}
                    </Link>
                  ))}
                </div>
                <div className="relative group">
                  <img className="rounded-t-3xl w-full" src={item.img} alt="" />
                  <div className="w-full h-full absolute top-0 right-0 bg-black/20 rounded-t-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                </div>
              </div>
            </Link>
            <div className="flex flex-col px-9">
              <div className="flex items-center justify-center gap-x-2 mt-4">
                <i className="fa-solid fa-calendar-days text-[#de8808]"></i>
                <span>{item.date}</span>
              </div>
              <h3 className="text-[21px] font-black mt-4 blog-title text-justify">
                <Link to={`/blogs/post/${item.urlTitle}`}>
                  <div className="underline-hover">{item.title}</div>
                </Link>
              </h3>
              <p
                className="text-justify text-[15px] mt-4 blog-content"
                dangerouslySetInnerHTML={{
                  __html: `❮ ❯ ${item.text.replace(/<\/?p>/g, "")}`,
                }}
              ></p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-10 flex justify-center items-center gap-x-5">
        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-6 py-2 font-semibold bg-[#ffa826] text-white rounded-3xl cursor-pointer"
          >
            قبلی
          </button>
        )}
        <span className="font-bold text-[#007dad] text-sm">
          برگه {currentPage} از {totalPages}
        </span>
        {currentPage < totalPages && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-6 py-2 font-semibold bg-[#ffa826] text-white rounded-3xl cursor-pointer"
          >
            بعدی
          </button>
        )}
      </div>
    </div>
  );
}
