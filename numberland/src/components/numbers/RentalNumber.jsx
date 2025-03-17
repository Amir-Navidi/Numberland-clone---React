import { useState } from "react";
import data from "../data/rentalNum.js"; // Ensure this is the correct data file

export default function RentalNumber() {
  const [openAccordion, setOpenAccordion] = useState(null);
  const [activeTabs, setActiveTabs] = useState({});
  const [selectedDates, setSelectedDates] = useState({});
  const [openSubAccordions, setOpenSubAccordions] = useState({}); // Track inner accordions

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const toggleSubAccordion = (providerId, index) => {
    setOpenSubAccordions((prev) => ({
      ...prev,
      [`${providerId}-${index}`]: !prev[`${providerId}-${index}`],
    }));
  };

  const handleTabClick = (providerId, index) => {
    setActiveTabs((prev) => ({
      ...prev,
      [providerId]: index,
    }));
  };

  return (
    <div>
      {data.map((item) => {
        const activeTab = activeTabs[item.id] ?? 0;
        const operatorData = item.operator[activeTab];
        const countries = operatorData?.countries || [];
        const uniqueDates = Array.from(new Set(countries.map((c) => c.date)));
        const currentDate =
          (selectedDates[item.id] && selectedDates[item.id][activeTab]) ||
          uniqueDates[0];
        const filteredCountries = countries.filter(
          (c) => c.date === currentDate
        );

        return (
          <div key={item.id}>
            {/* Accordion Header */}
            <div
              onClick={() => toggleAccordion(item.id)}
              className="mt-3 text-sm xxs:text-base sticky top-0 z-10 flex justify-between items-center gap-2 px-5 py-4 w-full cursor-pointer bg-[#f7f7f7] transition-all duration-300 hover:bg-[#eaeaea] xxs:rounded-xl"
            >
              <div className="flex items-center gap-2">
                <img
                  src={item.providerILogo}
                  alt={`${item.providerName[0]} Icon`}
                  className="w-6 h-6"
                />
                <span className="text-[#515151]">{item.providerName[0]}</span>
              </div>
              <i
                className={`fas fa-angle-left text-[#747474] text-lg transition-transform duration-600 ${
                  openAccordion === item.id ? "rotate-90" : ""
                }`}
              ></i>
            </div>

            {/* Accordion Content */}
            <div
              className={`transition-all duration-400 overflow-hidden height-animation ${
                openAccordion === item.id ? "expand" : ""
              }`}
            >
              {/* Operator (Tab) Headers */}
              <div className="flex text-center border-b border-[#c9c9c9] operator-container relative mt-4">
                {item.operator.map((op, index) => (
                  <div
                    key={index}
                    className={`operator ${
                      activeTab === index ? "active" : ""
                    }`}
                    onClick={() => handleTabClick(item.id, index)}
                  >
                    {op.name}
                  </div>
                ))}
              </div>

              {/* Operator (Tab) Content */}
              <div className="py-4">
                {operatorData && (
                  <div>
                    {/* Date Select Dropdown */}
                    {uniqueDates.length > 0 && (
                      <div className="flex flex-col mb-5">
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-sm bg-[#f3f8ff] rounded-md w-max px-1 py-1 h-[40px] flex items-center">
                            <label className="mr-2 font-medium text-[#484848]">
                              زمان اجاره:
                            </label>
                            <select
                              value={currentDate}
                              onChange={(e) => {
                                setSelectedDates((prev) => ({
                                  ...prev,
                                  [item.id]: {
                                    ...prev[item.id],
                                    [activeTab]: e.target.value,
                                  },
                                }));
                              }}
                              className="py-1 px-2 cursor-pointer outline-0 text-[#4d6484] w-max text-xs"
                            >
                              {uniqueDates.map((date, idx) => (
                                <option
                                  key={idx}
                                  value={date}
                                  className="text-sm"
                                >
                                  {date}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Sub Accordion for Rules & Info */}
                          <div
                            onClick={() =>
                              toggleSubAccordion(item.id, activeTab)
                            }
                            className="accordion cursor-pointer gap-x-2 text-sm px-3 text-[#484848] bg-[#f3f8ff] rounded-md w-max py-1 h-[40px] flex items-center"
                          >
                            قوانین، نکات، شرائط استفاده این اپراتور
                            <i
                              className={`fa-solid fa-chevron-down text-xs transition-transform ${
                                openSubAccordions[`${item.id}-${activeTab}`]
                                  ? "rotate-180"
                                  : ""
                              }`}
                            ></i>
                          </div>
                        </div>

                        {/* Sub Accordion Content */}
                        <div
                          className={`transition-all duration-400 height-animation overflow-hidden ${
                            openSubAccordions[`${item.id}-${activeTab}`]
                              ? "expand"
                              : ""
                          }`}
                        >
                          {operatorData.text &&
                            operatorData.text.length > 0 && (
                              <ul className="list-disc gap-2 bg-[#f7f7f7] rounded-md py-5 px-9 pl-12">
                                {operatorData.text.map((str, index) => (
                                  <li
                                    key={index}
                                    className="text-[13.5px] text-[#646464] leading-6 text-justify"
                                  >
                                    {str}
                                  </li>
                                ))}
                              </ul>
                            )}
                        </div>
                      </div>
                    )}

                    {/* Table Header */}
                    <div>
                      <div className="grid grid-cols-4 text-[#00668c] bg-[#ebf9ff] px-3 py-2 rounded-md">
                        <span>
                          <i className="ml-2 fa-solid fa-globe"></i> کشـور
                        </span>
                        <span className="flex justify-center">
                          <i className="ml-2 fa-solid fa-dollar-sign"></i> قیمـت
                        </span>
                        <span className="flex justify-center">
                          <i className="ml-2 fa-solid fa-check"></i> موجـودی
                        </span>
                        <span></span>
                      </div>
                    </div>

                    {/* Table Rows */}
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map((country) => (
                        <div
                          key={country.id}
                          className="bg-white rounded py-2 grid grid-cols-4 gap-2 relative px-[10px]"
                        >
                          <div className="flex gap-x-3 items-center">
                            <img
                              src={country.flag}
                              alt="Country Flag"
                              className="w-6 h-6"
                            />
                            <span className="font-semibold text-[#515151]">
                              {country.country[0]}
                            </span>
                          </div>
                          <div className="flex justify-center">
                            <span className="text-sm text-[#515151]">
                              {country.price.toLocaleString()}
                            </span>
                            <span className="text-xs text-[#828282] mr-1">
                              تومان
                            </span>
                          </div>
                          <div className="flex justify-center">
                            <span className="text-sm text-[#515151]">
                              {country.inventory}
                            </span>
                          </div>
                          <div>
                            <button
                              disabled={country.inventory === 0}
                              className={`text-[13px] w-full max-w-[95px] px-3 py-1 rounded-md text-white cursor-pointer ${
                                country.inventory === 0
                                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                  : "bg-[#63c6eb] hover:bg-[#52a8cf]"
                              }`}
                            >
                              {country.inventory === 0
                                ? "عدم موجودی"
                                : "دریافت"}
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="mt-4 text-center text-[#515151]">
                        داده‌ای برای نمایش وجود ندارد.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
