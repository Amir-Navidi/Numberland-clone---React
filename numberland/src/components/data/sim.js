import phone from "../../assets/images/sim/anten.svg";
import badge from "../../assets/images/sim/nolimit.svg";
import sms from "../../assets/images/sim/freesms.svg";
import england from "../../assets/images/sim/england-sim.svg";
import stonia from "../../assets/images/sim/stonia-sim.svg";
import poland from "../../assets/images/sim/poland-sim.webp";

const comparison = [
  {
    title: "سیم کارت EE",
    signal: true,
    roaming: "همراه اول",
    smsFromServices: true,
    smsFromInsideNum: false,
    smsFromOutside: false,
    callFromOutside: false,
    callFromInside: false,
    callToOutside: false,
    callToInside: false,
    internet: false,
    activation: "هر 6 ماه <br> حداقل 5 پوند",
  },
  {
    title: "سیم کارت Elisa",
    signal: true,
    roaming: "ایرانسل",
    smsFromServices: true,
    smsFromInsideNum: false,
    smsFromOutside: true,
    callFromOutside: true,
    callFromInside: false,
    callToOutside: false,
    callToInside: false,
    internet: true,
    activation: "هر 6 ماه <br> حداقل 3 یورو",
  },
  {
    title: "سیم کارت Vodafone",
    signal: true,
    roaming: "رایتل",
    smsFromServices: true,
    smsFromInsideNum: true,
    smsFromOutside: true,
    callFromOutside: true,
    callFromInside: false,
    callToOutside: true,
    callToInside: false,
    internet: true,
    activation:
      "هر 3 ماه حداقل 5 پوند <br> یا <br> برقراری تماس و ارسال <br> پیامک به شماره انگلیس",
  },
];

const options = [
  {
    icon: phone,
    title: "پوشش کامل آنتن دهی",
    text: "سیم کارت خارجی در اکثر کشور‌ها آنتن دهی فوق‌العاده‌ای دارد",
  },
  {
    icon: badge,
    title: "دائمی و مادام العمر بودن",
    text: "یکبار هزینه می‌کنید و برای همیشه از یک سیمکارت خارجی استفاده می‌کنید",
  },
  {
    icon: sms,
    title: "دریافت پیامک رایگان",
    text: "سیم کارت بین‌المللی قابلیت دریافت پیامک رایگان دارد",
  },
];

const sims = [
  {
    img: stonia,
    title: "سیم کارت الیسا استونی",
  },
  {
    img: england,
    title: "سیم کارت EE انگلیس",
  },
  {
    img: england,
    title: "سیم کارت ودافون انگلیس",
  },
  {
    img: poland,
    title: "سیمکارت T mobile",
  },
];

const accordion = [
  {
    title: "آیا سیم کارت ها داخل ایران قابل استفاده هستند؟",
    content:
      "بله، این سیم کارت ها تقریبا در تمامی نقاط ایران (هرکجا که اپراتورهای رومینگ آنتن دهی داشته باشد) آنتن دهی دارند.",
  },
  {
    title: "قیمت سیم کارت بین المللی چقدر است؟",
    content:
      "قیمت سیم کارت بین المللی با توجه به امکانات، کیفیت و کشور ارائه شده متفاوت خواهد بود. با توجه به نیاز و سلیقه خود می‌توانید سیم کارت مورد نظر را انتخاب کنید. سیمکارت های ارائه شده در نامبرلند با توجه به کیفیت بالایی که دارند، از قیمت مناسبی برخوردار هستند.",
  },
  {
    title: "آیا سیم کارت بین المللی قابل شارژ است؟ چگونه شارژ می‌شوند؟",
    content:
      "بله، برای شارژ سیم کارت بین المللی خود می‌توانید از سایت نامبرلند اقدام کنید.",
  },
  {
    title: "نحوه ارسال سیم کارت بین المللی چگونه است؟",
    content:
      "سیم کارت بین المللی از طریق پست به آدرس مورد نظر شما ارسال خواهد شد.",
  },
];
const data = { comparison, options, sims, accordion };

export default data;
