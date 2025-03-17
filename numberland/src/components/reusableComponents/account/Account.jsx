import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export default function Account({
  titleImage,
  upperText,
  texts,
  accordion,
  products,
  title,
}) {
  const [openAccordion, setOpenAccordion] = useState([]);

  const expandAccordion = (id) => {
    setOpenAccordion((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div className="px-5 xxs:px-12 py-5">
      <div className="flex flex-col items-center lg:flex-row lg:items-start gap-6 mt-7">
        <div className="flex flex-col gap-y-4">
          <h1 className="text-[#5f5f5f] text-[19px] xxs:text-xl font-semibold">
            {upperText}
          </h1>
          {texts.map((text, index) => (
            <div key={index} className="flex flex-col gap-y-6">
              <p className="text-justify text-[#646464] !text-[15px] xxs:!text-base ">
                {text}
              </p>
            </div>
          ))}
        </div>
        <img
          className="w-full lg:w-[50%] max-w-[450px] rounded-3xl"
          src={titleImage}
          alt=""
        />
      </div>

      <div className="mt-10 flex flex-col">
        {products && (
          <div>
            {products.map((product, index) => (
              <div key={index} className="mt-14">
                <h2 className="font-semibold text-lg xxs:text-xl text-black">
                  {product.title}
                </h2>
                <div className="flex flex-wrap gap-y-5 mt-7">
                  {product.items.map((item, index) => (
                    <div
                      key={index}
                      className="account-items my-[7px] mx-[10px] min-w-[150px] xs:min-w-[170px] flex flex-col items-center gap-y-3 bg-[#f5f8fc] pb-7 rounded-[20px] transition-all duration-400 hover:scale-107 cursor-pointer"
                    >
                      <img src={item.img} alt={item.title} />
                      <div className="flex flex-col items-center gap-y-1 w-full px-4">
                        <h3 className="text-sm">{item.title}</h3>
                        <div className="text-xs flex justify-between w-full">
                          <span className="text-[#777]"> قیمت از:</span>
                          <span className="text-[#828282]">
                            {item.price ? item.price.toLocaleString() : null}{" "}
                            تومان
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {accordion && (
          <div>
            <h3 className="font-semibold text-[17px] xxs:text-xl text-black mt-8">
              سوالات متداول
            </h3>
            <div className="flex flex-col gap-y-5 mt-6">
              {accordion.map((item, index) => (
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
                          openAccordion.includes(index)
                            ? "rotate-180"
                            : "rotate-0"
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
        )}
      </div>
    </div>
  );
}

Account.propTypes = {
  titleImage: PropTypes.string.isRequired,
  upperText: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          img: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          price: PropTypes.number,
        })
      ).isRequired,
    })
  ).isRequired,
  accordion: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
};

Account.defaultProps = {
  accordion: [],
};
