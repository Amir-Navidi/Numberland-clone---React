import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import blogData from "../../data/blog";
import { Link } from "react-router-dom";

export default function BlogPost() {
  const { slug } = useParams();
  const location = window.location.href;
  const post = blogData.find((item) => item.urlTitle === slug);
  const inputRef = useRef(null);

  useEffect(() => {
    document.body.style.backgroundColor = "#ffffff";
  }, []);

  const handleCopy = () => {
    if (inputRef.current) {
      inputRef.current.select();
      inputRef.current.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(location);
    }
  };

  return (
    <div className="blog-post flex flex-col gap-y-7 max-w-[700px] mx-auto px-1 xs:px-4 sm-md:px-0 ">
      <div className="relative">
        <div className="absolute top-5 right-5 hidden items-center gap-x-2 xs:flex">
          {post.categories.map((category, idx) => (
            <Link
              key={idx}
              to="#"
              className="flex items-center px-3 sm-md:px-5 sm-md:py-1 h-[37px] font-semibold !text-white rounded-3xl text-[13px] sm-md:text-[15px] transition-all duration-400 hover:-translate-y-1/5"
              style={{ backgroundColor: category.color }}
            >
              {category.category}
            </Link>
          ))}
        </div>
        <img className="xs:rounded-2xl" src={post.img} alt="" />
        <div className="flex gap-x-5 mt-6 text-[15px] px-3 xs:px-0 flex-col gap-y-3 xs:flex-row">
          <Link className="hover:text-[#de8808] transition-all duration-300 gap-x-2 items-center author hidden sm-md:inline-flex">
            <img src={post.writer.img} className="size-7 rounded-full" alt="" />
            <b>{post.writer.writeName}</b>
          </Link>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-calendar-days text-[#de8808]"></i>
            <b>انتشار:</b>
            <span className="text-sm">{post.date}</span>
          </div>
          <div className="flex items-center gap-2 text-[15px]">
            <i className="fa-solid fa-calendar-days text-[#de8808]"></i>
            <b>بروزرسانی:</b>
            <span className="text-sm">{post.updateDate}</span>
          </div>
        </div>
      </div>
      <div className="px-4 xs:px-0 blog-post flex flex-col gap-y-4 xs:gap-y-7 max-w-[700px] mx-auto">
        <h1>{post.title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: post.text.replace(/className=/g, "class="),
          }}
          className="flex flex-col gap-y-7 content"
        ></div>
      </div>
      <div className="border-t border-b border-[#e5e5e5] py-10 mt-12 flex flex-col gap-y-8 items-center">
        <div className="flex flex-col gap-y-3 xs:flex-row items-center gap-x-4">
          <b className="mt-1 text-sm sm-md:text-base">اشتراک گذاری مطلب:</b>
          <div className="flex gap-x-2">
            <Link className="bg-[#00ACED] p-2 size-8 rounded-full flex items-center justify-center">
              <i className="fa-brands fa-twitter !text-white"></i>
            </Link>
            <Link className="bg-[#0077b5] p-2 size-8 rounded-full flex items-center justify-center">
              <i className="fa-brands fa-linkedin-in !text-white"></i>
            </Link>
            <Link className="bg-[#0077b5] p-2 size-8 rounded-full flex items-center justify-center">
              <i className="fa-solid fa-paper-plane !text-white text-[14px] mr-1"></i>
            </Link>
            <Link className="bg-[#1FB381] p-2 size-8 rounded-full flex items-center justify-center">
              <i className="fa-brands fa-whatsapp !text-white text-[18px]"></i>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center w-[95%] mx-auto sm-md:w-[410px] relative">
          <input
            ref={inputRef}
            className="h-full px-5 pr-10 py-2 rounded-4xl bg-[#f4f4f4] w-[97%] text-sm text-left"
            type="text"
            value={location}
            readOnly
          />
          <i
            className="fas fa-copy text-[#de8808] absolute top-1/2 right-6 -translate-y-1/2 cursor-pointer"
            onClick={handleCopy}
          ></i>
        </div>
      </div>
      <div className="rounded-2xl relative bg-[#f4f4f4] mt-20 text-center pb-8">
        <img
          className="size-19 xs:size-22 rounded-full border-3 border-[#007dad] absolute top-0 right-1/2 -translate-y-1/2 translate-x-1/2"
          src={post.writer.img}
          alt=""
        />
        <div className="mt-15 max-w-[80%] mx-auto">
          <Link className="!text-[#0066bf] font-semibold text-lg xs:text-xl sm-md:text-2xl">
            {post.writer.writeName}
          </Link>
          <div
            className="writer xs:mt-2 px-8 xs:py-5 text-center"
            dangerouslySetInnerHTML={{ __html: post.writer.text }}
          ></div>
        </div>
      </div>
    </div>
  );
}
