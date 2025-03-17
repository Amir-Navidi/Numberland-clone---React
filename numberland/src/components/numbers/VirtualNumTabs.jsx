import { useState, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence, easeIn } from "framer-motion";
import NumAccordion from "./NumAccordion";
import RentalNumber from "./RentalNumber";
import PermanentNum from "./PermanentNum";
import PermanentNumTabs from "./PermanentNumTabs";

export default function VirtualNum() {
  const tabs = [
    { id: "tab1", label: "شماره عادی", icon: "fa-regular fa-message" },
    { id: "tab2", label: "شماره اجاره‌ای", icon: "fa-regular fa-clock" },
    { id: "tab3", label: "شماره دائمی", icon: "fa-regular fa-star" },
  ];
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div className="flex justify-center lg:w-[43%] xxs:px-3 xs:px-0 relative">
      <div className="w-full">
        <div className="flex border-b border-gray-300 sticky top-0 z-20 bg-white pt-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 xs:px-2 text-center relative flex items-center justify-center gap-2 text-[15px] xxs:text-[18px] ${
                activeTab === tab.id
                  ? "text-[#0199d2] hover:text-[#0199d2] font-bold"
                  : "transition-all duration-200 cursor-pointer text-[#8291a6] hover:text-[#4ca4cc]"
              }`}
            >
              <i className={tab.icon}></i>
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-[90%] h-1 bg-[#0199d2] rounded-t-lg"></div>
              )}
            </button>
          ))}
        </div>
        <div className="mt-4 max-w-[850px] mx-auto w-full">
          {activeTab === "tab1" && <TabOneContent />}
          {activeTab === "tab2" && <TabTwoContent />}
          {activeTab === "tab3" && <TabThreeContent />}
        </div>
      </div>
      <div></div>
    </div>
  );
}

function TabOneContent() {
  const [collapse, setCollapse] = useState(false);
  const parentRef = useRef(null);
  const childRefs = useRef([]);

  useLayoutEffect(() => {
    const setMinHeight = () => {
      const totalHeight = childRefs.current.reduce((total, child) => {
        return total + (child ? child.offsetHeight : 0);
      }, 0);
      if (parentRef.current) {
        parentRef.current.style.minHeight = `${totalHeight + 40}px`;
      }
    };

    setMinHeight();
    window.addEventListener("resize", setMinHeight);
    return () => {
      window.removeEventListener("resize", setMinHeight);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeIn }}
      >
        <div
          className={`p-4 pb-0 xxs:bg-[#fbfaee] rounded-t-xl tabs-content read-more space-y-2 text-justify xxs:text-right`}
        >
          <div className="flex items-start gap-x-2">
            <i className="fa-solid fa-comment-medical mt-[.40rem]"></i>
            <p>
              هر شماره عادی برای یک سرویس قابل استفاده است. (مثلا فقط تلگرام)
            </p>
          </div>
          <div className="flex items-start gap-x-2">
            <i className="fa-regular fa-heart mt-[.40rem]"></i>
            <p>شماره مجازی عادی، بسیار پرطرفدار و ارزان و مقرون به صرفه است.</p>
          </div>
          <div className="flex items-start gap-x-2">
            <i className="fa-solid fa-bars mt-[.40rem]"></i>
            <p>
              نرم‌افزار یا سایت مورد نظر را از لیست زیر انتخاب کنید؛ کشورها و
              قیمت‌ها نمایش داده می‌شود. برای همه سرویس‌ها شماره موجود است.
            </p>
          </div>
        </div>
        <div
          className={`px-4 text-justify xxs:text-right xxs:bg-[#fbfaee] rounded-t-xl tabs-content read-more space-y-2 overflow-hidden transition-height duration-1000 ease-in-out height-animation ${
            collapse ? "expand" : ""
          }`}
        >
          <div className="flex items-start gap-x-2 mt-2">
            <i className="fa-solid fa-stopwatch-20 mt-[.40rem]"></i>
            <p>
              این شماره‌ها تنها در محدوده زمانی 10 الی 20 دقیقه قادر به دریافت
              پیامک هستند و در صورتی که پیامکی دریافت نشود هزینه به کیف پول شما
              عودت داده می‌شود و می‌توانید شماره دیگری بگیرید.
            </p>
          </div>
          <div className="flex items-start gap-x-2">
            <i className="fa-solid fa-repeat mt-[.40rem]"></i>
            <p>
              کشورهائی که جلوی آن‌ها عدد 1 و 2 و 5 و 6 هستند در این تایم قادر به
              دریافت پیامک مجدد نیز هستند، اما بقیه شماره‌ها فقط یکبار کد دریافت
              می‌کنند که همان یکبار نیز برای راه اندازی نرم افزار یا ساخت اکانت
              در سایت مورد نظرتان کافی است.
            </p>
          </div>
          <div className="flex items-start gap-x-2">
            <i className="fa-solid fa-comment-slash mt-[.40rem]"></i>
            <p>
              پس از گذشت 10 الی 20 دقیقه قادر به دریافت کد مجدد نخواهید بود، اما
              این ضمانت را به شما خواهیم داد اگر شماره پیامکی دریافت نکرد لغو
              شده و در همان لحظه هزینه به کیف پول شما عودت داده می‌شود.
            </p>
          </div>
          <div className="flex items-start gap-x-2">
            <i className="fa-regular fa-user mt-[.40rem]"></i>
            <p>
              زمانی که با این شماره‌های مجازی حسابی را راه اندازی کنید تا زمانی
              که از آن خارج نشوید امکان استفاده از آن حساب وجود دارد و این
              شماره‌ها بنا بر تعهد اپراتورهای مخابراتی خارج از کشور به شخص دیگری
              واگذار نمی‌شوند.
            </p>
          </div>
          <div className="flex items-start gap-x-2">
            <i className="fa-solid fa-ban mt-[.40rem]"></i>
            <p>
              در مواردی ممکن است نرم افزاری که قصد استفاده از شماره مجازی در آن
              را دارید نسبت به شماره مجازی شما حساسیت به خرج داده و حتی شماره را
              مسدود کند، که با رعایت نکات گفته شده در قسمت آموزش‌ها سایت این
              مشکل به حداقل می‌رسد.
            </p>
          </div>
        </div>
        <div className="rounded-b-xl xxs:bg-[#fbfaee] flex justify-center pb-2">
          <button
            onClick={() => setCollapse((prev) => !prev)}
            className="text-[#009cd7] cursor-pointer mt-2 flex items-center gap-x-2"
          >
            <span>{collapse ? "توضیحـات کمتر " : "توضیحـات بیشتـر "}</span>
            <i
              className={`fa-solid ${
                collapse ? "fa-chevron-up" : "fa-chevron-down"
              }`}
            ></i>
          </button>
        </div>
        <NumAccordion />
      </motion.div>
    </AnimatePresence>
  );
}

