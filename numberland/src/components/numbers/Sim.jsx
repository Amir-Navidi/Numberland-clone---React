import { useState, useEffect } from "react";
import data from "../data/sim";

export default function Sim() {
  const [openAccordion, setOpenAccordion] = useState([]);
  const expandAccordion = (id) => {
    setOpenAccordion((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  useEffect(() => {
    document.title =
      "خرید سیم‌کارت خارجی و بین‌المللی فعال در ایران | نامبرلند";
  }, []);

  return (
    <div className="px-3 xs:px-7 lg:px-12 py-7 space-y-14">
      <div className="flex flex-col lg:flex-row items-center gap-5 gap-y-9">
        <div className="flex flex-col gap-y-4 sm-md:w-[90%] lg:w-[65%]">
          <h1 className="text-lg text-[#5f5f5f] font-semibold">
            خرید سیم کارت بین المللی
          </h1>
          <p className="text-[#646464] text-justify !text-[15px]">
            برقراری تماس با خارج از کشور هزینه سنگینی در پی دارد، از طرفی
            شرکت‌های تجاری هم برای انجام کارهای خود و حفظ ارتباطات‌شان به یک
            شماره خارجی نیازمندند که همیشه در دسترس‌شان باشد. علاوه بر این،
            بسیاری از شرکت‌های خارجی مثل پی پال، اپل و ... شماره‌های ایرانی را
            تحریم کردند و ثبتنام در این سایت‌ها با شماره ایرانی امکان پذیر نیست.
            این موارد و مشکلات نباید مانع برقراری ارتباطات شما و بهره‌مندی از از
            سایت‌ها و برنامه‌های خارجی باشد. خرید سیم کارت خارجی راه حل قطعی
            برای رهایی از مشکلات شما است. در این متن شما را با کاربرد و مزایای
            خرید سیم کارت بین المللی آشنا خواهیم کرد.
          </p>
          <div className="flex items-start gap-x-4 justify-end mt-2">
            <button className="rounded-xl px-5 py-2 cursor-pointer bg-[#ffba53] text-white">
              شارژ سیم کارت
            </button>
            <button className="rounded-xl px-5 py-2 cursor-pointer text-[#ffba53] border-2 border-[#ffba53]">
              مشاهده سیم کارت ها
            </button>
          </div>
        </div>
        <div className="w-full max-w-[350px] lg:w-[35%]">
          <iframe
            className="w-full aspect-16/9"
            src="https://www.aparat.com/video/video/embed/videohash/ksij77b/vt/frame"
            allowFullScreen
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
          ></iframe>
        </div>
      </div>
      <div className="flex gap-4 flex-wrap justify-around">
        {data.options.map((option, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 border border-[#abe8ff] rounded-2xl w-[280px]"
          >
            <img className="w-[50px]" src={option.icon} alt="" />
            <strong className="font-semibold mt-6">{option.title}</strong>
            <p className="text-[#bebebe] text-justify !text-[15px] mt-2">
              {option.text}
            </p>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-lg text-[#5f5f5f] font-semibold">
          انتخاب سیم کارت بین المللی
        </h2>
        <div className="flex flex-wrap justify-evenly gap-x-3">
          {data.sims.map((sim, index) => (
            <div
              key={index}
              className="flex flex-col items-center px-6 py-4 rounded-3xl mt-10 w-[200px]"
              style={{ boxShadow: "0px 0px 12px #ececec" }}
            >
              <img className="w-[60px]" src={sim.img} alt="" />
              <h3 className="mt-6 text-sm">{sim.title}</h3>
              <button className="mt-4 bg-[#ffba53] px-5 py-2 rounded-xl text-sm text-white cursor-pointer">
                مشاهده
              </button>
            </div>
          ))}
        </div>
      </div>
      <h2 className="text-lg text-[#5f5f5f] font-semibold">
        مقایسه سیم کارت های بین المللی
      </h2>
      <table className="text-xs xs:text-sm bg-[#f6f8fe] w-full max-w-[850px] mx-auto">
        <thead>
          <tr>
            <th className="bg-[#e5ecf6] px-3 py-2"></th>
            {data.comparison.map((item, index) => (
              <th key={index} className="bg-[#e5ecf6] px-3 py-4">
                {item.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-3 py-2 text-center">آنتن دهی</td>
            {data.comparison.map((item, index) => (
              <td key={index} className="px-3 py-4">
                {item.signal ? (
                  <span className="flex items-center justify-between max-w-[70px] mx-auto ">
                    دارد{" "}
                    <i className="text-base fa fa-check-square text-green-500"></i>
                  </span>
                ) : (
                  <span className="flex items-center justify-between max-w-[70px] mx-auto ">
                    ندارد{" "}
                    <i className="text-base fa fa-times-square text-red-500"></i>
                  </span>
                )}
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-3 py-2 text-center">اپراتور رومینگ</td>
            {data.comparison.map((item, index) => (
              <td key={index} className="px-3 py-4">
                <span className="w-full max-w-[70px] mx-auto text-center block">
                  {item.roaming}
                </span>
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-3 py-2 text-center">دریافت پیامک از سرویس‌ها</td>
            {data.comparison.map((item, index) => (
              <td key={index} className="px-3 py-4">
                {item.roaming ? (
                  <span className="flex items-center justify-between max-w-[70px] mx-auto ">
                    دارد{" "}
                    <i className="text-base fa fa-check-square text-green-500"></i>
                  </span>
                ) : (
                  <span className="flex items-center justify-between max-w-[70px] mx-auto ">
                    ندارد{" "}
                    <i className="text-base fa fa-times-square text-red-500"></i>
                  </span>
                )}
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-3 py-2 text-center">
              دریافت پیامک از تلفن شخصی ایرانی
            </td>
            {data.comparison.map((item, index) => (
              <td key={index} className="px-3 py-4">
                {item.personal ? (
                  <span className="flex items-center justify-between max-w-[70px] mx-auto ">
                    دارد{" "}
                    <i className="text-base fa fa-check-square text-green-500"></i>
                  </span>
                ) : (
                  <span className="flex items-center justify-between max-w-[70px] mx-auto ">
                    ندارد{" "}
                    <i className="text-base fa fa-times-square text-red-500"></i>
                  </span>
                )}
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-3 py-2 text-center">
              دریافت پیامک از شماره خارجی
            </td>
            {data.comparison.map((item, index) => (
              <td key={index} className="px-3 py-4">
                {item.foreignMessage ? (
                  <span className="flex items-center justify-between max-w-[70px] mx-auto ">
                    دارد{" "}
                    <i className="text-base fa fa-check-square text-green-500"></i>
                  </span>
                ) : (
                  <span className="flex items-center justify-between max-w-[70px] mx-auto ">
                    ندارد{" "}
                    <i className="text-base fa fa-times-square text-red-500"></i>
                  </span>
                )}
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-3 py-2 text-center">
              دریافت تماس از شماره خارجی
            </td>
            {data.comparison.map((item, index) => (
              <td key={index} className="px-3 py-4">
                {item.foreignCall ? (
                  <span className="flex items-center justify-between max-w-[70px] mx-auto ">
                    دارد{" "}
                    <i className="text-base fa fa-check-square text-green-500"></i>
                  </span>
                ) : (
                  <span className="flex items-center justify-between max-w-[70px] mx-auto ">
                    ندارد{" "}
                    <i className="text-base fa fa-times-square text-red-500"></i>
                  </span>
                )}
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-3 py-2 text-center">
              دریافت تماس از شماره ایرانی
            </td>
            {data.comparison.map((item, index) => (
              <td key={index} className="px-3 py-4">
                {item.localCall ? (
                  <span className="flex items-center justify-between max-w-[70px] mx-auto ">
                    دارد{" "}
                    <i className="text-base fa fa-check-square text-green-500"></i>
                  </span>
                ) : (
                  <span className="flex items-center justify-between max-w-[70px] mx-auto ">
                    ندارد{" "}
                    <i className="text-base fa fa-times-square text-red-500"></i>
                  </span>
                )}
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-3 py-2 text-center">
              برقراری تماس با شماره خارجی
            </td>
            {data.comparison.map((item, index) => (
              <td key={index} className="px-3 py-4">
                {item.foreignDial ? (
                  <span className="flex items-center justify-between max-w-[70px] mx-auto ">
                    دارد{" "}
                    <i className="text-base fa fa-check-square text-green-500"></i>
                  </span>
                ) : (
                  <span className="flex items-center justify-between max-w-[70px] mx-auto ">
                    ندارد{" "}
                    <i className="text-base fa fa-times-square text-red-500"></i>
                  </span>
                )}
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-3 py-2 text-center">
              برقراری تماس با شماره ایرانی
            </td>
            {data.comparison.map((item, index) => (
              <td key={index} className="px-3 py-4">
                {item.localDial ? (
                  <span className="flex items-center justify-between max-w-[70px] mx-auto ">
                    دارد{" "}
                    <i className="text-base fa fa-check-square text-green-500"></i>
                  </span>
                ) : (
                  <span className="flex items-center justify-between max-w-[70px] mx-auto ">
                    ندارد{" "}
                    <i className="text-base fa fa-times-square text-red-500"></i>
                  </span>
                )}
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-3 py-2 text-center">اینترنت</td>
            {data.comparison.map((item, index) => (
              <td key={index} className="px-3 py-4">
                {item.internet ? (
                  <span className="flex items-center justify-between max-w-[70px] mx-auto ">
                    دارد{" "}
                    <i className="text-base fa fa-check-square text-green-500"></i>
                  </span>
                ) : (
                  <span className="flex items-center justify-between max-w-[70px] mx-auto ">
                    ندارد{" "}
                    <i className="text-base fa fa-times-square text-red-500"></i>
                  </span>
                )}
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-3 py-2 text-center">فعال سازی دوره‌ای</td>
            {data.comparison.map((item, index) => (
              <td key={index} className="px-1 xs:px-3 py-4">
                <div
                  className="text-center text-xs xs:text-[14px] leading-5"
                  dangerouslySetInnerHTML={{ __html: item.activation }}
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <div>
        <h3 className="font-semibold text-[17px] xxs:text-xl text-black mt-8">
          سوالات متداول
        </h3>
        <div className="flex flex-col gap-y-5 mt-6">
          {data.accordion.map((item, index) => (
            <div
              onClick={() => expandAccordion(index)}
              key={index}
              className="rounded-3xl text-black bg-[#E5EEFB] cursor-pointer px-4 xs:px-10 flex flex-col py-4 xs:py-7"
            >
              <div className="flex w-full items-center text-sm xs:text-[17px]">
                <span className="ml-1">{item.title}</span>
                <span className="bg-[#61B5FF] rounded-sm mr-auto">
                  <i
                    className={`fa-solid fa-chevron-down text-white p-1 transition-rotate duration-400 ${
                      openAccordion.includes(index) ? "rotate-180" : "rotate-0"
                    }`}
                  ></i>
                </span>
              </div>
              <p
                className={`text-[#646464] !text-[13px] xs:!text-[15px] text-justify px-3 transition-all duration-400 overflow-hidden height-animation ${
                  openAccordion.includes(index) ? "expand pt-2 xs:pt-5" : ""
                }`}
              >
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
