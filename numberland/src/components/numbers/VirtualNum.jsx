import VirtualNumTabs from "./VirtualNumTabs";
import enamad from "../../assets/images/namad/enamad.png";
import samandehi from "../../assets/images/namad/samandehi.png";
import zarinpal from "../../assets/images/namad/zarin-logo.svg";
import { useState, useEffect } from "react";

export default function VirtualNum() {
  const [open, setOpen] = useState(false);

  const openAccordion = () => {
    setOpen(!open);
  };

  useEffect(() => {
    document.title =
      "نامبرلند | شماره مجازی ارزان | شماره مجازی تلگرام و سرویس های آنلاین";
  }, []);

  return (
    <div className="flex flex-col-reverse lg:flex-row">
      <VirtualNumTabs />
      <div className="lg:w-[57%] py-6 px-3 xs:px-6 flex flex-col gap-y-6">
        <span className="text-center text-sm flex items-center justify-center gap-x-2 text-[#00af55]">
          <i className="fa-solid fa-check text-[16px]"></i>
          نامبرلند؛ حرفه ای ترین و ارزان ترین پنل شماره مجازی
        </span>
        <h1 className="flex items-center gap-2 text-[#0098d1] font-semibold">
          <div className="size-[27px] rounded-[31%] bg-[#009cd7] text-white flex items-center justify-center">
            <i className="fa fa-sim-card"></i>
          </div>
          شماره مجازی چیست؟
        </h1>
        <div className="xs:px-2">
          <p className="!text-[15px] xs:!text-base text-justify leading-6">
            احتمالا شما هم مانند بسیاری از کاربران دنیای دیجیتال نگران افشای
            اطلاعات شخصی خود هستید یا برای دسترسی به بسیاری از سایت‌های خارجی با
            محدودیت‌هایی مواجه شده‌اید. یک راه‌حل اساسی برای رفع این دغدغه وجود
            دارد و آن استفاده از شماره مجازی است. شماره مجازی این امکان را به
            شما می‌دهد که با حفظ اطلاعات شخصی خود، در دنیای دیجیتال فعالیت داشته
            باشید. دورزدن تحریم‌های خارجی، ساخت حساب کاربری در شبکه‌های اجتماعی
            و سایت‌های خارجی با شماره مجازی امکان‌پذیر است. برای ارتباطات شخصی و
            تجاری خود می‌توانید از سایت نامبرلند و از کشورهای مختلف با قیمت‌های
            متنوع شماره مجازی بگیرید.
          </p>
          <div className="grid grid-cols-2 xs:grid-cols-3 gap-4 mt-5 text-sm xs:text-[15px]">
            <div className="transition-all duration-200 rounded-lg text-[#727272] bg-[#f9f9f9] hover:text-white hover:bg-[#008fc5] px-2 xxs:px-6 py-3 flex items-center gap-2">
              <i className="fa fa-percent"></i>
              <span>قیمـت ارزان</span>
            </div>
            <div className="transition-all duration-200 rounded-lg text-[#727272] bg-[#f9f9f9] hover:text-white hover:bg-[#008fc5] px-2 xxs:px-6 py-3 flex items-center gap-2">
              <i className="fa-regular fa-star"></i>
              <span>کیفیت بالا</span>
            </div>
            <div className="transition-all duration-200 rounded-lg text-[#727272] bg-[#f9f9f9] hover:text-white hover:bg-[#008fc5] px-2 xxs:px-6 py-3 flex items-center gap-2">
              <i className="fa-regular fa-clock"></i>
              <span>تحویل فوری</span>
            </div>
            <div className="transition-all duration-200 rounded-lg text-[#727272] bg-[#f9f9f9] hover:text-white hover:bg-[#008fc5] px-2 xxs:px-6 py-3 flex items-center gap-2">
              <i className="fa-regular fa-credit-card"></i>
              <span>پرداخت آنلاین</span>
            </div>
            <div className="transition-all duration-200 rounded-lg text-[#727272] bg-[#f9f9f9] hover:text-white hover:bg-[#008fc5] px-2 xxs:px-6 py-3 flex items-center gap-2">
              <i className="fa-solid fa-shield-halved"></i>
              <span>امنیت بالا</span>
            </div>
            <div className="transition-all duration-200 rounded-lg text-[#727272] bg-[#f9f9f9] hover:text-white hover:bg-[#008fc5] px-2 xxs:px-6 py-3 flex items-center gap-2">
              <i className="fa-solid fa-headset"></i>
              <span>پشتیبانی آنلاین</span>
            </div>
          </div>
        </div>
        <h2 className="flex items-center gap-2 text-[#00bd73] font-semibold text-lg sm:text-xl">
          <div className="size-[27px] rounded-[31%] bg-[#01ad4e] text-white flex items-center justify-center">
            <i className="far fa-check-circle"></i>
          </div>
          با اطمیـنان خریـد کنید
        </h2>
        <div className="px-2">
          <div className="w-full text-justify text-sm xs:text-base">
            نامبرلند، دارای{" "}
            <span className="text-[#119662]">نماد رسمی اعتماد الکترونیک</span>،{" "}
            <span className="text-[#119662]">نماد ساماندهی </span>،{" "}
            <span className="text-[#119662]">گواهی پرداخت امن آنلاین</span> است،
            برای مشاهده روی نمادها کلیک کنید.
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <div className="bg-[#f9f9f9] w-[110px] h-[135px] overflow-hidden rounded-xl flex justify-center items-center">
              <a
                className="w-full"
                referrerPolicy="origin"
                target="_blank"
                rel="noopener noreferrer"
                href="https://trustseal.enamad.ir/?id=91103&amp;Code=Ilt2vbhoUNq1yAT4SKaI"
              >
                <img
                  className="w-[110px] h-[110px] cursor-pointer transition-all duration-400 hover:scale-110"
                  referrerPolicy="origin"
                  src={enamad}
                  alt="enamad"
                  id="Ilt2vbhoUNq1yAT4SKaI"
                />
              </a>
            </div>
            <div className="bg-[#f9f9f9] w-[110px] h-[135px] overflow-hidden rounded-xl flex justify-center items-center">
              <img
                id="jxlzesgtrgvjfukzwlaosizpesgt"
                className="w-[110px] h-[110px] cursor-pointer transition-all duration-400 hover:scale-110"
                onClick={() =>
                  window.open(
                    "https://logo.samandehi.ir/Verify.aspx?id=1036490&p=rfthobpdxlaogvkaaodspfvlobpd",
                    "Popup",
                    "toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30"
                  )
                }
                alt="logo-samandehi"
                src={samandehi}
              />
            </div>{" "}
            <div
              onClick={() => {
                window.open(
                  `https://www.zarinpal.com/trustPage/${window.location.hostname}`,
                  "_blank",
                  "width=450, height=600, scrollbars=no, resizable=no"
                );
              }}
              className="bg-[#f9f9f9] w-[110px] h-[135px] overflow-hidden rounded-xl flex justify-center items-center cursor-pointer"
            >
              <img
                className="w-[60px] cursor-pointer transition-all duration-400 hover:scale-110"
                referrerPolicy="origin"
                src={zarinpal}
                alt="zarinpal"
                id="Ilt2vbhoUNq1yAT4SKaI"
              />
            </div>
          </div>
          <div>
            <div
              onClick={openAccordion}
              className="mt-10 text-[#747474] flex justify-between items-center px-5 py-4 w-full cursor-pointer bg-[#f7f7f7] transition-all duration-300 hover:bg-[#eaeaea] rounded-xl"
            >
              <h2 className="flex items-center">
                <i className="fa fa-question-circle ml-3 text-lg"></i>
                سوالات متداول
              </h2>
              <i
                className={`fa-solid fa-chevron-down transition-all duration-500 ${
                  open ? "rotate-0" : "rotate-90"
                }`}
              ></i>
            </div>
            <div
              className={`px-2 xs:px-4 overflow-hidden transition-all duration-500 text-justify height-animation ${
                open ? "expand" : ""
              }`}
            >
              <div className="my-4">
                <h3 className="text-[#006388]">
                  شماره بدون ریپورت یعنی چه و کدام شماره ها این خصوصیت را دارند؟
                </h3>
                <p className="px-3 mt-3 !leading-[23px] !text-[15px]">
                  منظور از شماره مجازی بدون ریپورت، شماره ای است که محدودیتی
                  برای استفاده نداشته باشد، منظور این است که آن شماره مجازی
                  قابلیت ارسال پیام به شخصی افراد را داراست
                </p>
              </div>
              <div className="my-4">
                <h3 className="text-[#006388]">
                  شماره تا چه زمان در اختیار ماست؟
                </h3>
                <p className="px-3 mt-3 !leading-[23px] !text-[15px]">
                  شماره ها با بهترین کیفیت موجود تهیه شده و اختصاصی هستند، لذا
                  در اغلب اوقات تا زمانی که از اکانت خود خارج نشوید می توانید از
                  آن استفاده کنید
                </p>
              </div>
              <div className="my-4">
                <h3 className="text-[#006388]">
                  آیا شماره در اختیار ما بوده و همیشه می توانیم کد تأیید بگیریم؟{" "}
                </h3>
                <p className="px-3 mt-3 !leading-[23px] !text-[15px]">
                  دقت داشته باشید که شماره ها فقط یکبار کد ورود را داده ولی تا
                  زمانی که از حساب خود خارج نشوید معمولا امکان استفاده از شماره
                  بوده و مشکلی نخواهید داشت
                </p>
              </div>
              <div className="my-4">
                <h3 className="text-[#006388]">
                  تفاوت شماره کشورهای مختلف چیست؟
                </h3>
                <p className="px-3 mt-3 !leading-[23px] !text-[15px]">
                  تفاوت شماره کشورهای مختلف چیست؟عدد مقابل کشورهای مختلف بیانگر
                  اپراتورهای مخابراتی مختلفی است که شماره های آنها ارائه میشود،
                  از لحاظ کیفیت معمولا تفاوتی نداشته و فقط به جهت تنوع و موجود
                  بودن همیشگی شماره، از اپراتورهای متفاوت اضافه شده است
                </p>
              </div>
              <div className="my-4">
                <h3 className="text-[#006388]">آیا شماره‌ها امن هستند؟</h3>
                <p className="px-3 mt-3 !leading-[23px] !text-[15px]">
                  شماره هایی که دریافت می کنید از طرف نامبرلند به هیچ کس دیگری
                  واگذار نمی شود و فقط در اختیار شماست، اما برای حفظ امنیت بیشتر
                  نکات ایمنی سرویس خود را رعایت کنید، مثلا رمز دو مرحله ای تعریف
                  کنید، در صورتی وجود رمز دو مرحله ای حتی اگر شخص به شماره
                  دسترسی پیدا کند تا زمانی که رمز انتخابی شما را نداشته باشد به
                  هیچ وجه نمی تواند به اطلاعات شما دسترسی پیدا کند
                </p>
              </div>
            </div>
            <div className="relative w-full pt-[56.25%] mt-6">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.aparat.com/video/video/embed/videohash/cda367p/vt/frame"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
