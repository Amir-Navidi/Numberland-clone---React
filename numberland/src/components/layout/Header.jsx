import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import virtual1 from "../../assets/images/tabs/virtual.webp";
import virtual2 from "../../assets/images/tabs/virtual_active.webp";
import account1 from "../../assets/images/tabs/account.webp";
import account2 from "../../assets/images/tabs/account_active.webp";
import international1 from "../../assets/images/tabs/international_sim.webp";
import international2 from "../../assets/images/tabs/international_sim_active.webp";
import ai1 from "../../assets/images/tabs/account_ai.webp";
import ai2 from "../../assets/images/tabs/account_ai_active.webp";
import giftcard1 from "../../assets/images/tabs/giftcard.webp";
import giftcard2 from "../../assets/images/tabs/giftcard_active.webp";

export default function Header() {
  const location = useLocation(); // Get current URL path
  const [activeButton, setActiveButton] = useState(1);

  const buttons = [
    {
      id: 1,
      path: "/",
      text: "شماره مجازی",
      image1: virtual1,
      image2: virtual2,
    },
    {
      id: 2,
      path: "/account/artificial-intelligence",
      text: "اکانت هوش مصنوعی",
      image1: ai1,
      image2: ai2,
    },
    {
      id: 3,
      path: "/account/account",
      text: "اکانت کاربردی",
      image1: account1,
      image2: account2,
    },
    {
      id: 4,
      path: "/international-sim",
      text: "سیم کارت",
      image1: international1,
      image2: international2,
    },
    {
      id: 5,
      path: "/giftcard",
      text: "گیفت کارت",
      image1: giftcard1,
      image2: giftcard2,
      disabled: true,
    },
  ];

  // Set the active button based on the current URL when the component mounts or when URL changes
  useEffect(() => {
    const activeButtonFromUrl = buttons.findIndex(
      (btn) => btn.path === location.pathname
    );
    if (activeButtonFromUrl !== -1) {
      setActiveButton(buttons[activeButtonFromUrl].id);
    }
  }, [location.pathname]);

  return (
    <div className="w-full max-w-full overflow-hidden z-[100] sticky top-0 xs:relative bg-white xs:bg-transparent mx-auto xs:max-w-[90%] md:max-w-[80%] lg:max-w-[1100px] container xs:mt-5 pb-4 pt-2 xs:py-0">
      <div className="flex overflow-x-auto w-full pt-3 hidden-scroll">
        <div className="flex w-max gap-x-2 whitespace-nowrap">
          {buttons.map((btn) => (
            <Link
              key={btn.id}
              to={btn.disabled ? "#" : btn.path}
              className={`flex items-center px-2 rounded-2xl gap-x-2 py-2 xs:py-1 min-w-max w-[135px] header-tab
              ${activeButton === btn.id ? "active" : ""} 
              ${btn.disabled ? "disabled" : ""}`}
              onClick={(e) => {
                if (btn.disabled) {
                  e.preventDefault();
                } else {
                  setActiveButton(btn.id);
                }
              }}
            >
              <img
                className="max-w-[34px]"
                src={activeButton === btn.id ? btn.image2 : btn.image1}
                alt={btn.text}
                loading="lazy"
              />
              <span className="text-[14.5px] sm:text-xs md:text-sm">
                {btn.text}
              </span>
              {btn.disabled && <span className="coming-soon">بزودی</span>}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
