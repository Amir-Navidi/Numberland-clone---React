import { Link } from "react-router-dom";
import data from "../data/footer.json";
import telegram from "../../assets/images/social/telegram.svg";
import instagram from "../../assets/images/social/instagram.svg";
import twitter from "../../assets/images/social/twitter.svg";
export default function Footer() {
  const isBlogPage = location.pathname.includes("/blogs/post");
  return (
    <footer
      className={`w-full mt-24 px-2 xxs:px-4 py-4 text-sm ${
        isBlogPage ? "bg-[#e5e5e5]/45" : "bg-white "
      }`}
    >
      <div className="grid lg:grid-cols-2 gap-y-5">
        {data.map((item, index) => (
          <div key={index}>
            <h2 className="text-[#5f5f5f]">{item.title}</h2>
            <ul className="grid grid-cols-2 xxs:grid-cols-3 sm-md:grid-cols-4 text-[13px] gap-x-2 mt-2 lg:mt-3">
              {item.links.map((item, index) => (
                <li className="text-[#006388] mt-3" key={index}>
                  <Link>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex flex-col-reverse gap-y-3 xs:flex-row items-center justify-between mt-12 mb-3">
        <p className="!text-[13px]">
          تمامی حقوق برای تیم نامبرلند© محفوظ است؛ هرگونه کپی برداری پیگرد
          قانونی دارد.
        </p>
        <div className="flex items-center gap-x-6 xs:gap-x-3">
          <a href="https://t.me/s/numberland_shop">
            <img className="w-6" src={telegram} alt="" />
          </a>
          <a href="https://instagram.com/numberland_ir">
            <img className="w-6" src={instagram} alt="" />
          </a>
          <a href="https://twitter.com/numberland_ir">
            <img className="w-6" src={twitter} alt="" />
          </a>
        </div>
      </div>
    </footer>
  );
}
