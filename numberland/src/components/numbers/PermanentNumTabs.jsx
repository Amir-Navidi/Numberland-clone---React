import { useState, useRef } from "react";
import data from "../data/permanentNumTabs.json";
import clsx from "clsx";

export default function PermanentNumTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const contentRefs = useRef([]);

  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  return (
    <div>
      {/* Header Tabs */}
      <div className="flex text-center border-b border-[#c9c9c9] operator-container sticky top-[8px] !z-30 mt-4 w-full">
        {data.map((item, index) => (
          <div className="w-full min-w" key={index}>
            <div
              className={clsx(
                "operator min-h-[55px] flex items-center justify-center !text-sm xxs:!text-[15px]",
                {
                  active: activeTab === index,
                }
              )}
              onClick={() => handleTabClick(index)}
            >
              <i className={clsx(item.icon, "ml-2")}></i>
              {item.title}
            </div>
          </div>
        ))}
      </div>

      {/* Content Container */}

      <div className="overflow-hidden relative">
        {data.map((item, index) => (
          <div
            key={index}
            ref={(el) => (contentRefs.current[index] = el)}
            className={clsx(
              "w-full bg-white py-4 rounded-lg transition-all duration-500",
              activeTab === index ? "block" : "hidden"
            )}
          >
            {item.numbers.map((number, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center py-4 px-3 rounded-lg odd:bg-white even:bg-[#f7f7f7]"
              >
                <div className="text-[#00749f] flex items-center font-[calibri] font-semibold text-[15px] xxs:text-[17px]">
                  <span>
                    {String(number.number).slice(0, 3)}-
                    {String(number.number).slice(3)}
                  </span>
                  <span className="mr-2">({number.areacode})</span>
                  <span dir="ltr">+{number.prenumber}</span>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center justify-center gap-x-1 text-[#7c7c7c] text-[10px] xxs:text-[12px] relative">
                    <div className="overline"></div>
                    <div></div>
                    <div>{number.price.toLocaleString()} تومان</div>
                  </div>
                  <div className="flex items-center gap-x-1 text-[#00af58] text-[13px] xxs:text-[15px]">
                    <div>{number.sellingprice.toLocaleString()} تومان</div>
                  </div>
                </div>
                <button className="bg-[#ffb03b] layer cursor-pointer relative overflow-hidden text-white rounded-md text-xs xxs:text-sm px-3 py-2">
                  خرید
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