function TabTwoContent() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeIn }}
        className="px-2"
      >
        <p className="text-justify !text-[15px] py-2 leading-6">
          شماره مجازی اجاره‌ای محدود به سایت و سرویس نبوده و شما می‌توانید یک
          شماره موبایل را برای مدت مشخصی اجاره کنید و شماره به صورت کامل در
          اختیار شماست و می‌توانید به صورت نامحدود برای همه سرویس‌ها و سایت‌ها
          پیامک دریافت کنید. شماره اجاره‌ای از اپراتورهای مخابراتی مختلف عرضه
          می‌شود که شرائط و قوانین هر کدام زیر آن‌ها شرح داده شده است، همانند
          محدودیت‌های آن اپراتور، قابلیت تمدید و .... که قبل از سفارش حتما
          مطالعه کنید.
        </p>
        <RentalNumber />
      </motion.div>
    </AnimatePresence>
  );
}

function TabThreeContent() {
  const [show, setShow] = useState(false);
  const showNum = () => {
    setShow((prev) => !prev);
  };
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeIn }}
        className="relative px-2 sm:px-0"
      >
        <div className={` ${show ? "hidden" : "block"}`}>
          <p className="text-justify !text-[15px] py-2 leading-6">
            شماره مجازی دائمی نامبرلند در حال حاضر تنها از کشور آمریکا ارائه
            می‌شود، این سرویس هیچگونه از محدودیت‌های شماره‌های عادی و اجاره‌ای
            را نداشته و می‌توانید از این شماره برای فعالسازی اغلب سایت‌ها و
            سرویس‌ها استفاده کنید.
          </p>
          <PermanentNum />
          <button
            onClick={showNum}
            className="mt-7 h-[55px] layer flex items-center justify-center gap-x-2 text-center w-full py-4 rounded-lg text-white bg-[#ffb03b] overflow-hidden cursor-pointer relative"
          >
            <span className="absolute z-10">
              <i className="fa fa-shopping-cart"></i> خرید شماره مجازی دائمـی
            </span>
          </button>
        </div>
        <div
          className={`opacity-0 hidden w-full h-full bg-white transition-top duration-500 ${
            show ? "opacity-100 !block" : ""
          }`}
        >
          <p className="text-justify py-3 text-[15px]">
            یک شماره را برای خرید انتخاب کنید، شماره پس از خرید به صورت{" "}
            <span className="font-semibold">آنی و اتوماتیک</span> به همراه آموزش
            کامل استفاده تحویل شما داده می‌شود. شماره‌های رند و نیمه رند و
            سفارشی به جهت خاص و کمیاب بودن قیمت بالاتری دارند.
          </p>
          <PermanentNumTabs />

          <button
            onClick={showNum}
            className="text-[15px] xxs:text-[17px] mt-7 h-[55px] layer v2 flex items-center justify-center gap-x-2 text-center w-full py-4 rounded-lg text-[#008fc6] bg-[#f5f8fc] overflow-hidden cursor-pointer relative"
          >
            <span className="absolute z-10">بازگشت به معرفی شماره دائمی</span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
