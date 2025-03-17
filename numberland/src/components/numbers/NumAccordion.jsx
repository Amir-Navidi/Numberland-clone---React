import { useState, useRef, useEffect } from "react";
import data from "../data/virtualNum.js";
import { Tabs, Input, Button } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import other from "../../assets/images/providers/other.svg";

/**
 * AccordionContent
 * This component animates its height when opened/closed and notifies
 * the parent about its current content height via onHeightChange.
 */
function AccordionContent({ isOpen, children, onHeightChange }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  // Update height when content or open state changes.
  useEffect(() => {
    if (contentRef.current) {
      const newHeight = contentRef.current.scrollHeight;
      setHeight(newHeight);
      if (isOpen && onHeightChange) {
        onHeightChange(newHeight);
      }
    }
  }, [children, isOpen, onHeightChange]);

  // Listen for content size changes using ResizeObserver.
  useEffect(() => {
    if (!contentRef.current) return;
    const observer = new ResizeObserver(() => {
      if (contentRef.current) {
        const newHeight = contentRef.current.scrollHeight;
        setHeight(newHeight);
        if (isOpen && onHeightChange) {
          onHeightChange(newHeight);
        }
      }
    });
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, [isOpen, onHeightChange]);

  return (
    <div
      style={{
        height: isOpen ? `${height}px` : "0px",
        overflow: "hidden",
        transition: "height 0.5s ease",
      }}
    >
      <div ref={contentRef}>{children}</div>
    </div>
  );
}

/**
 * NumAccordion
 * Main component that displays provider accordions along with search,
 * filtering, lazy-loading, and a container whose max-height adjusts based
 * on the open accordion’s content.
 */
export default function NumAccordion() {
  // -------------------- Provider Accordion State --------------------
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [accordionExtraHeight, setAccordionExtraHeight] = useState(0);
  const [visibleCounts, setVisibleCounts] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeKeys, setActiveKeys] = useState({});

  // -------------------- Country Search State (Inside Tabs) --------------------
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 1000);
    return () => clearTimeout(handler);
  }, [searchValue]);

  // -------------------- Country Filter States --------------------
  const [regionFilter, setRegionFilter] = useState("همه");
  const [starFilter, setStarFilter] = useState(false);
  const [recommendedFilter, setRecommendedFilter] = useState(false);
  const [sortOption, setSortOption] = useState(null);

  // Reset visible counts when search/filter values change.
  useEffect(() => {
    setVisibleCounts({});
  }, [
    debouncedSearchValue,
    regionFilter,
    starFilter,
    recommendedFilter,
    sortOption,
  ]);

  // -------------------- Provider Data (Lazy Loaded) --------------------
  const [providerData, setProviderData] = useState({});
  const [providerLoading, setProviderLoading] = useState({});

  // -------------------- Provider Search State (Above Accordions) --------------------
  const [providerSearch, setProviderSearch] = useState("");
  const [debouncedProviderSearch, setDebouncedProviderSearch] =
    useState(providerSearch);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedProviderSearch(providerSearch);
    }, 1000);
    return () => clearTimeout(handler);
  }, [providerSearch]);

  // -------------------- Split Providers into Two Groups --------------------
  const mainProviders = data.filter(
    (provider) => provider.providerILogo !== other
  );
  const otherProviders = data.filter(
    (provider) => provider.providerILogo === other
  );

  // Filter main providers based on the provider search text.
  const filteredMainProviders = mainProviders.filter((provider) =>
    provider.providerName.some((name) =>
      name.toLowerCase().includes(debouncedProviderSearch.toLowerCase())
    )
  );

  /**
   * Handle provider accordion toggle and lazy-load country data if needed.
   */
  const singleSelection = (providerId) => {
    if (providerId === selectedProvider) {
      setSelectedProvider(null);
      setAccordionExtraHeight(0);
      return;
    }
    if (providerData[providerId]) {
      setSelectedProvider(providerId);
    } else {
      if (!providerLoading[providerId]) {
        setProviderLoading((prev) => ({ ...prev, [providerId]: true }));
        setTimeout(() => {
          const prov = data.find((p) => p.id === providerId);
          if (prov) {
            setProviderData((prev) => ({
              ...prev,
              [providerId]: prov.countries,
            }));
          }
          setProviderLoading((prev) => ({ ...prev, [providerId]: false }));
          setSelectedProvider(providerId);
        }, 1000);
      }
    }
  };

  /**
   * Get the current number of visible countries for a provider.
   */
  const getVisibleCount = (providerId) => visibleCounts[providerId] || 15;

  /**
   * Load more countries for a provider.
   */
  const handleLoadMore = (providerId) => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCounts((prev) => ({
        ...prev,
        [providerId]: getVisibleCount(providerId) + 15,
      }));
      setIsLoading(false);
    }, 1000);
  };

  /**
   * Clear a search input based on the provided key.
   */
  const handleClear = (key) => {
    if (key === "providerSearch") setProviderSearch("");
    if (key === "searchValue") setSearchValue("");
  };

  /**
   * Filter the list of countries for a provider based on search/filter criteria.
   */
  const getFilteredCountries = (countries) => {
    let filtered = [...countries];
    if (debouncedSearchValue.trim() !== "") {
      filtered = filtered.filter((item) => {
        const countryName = item.country.join(" ").toLowerCase();
        return countryName.includes(debouncedSearchValue.toLowerCase());
      });
    }
    if (regionFilter !== "همه") {
      if (regionFilter === "آمریکا") {
        filtered = filtered.filter(
          (item) =>
            item.region === "North America" || item.region === "South America"
        );
      } else if (regionFilter === "آفریقا") {
        filtered = filtered.filter((item) => item.region === "Africa");
      } else if (regionFilter === "آسیا") {
        filtered = filtered.filter((item) => item.region === "Asia");
      } else if (regionFilter === "اروپا") {
        filtered = filtered.filter((item) => item.region === "Europe");
      } else if (regionFilter === "اقیانوسیه") {
        filtered = filtered.filter((item) => item.region === "Oceania");
      }
    }
    if (starFilter) {
      filtered = filtered.filter((item) => item.star);
    }
    if (recommendedFilter) {
      filtered = filtered.filter((item) => item.recommend);
    }
    filtered.sort((a, b) => {
      if (a.inventory === 0 && b.inventory !== 0) return 1;
      if (a.inventory !== 0 && b.inventory === 0) return -1;
      if (sortOption === "priceLowToHigh") return a.price - b.price;
      if (sortOption === "priceHighToLow") return b.price - a.price;
      return 0;
    });
    return filtered;
  };

  // A ref for scrolling to the bottom (if needed)
  const bottomRef = useRef(null);

  // State to control the "other" providers accordion (if needed).
  const [selectedOther, setSelectedOther] = useState(false);
  // State to control if the container is fully expanded.
  const [IsProvidersExpanded, setIsProvidersExpanded] = useState(false);

  // Compute container max-height:
  // When not expanded and a provider is selected, use base height plus extra height.
  const baseHeight = 470;
  const containerMaxHeight =
    IsProvidersExpanded || !selectedProvider
      ? "auto"
      : `${baseHeight + accordionExtraHeight}px`;

  const [expandAccordions, setExpandAccordions] = useState(false);
  const expandAccordion = () => {
    setExpandAccordions((prev) => !prev);
  };
  return (
    <>
      <div
        className={`num-accordion-containe w-full h-auto overflow-hidden flex flex-col transition-all duration-500 ease-in-out gap-3 mt-[10%] items-center ${
          expandAccordions ? "expand" : ""
        }`}
        // style={{ maxHeight: containerMaxHeight }}
      >
        {/* Provider search field */}
        <div className="w-full mb-4 flex relative">
          <Input
            placeholder="جستجوی در سرویس ها"
            value={providerSearch}
            onChange={(e) => setProviderSearch(e.target.value)}
            className="providers-search-input font-semibold w-full"
          />
          {providerSearch && (
            <span
              onClick={() => handleClear("providerSearch")}
              className="text-xl font-semibold cursor-pointer absolute top-[54%] left-[12px] -translate-y-1/2"
            >
              ×
            </span>
          )}
        </div>

        {/* -------------------- Main Providers -------------------- */}
        {filteredMainProviders.map((provider) => {
          const currentCountries = providerData[provider.id] || [];
          const filteredCountries = getFilteredCountries(currentCountries);
          return (
            <div key={provider.id} className="w-full">
              {/* Provider header (accordion toggle) */}
              <div
                className="text-sm xxs:text-base sticky top-0 z-10 flex justify-between items-center gap-2 px-5 py-4 w-full cursor-pointer bg-[#f7f7f7] transition-all duration-300 hover:bg-[#eaeaea] xxs:rounded-xl"
                onClick={() => singleSelection(provider.id)}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={provider.providerILogo}
                    alt={`${provider.providerName[0]} Icon`}
                    className="w-6 h-6"
                  />
                  <span className="text-[#515151]">
                    {provider.providerName[0]}
                  </span>
                  {providerLoading[provider.id] && (
                    <span className="text-xs text-gray-500 ml-2">
                      درحال بارگزاری...
                    </span>
                  )}
                </div>
                <i
                  className={`fas fa-angle-down text-[#747474] text-lg transition-transform duration-700 ${
                    selectedProvider === provider.id ? "rotate-0" : "rotate-90"
                  }`}
                ></i>
              </div>

              {/* Provider Accordion Content */}
              <AccordionContent
                isOpen={selectedProvider === provider.id}
                onHeightChange={(newHeight) => {
                  if (selectedProvider === provider.id) {
                    setAccordionExtraHeight(newHeight);
                  }
                }}
              >
                <div className="flex flex-col gap-2 py-2">
                  {/* Tabs for search, filter, and sort options */}
                  <div className="border border-[#ebebeb] rounded-md px-3">
                    <Tabs
                      activeKey={activeKeys[provider.id] || null}
                      onChange={(key) =>
                        setActiveKeys((prev) => ({
                          ...prev,
                          [provider.id]: key,
                        }))
                      }
                      onTabClick={(key) => {
                        if (activeKeys[provider.id] === key) {
                          setActiveKeys((prev) => ({
                            ...prev,
                            [provider.id]: null,
                          }));
                        }
                      }}
                      className="px-4 py-2 overflow-hidden"
                      items={[
                        {
                          key: "tab1",
                          label: (
                            <span className="text-xs font-semibold">
                              <i className="fa-solid fa-magnifying-glass ml-1"></i>{" "}
                              جستجو
                            </span>
                          ),
                          children: (
                            <AnimatePresence mode="wait">
                              <motion.div
                                layout
                                className="pb-3 flex items-center px-2"
                                key={activeKeys[provider.id] + "-search"}
                                initial={{ y: 30 }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.5 }}
                              >
                                <Input
                                  className="search-input font-semibold"
                                  type="search"
                                  value={searchValue}
                                  onChange={(e) =>
                                    setSearchValue(e.target.value)
                                  }
                                  placeholder="نام کشور را وارد کنید..."
                                />
                                {searchValue && (
                                  <span
                                    onClick={() => handleClear("searchValue")}
                                    className="text-xl font-semibold cursor-pointer"
                                  >
                                    ×
                                  </span>
                                )}
                              </motion.div>
                            </AnimatePresence>
                          ),
                        },
                        {
                          key: "tab2",
                          label: (
                            <span className="text-xs font-semibold">
                              <i className="fa-solid fa-filter ml-1"></i> فیلتر
                            </span>
                          ),
                          children: (
                            <AnimatePresence mode="wait">
                              <motion.div
                                layout
                                className="pb-3 flex flex-col gap-2"
                                key={activeKeys[provider.id] + "-filter"}
                                initial={{ y: 30 }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.5 }}
                              >
                                <div className="flex flex-wrap gap-2">
                                  <Button
                                    className={`filter-btn ${
                                      regionFilter === "همه" ? "active" : ""
                                    }`}
                                    onClick={() => setRegionFilter("همه")}
                                  >
                                    همه
                                  </Button>
                                  <Button
                                    className={`filter-btn ${
                                      regionFilter === "آسیا" ? "active" : ""
                                    }`}
                                    onClick={() => setRegionFilter("آسیا")}
                                  >
                                    آسیا
                                  </Button>
                                  <Button
                                    className={`filter-btn ${
                                      regionFilter === "اروپا" ? "active" : ""
                                    }`}
                                    onClick={() => setRegionFilter("اروپا")}
                                  >
                                    اروپا
                                  </Button>
                                  <Button
                                    className={`filter-btn ${
                                      regionFilter === "آمریکا" ? "active" : ""
                                    }`}
                                    onClick={() => setRegionFilter("آمریکا")}
                                  >
                                    آمریکا
                                  </Button>
                                  <Button
                                    className={`filter-btn ${
                                      regionFilter === "آفریقا" ? "active" : ""
                                    }`}
                                    onClick={() => setRegionFilter("آفریقا")}
                                  >
                                    آفریقا
                                  </Button>
                                  <Button
                                    className={`filter-btn ${
                                      regionFilter === "اقیانوسیه"
                                        ? "active"
                                        : ""
                                    }`}
                                    onClick={() => setRegionFilter("اقیانوسیه")}
                                  >
                                    اقیانوسیه
                                  </Button>
                                  <Button
                                    className={`filter-btn ${
                                      starFilter ? "active" : ""
                                    }`}
                                    onClick={() =>
                                      setStarFilter((prev) => !prev)
                                    }
                                  >
                                    ستاره دار
                                  </Button>
                                </div>
                              </motion.div>
                            </AnimatePresence>
                          ),
                        },
                        {
                          key: "tab3",
                          label: (
                            <span className="text-xs font-semibold">
                              <i className="fa-solid fa-arrow-down-wide-short ml-1"></i>
                              ترتیب
                            </span>
                          ),
                          children: (
                            <AnimatePresence mode="wait">
                              <motion.div
                                layout
                                className="pb-3 flex flex-wrap gap-2"
                                key={activeKeys[provider.id] + "-sort"}
                                initial={{ y: 30 }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.5 }}
                              >
                                <Button
                                  className={`filter-btn ${
                                    sortOption === "priceLowToHigh"
                                      ? "active"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    setSortOption("priceLowToHigh")
                                  }
                                >
                                  قیمت (کم به زیاد)
                                </Button>
                                <Button
                                  className={`filter-btn ${
                                    sortOption === "priceHighToLow"
                                      ? "active"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    setSortOption("priceHighToLow")
                                  }
                                >
                                  قیمت (زیاد به کم)
                                </Button>
                                <Button
                                  className={`filter-btn ${
                                    recommendedFilter ? "active" : ""
                                  }`}
                                  onClick={() =>
                                    setRecommendedFilter((prev) => !prev)
                                  }
                                >
                                  پیشنهادی
                                </Button>
                              </motion.div>
                            </AnimatePresence>
                          ),
                        },
                      ]}
                    />
                  </div>
                  {/* Table header for country list */}
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
                  {/* Country list */}
                  {filteredCountries.length > 0 ? (
                    filteredCountries
                      .slice(0, getVisibleCount(provider.id))
                      .map((countryItem) => (
                        <div
                          key={countryItem.id}
                          className="bg-white rounded py-2 grid grid-cols-4 gap-2 relative px-[10px]"
                        >
                          <div className="flex gap-x-3 items-center relative group tooltip">
                            <img
                              src={countryItem.flag}
                              alt="Country Flag"
                              className="w-6 h-6"
                            />
                            <div className="relative">
                              <span className="font-semibold text-[#515151]">
                                {countryItem.country[0]}
                              </span>
                              <span className="absolute top-[-5px] left-[-13px] text-xs text-[#929292]">
                                {countryItem.operator}
                              </span>
                              {countryItem.star && (
                                <i className="fa-solid fa-star text-[#efc451] text-xs absolute left-[-32px] top-[4px]"></i>
                              )}
                            </div>
                            <span
                              className="text-xs bg-[#555] px-5 py-3 text-white rounded-xl 
                                     absolute top-[-65px] translate-x-[10px] hidden group-hover:block min-w-[140px]"
                            >
                              اپراتور مخابراتی: {countryItem.operator}
                              <br />
                              پیش شماره: {countryItem.preNumber}
                              <span className="absolute bottom-[-6px] w-[13px] h-[13px] rotate-45 bg-[#555] left-1/2 -translate-x-1/2"></span>
                            </span>
                          </div>
                          <div className="flex justify-center">
                            <span className="text-sm text-[#515151]">
                              {countryItem.price.toLocaleString()}
                            </span>
                            <span className="text-xs text-[#828282] mr-1">
                              تومان
                            </span>
                          </div>
                          <div className="flex justify-center">
                            <span className="text-sm text-[#515151]">
                              {countryItem.inventory}
                            </span>
                            <span className="text-xs text-[#828282] mr-1">
                              عدد
                            </span>
                          </div>
                          <div>
                            <button
                              disabled={countryItem.inventory === 0}
                              className={`text-[13px] w-full max-w-[95px] px-3 py-1 rounded-md text-white cursor-pointer relative overflow-hidden ${
                                countryItem.inventory === 0
                                  ? "bg-[#e4eaf3] !text-[#96a2b4] cursor-not-allowed"
                                  : "bg-[#63c6eb] buy-btn"
                              }`}
                            >
                              {countryItem.inventory === 0
                                ? "عدم موجودی"
                                : "دریافت"}
                            </button>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="p-4 text-center text-gray-600 hidden">
                      هیچ آیتمی موجود نیست
                    </div>
                  )}
                  <div ref={bottomRef} />
                  {/* "Load More" button */}
                  {selectedProvider === provider.id &&
                    getVisibleCount(provider.id) < filteredCountries.length && (
                      <div
                        className="w-full flex justify-center mt-2"
                        style={{ position: "relative", zIndex: 20 }}
                      >
                        <button
                          onClick={() => handleLoadMore(provider.id)}
                          className="bg-[#ffb03b] text-white px-4 py-1 rounded disabled:opacity-50 w-full cursor-pointer"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <div className="flex gap-2 justify-center">
                              درحال دریافت ادامه لیست
                              <div className="loader"></div>
                            </div>
                          ) : (
                            "بیشتر"
                          )}
                        </button>
                      </div>
                    )}
                </div>
              </AccordionContent>
            </div>
          );
        })}

        {/* -------------------- Other Providers -------------------- */}
        {otherProviders.length > 0 && (
          <div className="w-full">
            <div className="sticky top-0 z-10 flex justify-start items-center gap-2 px-5 py-4 w-full bg-[#fffad6] xss:rounded-xl text-sm">
              <span className="text-[#515151]">
                در صورتی که شماره مجازی برای سایت یا سرویسی میخواهید که در لیست
                بالا موجود نبود از گزینه پائین (دیگر سرویس‌ها) استفاده کنید.
              </span>
            </div>
            {otherProviders.map((provider) => {
              const currentCountries = providerData[provider.id] || [];
              const filteredCountries = getFilteredCountries(currentCountries);
              return (
                <div key={provider.id} className="w-full">
                  <div
                    className="text-sm xxs:text-base sticky top-0 z-10 flex justify-between items-center gap-2 px-5 py-4 w-full cursor-pointer bg-[#f7f7f7] transition-all duration-300 hover:bg-[#eaeaea] xxs:rounded-xl mt-[0.75rem]"
                    onClick={() => singleSelection(provider.id)}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={provider.providerILogo}
                        alt={`${provider.providerName[0]} Icon`}
                        className="w-6 h-6"
                      />
                      <span className="text-[#515151]">
                        {provider.providerName[0]}
                      </span>
                      {providerLoading[provider.id] && (
                        <span className="text-xs text-gray-500 ml-2">
                          درحال بارگزاری...
                        </span>
                      )}
                    </div>
                    <i
                      className={`fas fa-angle-down text-[#747474] text-lg transition-transform duration-700 ${
                        selectedProvider === provider.id
                          ? "rotate-0"
                          : "rotate-90"
                      }`}
                    ></i>
                  </div>
                  <AccordionContent isOpen={selectedProvider === provider.id}>
                    <div className="flex flex-col gap-2 py-2">
                      <div className="border border-[#ebebeb] rounded-md px-3">
                        <Tabs
                          activeKey={activeKeys[provider.id] || null}
                          onChange={(key) =>
                            setActiveKeys((prev) => ({
                              ...prev,
                              [provider.id]: key,
                            }))
                          }
                          onTabClick={(key) => {
                            if (activeKeys[provider.id] === key) {
                              setActiveKeys((prev) => ({
                                ...prev,
                                [provider.id]: null,
                              }));
                            }
                          }}
                          className="px-4 py-2 overflow-hidden"
                          items={[
                            {
                              key: "tab1",
                              label: (
                                <span className="text-xs font-semibold">
                                  <i className="fa-solid fa-magnifying-glass ml-1"></i>{" "}
                                  جستجو
                                </span>
                              ),
                              children: (
                                <AnimatePresence mode="wait">
                                  <motion.div
                                    layout
                                    className="pb-3 flex items-center px-2"
                                    key={activeKeys[provider.id] + "-search"}
                                    initial={{ y: 30 }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.5 }}
                                  >
                                    <Input
                                      className="search-input font-semibold"
                                      type="search"
                                      value={searchValue}
                                      onChange={(e) =>
                                        setSearchValue(e.target.value)
                                      }
                                      placeholder="نام کشور را وارد کنید..."
                                    />
                                    {searchValue && (
                                      <span
                                        onClick={() =>
                                          handleClear("searchValue")
                                        }
                                        className="text-xl font-semibold cursor-pointer"
                                      >
                                        ×
                                      </span>
                                    )}
                                  </motion.div>
                                </AnimatePresence>
                              ),
                            },
                            {
                              key: "tab2",
                              label: (
                                <span className="text-xs font-semibold">
                                  <i className="fa-solid fa-filter ml-1"></i>{" "}
                                  فیلتر
                                </span>
                              ),
                              children: (
                                <AnimatePresence mode="wait">
                                  <motion.div
                                    layout
                                    className="pb-3 flex flex-col gap-2"
                                    key={activeKeys[provider.id] + "-filter"}
                                    initial={{ y: 30 }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.5 }}
                                  >
                                    <div className="flex flex-wrap gap-2">
                                      <Button
                                        className={`filter-btn ${
                                          regionFilter === "همه" ? "active" : ""
                                        }`}
                                        onClick={() => setRegionFilter("همه")}
                                      >
                                        همه
                                      </Button>
                                      <Button
                                        className={`filter-btn ${
                                          regionFilter === "آسیا"
                                            ? "active"
                                            : ""
                                        }`}
                                        onClick={() => setRegionFilter("آسیا")}
                                      >
                                        آسیا
                                      </Button>
                                      <Button
                                        className={`filter-btn ${
                                          regionFilter === "اروپا"
                                            ? "active"
                                            : ""
                                        }`}
                                        onClick={() => setRegionFilter("اروپا")}
                                      >
                                        اروپا
                                      </Button>
                                      <Button
                                        className={`filter-btn ${
                                          regionFilter === "آمریکا"
                                            ? "active"
                                            : ""
                                        }`}
                                        onClick={() =>
                                          setRegionFilter("آمریکا")
                                        }
                                      >
                                        آمریکا
                                      </Button>
                                      <Button
                                        className={`filter-btn ${
                                          regionFilter === "آفریقا"
                                            ? "active"
                                            : ""
                                        }`}
                                        onClick={() =>
                                          setRegionFilter("آفریقا")
                                        }
                                      >
                                        آفریقا
                                      </Button>
                                      <Button
                                        className={`filter-btn ${
                                          regionFilter === "اقیانوسیه"
                                            ? "active"
                                            : ""
                                        }`}
                                        onClick={() =>
                                          setRegionFilter("اقیانوسیه")
                                        }
                                      >
                                        اقیانوسیه
                                      </Button>
                                      <Button
                                        className={`filter-btn ${
                                          starFilter ? "active" : ""
                                        }`}
                                        onClick={() =>
                                          setStarFilter((prev) => !prev)
                                        }
                                      >
                                        ستاره دار
                                      </Button>
                                    </div>
                                  </motion.div>
                                </AnimatePresence>
                              ),
                            },
                            {
                              key: "tab3",
                              label: (
                                <span className="text-xs font-semibold">
                                  <i className="fa-solid fa-arrow-down-wide-short ml-1"></i>
                                  ترتیب
                                </span>
                              ),
                              children: (
                                <AnimatePresence mode="wait">
                                  <motion.div
                                    layout
                                    className="pb-3 flex flex-wrap gap-2"
                                    key={activeKeys[provider.id] + "-sort"}
                                    initial={{ y: 30 }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.5 }}
                                  >
                                    <Button
                                      className={`filter-btn ${
                                        sortOption === "priceLowToHigh"
                                          ? "active"
                                          : ""
                                      }`}
                                      onClick={() =>
                                        setSortOption("priceLowToHigh")
                                      }
                                    >
                                      قیمت (کم به زیاد)
                                    </Button>
                                    <Button
                                      className={`filter-btn ${
                                        sortOption === "priceHighToLow"
                                          ? "active"
                                          : ""
                                      }`}
                                      onClick={() =>
                                        setSortOption("priceHighToLow")
                                      }
                                    >
                                      قیمت (زیاد به کم)
                                    </Button>
                                    <Button
                                      className={`filter-btn ${
                                        recommendedFilter ? "active" : ""
                                      }`}
                                      onClick={() =>
                                        setRecommendedFilter((prev) => !prev)
                                      }
                                    >
                                      پیشنهادی
                                    </Button>
                                  </motion.div>
                                </AnimatePresence>
                              ),
                            },
                          ]}
                        />
                      </div>
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
                      {filteredCountries.length > 0 ? (
                        filteredCountries
                          .slice(0, getVisibleCount(provider.id))
                          .map((countryItem) => (
                            <div
                              key={countryItem.id}
                              className="bg-white rounded py-2 grid grid-cols-4 gap-2 relative px-[10px]"
                            >
                              <div className="flex gap-x-3 items-center relative group tooltip">
                                <img
                                  src={countryItem.flag}
                                  alt="Country Flag"
                                  className="w-6 h-6"
                                />
                                <div className="relative">
                                  <span className="font-semibold text-[#515151]">
                                    {countryItem.country[0]}
                                  </span>
                                  <span className="absolute top-[-5px] left-[-13px] text-xs text-[#929292]">
                                    {countryItem.operator}
                                  </span>
                                  {countryItem.star && (
                                    <i className="fa-solid fa-star text-[#efc451] text-xs absolute left-[-32px] top-[4px]"></i>
                                  )}
                                </div>
                                <span
                                  className="text-xs bg-[#555] px-5 py-3 text-white rounded-xl 
                                     absolute top-[-65px] translate-x-[10px] hidden group-hover:block min-w-[140px]"
                                >
                                  اپراتور مخابراتی: {countryItem.operator}
                                  <br />
                                  پیش شماره: {countryItem.preNumber}
                                  <span className="absolute bottom-[-6px] w-[13px] h-[13px] rotate-45 bg-[#555] left-1/2 -translate-x-1/2"></span>
                                </span>
                              </div>
                              <div className="flex justify-center">
                                <span className="text-sm text-[#515151]">
                                  {countryItem.price.toLocaleString()}
                                </span>
                                <span className="text-xs text-[#828282] mr-1">
                                  تومان
                                </span>
                              </div>
                              <div className="flex justify-center">
                                <span className="text-sm text-[#515151]">
                                  {countryItem.inventory}
                                </span>
                                <span className="text-xs text-[#828282] mr-1">
                                  عدد
                                </span>
                              </div>
                              <div>
                                <button
                                  disabled={countryItem.inventory === 0}
                                  className={`text-[13px] w-full max-w-[95px] px-3 py-1 rounded-md text-white cursor-pointer relative overflow-hidden ${
                                    countryItem.inventory === 0
                                      ? "bg-[#e4eaf3] !text-[#96a2b4] cursor-not-allowed"
                                      : "bg-[#63c6eb] buy-btn"
                                  }`}
                                >
                                  {countryItem.inventory === 0
                                    ? "عدم موجودی"
                                    : "دریافت"}
                                </button>
                              </div>
                            </div>
                          ))
                      ) : (
                        <div className="p-4 text-center text-gray-600 hidden">
                          هیچ آیتمی موجود نیست
                        </div>
                      )}
                      <div ref={bottomRef} />
                      {selectedProvider === provider.id &&
                        getVisibleCount(provider.id) <
                          filteredCountries.length && (
                          <div
                            className="w-full flex justify-center mt-2"
                            style={{ position: "relative", zIndex: 20 }}
                          >
                            <button
                              onClick={() => handleLoadMore(provider.id)}
                              className="bg-[#ffb03b] text-white px-4 py-1 rounded disabled:opacity-50 w-full cursor-pointer"
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <div className="flex gap-2 justify-center">
                                  درحال دریافت ادامه لیست
                                  <div className="loader"></div>
                                </div>
                              ) : (
                                "بیشتر"
                              )}
                            </button>
                          </div>
                        )}
                    </div>
                  </AccordionContent>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="pt-4 pb-10 flex justify-center">
        <button
          onClick={expandAccordion}
          className="text-[#009cd7] hover:text-[#ed9f2c] transition-all duration-300 hover:scale-110 text-sm cursor-pointer flex items-center gap-x-1"
        >
          نمایش سرویس های بیشتر{" "}
          <i
            className={`fa-solid fa-chevron-down transition-transform duration-500 ${
              expandAccordions ? "rotate-180" : "rotate-0"
            }`}
          ></i>
        </button>
      </div>
    </>
  );
}
