import { useState } from "react";
import data from "../data/permanentNum.json";

export default function PermanentNum() {
  const [openAccordion, setOpenAccordion] = useState(null);
  const open = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };
  return (
    <div className="flex flex-col xs:grid xs:grid-cols-2 gap-3 items-start mt-2">
      {data.map((item, index) => (
        <div
          key={index}
          onClick={() => open(index)}
          className={`rounded-lg text-[#484848] bg-[#f7f7f7] cursor-pointer flex flex-col v1
            ${item.red ? "!text-[#aa0000]" : ""} 
            ${item["full-width"] ? "col-span-2 w-full" : ""}${
            openAccordion === index ? "bg-[#fffad6]" : ""
          }
          ${openAccordion === index && item.red ? "bg-[#fffad6]" : ""}
            `}
        >
          <div className="text-sm flex items-center gap-x-1 w-full h-[55px] px-3 py-5 pb-4">
            <i className={`${item.icon}`}></i>
            {item.title}
            <i
              className={`fa-solid fa-chevron-down mr-auto text-[13px] text-[#484848] transition-transform duration-500 ${
                openAccordion === index ? "rotate-180" : "rotate-0"
              }`}
            ></i>
          </div>
          <div
            className={`height-animation  transition-all duration-500 overflow-hidden text-sm ${
              openAccordion === index ? "expand" : ""
            }`}
          >
            <p
              className=" px-2 pb-3 !text-[14px]"
              dangerouslySetInnerHTML={{ __html: item.text }}
            ></p>
          </div>
        </div>
      ))}
    </div>
  );
}
