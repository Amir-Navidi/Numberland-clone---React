import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import close from "../../assets/images/icons/close.png";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState({});

  const handleSubmenuEnter = (parentId, submenuIndex) => {
    setOpenSubmenu({ [parentId]: submenuIndex });
  };

  const handleSubmenuLeave = (parentId) => {
    setOpenSubmenu((prev) => ({ ...prev, [parentId]: null }));
  };

  const [isOpen, setIsOpen] = useState(null);
  const toggleDropdown = (id) => {
    setIsOpen(isOpen === id ? null : id);
  };
  const [openSidebar, setOpenSidebar] = useState(false);
  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  // Close sidebar when clicking outside of it
  const sidebar = useRef(null);
  const handleClickOutside = (event) => {
    if (sidebar.current && !sidebar.current.contains(event.target)) {
      setOpenSidebar(false);
    }
  };

  useEffect(() => {
    if (openSidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openSidebar]);

  const [openNested, setOpenNested] = useState(null);
  const toggleNested = (id) => {
    setOpenNested(openNested === id ? null : id);
  };

  const links = [
    {
      id: 1,
      title: "خدمات",
      href: "/",
      submenu: [
        { id: "1.0", title: "", href: "#" },
        { id: "1.1", title: "شماره مجازی", href: "/" },
        { id: "1.2", title: "شماره مجازی گوگل ویس", href: "#" },
        {
          id: "1.3",
          title: "اکانت های هوش مصنوعی",
          href: "#",
          submenu: [
            { id: "1.3-1", title: "اکانت Chatgpt", href: "#" },
            { id: "1.3-2", title: "اکانت Gemini Advanced", href: "#" },
            { id: "1.3-3", title: "اکانت POE", href: "#" },
            { id: "1.3-4", title: "کانت Claude AI", href: "#" },
            { id: "1.3-5", title: "اکانت Midjourney", href: "#" },
            { id: "1.3-6", title: "اکانت Leonardo ai", href: "#" },
            { id: "1.3-7", title: "اکانت Runway", href: "#" },
            { id: "1.3-8", title: "اکانت Pika art", href: "#" },
            { id: "1.3-9", title: "اکانت Stability ai", href: "#" },
            { id: "1.3-10", title: "اکانت Synthesia", href: "#" },
            { id: "1.3-11", title: "اکانت Suno AI", href: "#" },
            { id: "1.3-12", title: "کانت ElevenLabs", href: "#" },
            { id: "1.3-13", title: "اکانت DeepSeek", href: "#" },
            { id: "1.3-14", title: "اکانت Kling AI", href: "#" },
            { id: "1.3-15", title: "اکانت Qwen AI", href: "#" },
            { id: "1.3-16", title: "اکانت API OpenAI", href: "#" },
            { id: "1.3-17", title: "اکانت Grok", href: "#" },
          ],
        },
        {
          id: "1.7",
          title: "اکانت‌های پرمیوم",
          href: "#",
          submenu: [
            { id: "1.7-1", title: "اکانت Telegram Premium", href: "#" },
            { id: "1.7-2", title: "خرید Telegram Stars", href: "#" },
            { id: "1.7-3", title: "اکانت Linkedin Premium", href: "#" },
            { id: "1.7-4", title: "اکانت Twitter Premium", href: "#" },
            { id: "1.7-5", title: "اکانت Grammarly Premium", href: "#" },
            { id: "1.7-6", title: "اکانت Telegram Tdata", href: "#" },
            { id: "1.7-7", title: "اکانت Spotify Premium", href: "#" },
            { id: "1.7-8", title: "اکانت Gmail", href: "#" },
          ],
        },
        { id: "1.4", title: "سیم کارت خارجی", href: "/international-sim" },
        { id: "1.5", title: "شارژ سیم کارت بین المللی ", href: "#" },
        { id: "1.6", title: "درخواست محصول", href: "#" },
      ],
    },
    {
      id: 2,
      title: "وبلاگ",
      href: "/Blogs",
    },
    {
      id: 3,
      title: "راهنما",
      href: "#",
      submenu: [
        { id: "3.0", title: "", href: "#" },
        { id: "3.1", title: "آموزش ها", href: "#" },
        { id: "3.2", title: "سوالات متداول", href: "#" },
        { id: "3.3", title: "شماره مجازی چیست", href: "#" },
      ],
    },
    {
      id: 4,
      title: "نمایندگی فروش",
      href: "#",
    },
    {
      id: 5,
      title: "تماس",
      href: "#",
      submenu: [
        { id: "5.0", title: "", href: "#" },
        { id: "5.1", title: "قوانین", href: "#" },
        { id: "5.2", title: "درباره ما", href: "#" },
        { id: "5.3", title: "تماس با ما", href: "#" },
      ],
    },
  ];

  const location = useLocation(); // Get current URL path

  return (
    <nav className="bg-[#e5eefb] h-[56px] flex items-center">
      <div
        className={`fixed right-0 top-0 bg-[#05020294] w-full h-full z-[99998] opacity-0 transition-opacity duration-700 ${
          openSidebar ? "visible !opacity-100" : "invisible"
        }`}
      ></div>
      <aside
        ref={sidebar}
        className={`overflow-y-auto transition-all ease-in-out duration-500 fixed right-0 top-0 bg-white w-[60%] min-w-[250px] max-w-[275px] h-full z-[99999] py-4 !shadow-[inset_-3px_0px_15px_rgba(0,0,0,.29)] ${
          openSidebar ? "" : "!-right-[290px]"
        }`}
      >
        <img
          onClick={toggleSidebar}
          className="w-[28px] opacity-60 mr-auto ml-3"
          src={close}
          alt=""
        />
        <ul className="flex flex-col divide-y-1 divide-[#f1f1f1]">
          {links.map((link) => (
            <Link
              to={link.href}
              key={link.id}
              className={`py-3 px-5 text-sm text-[#003f57] flex flex-col`}
            >
              <div
                className="flex items-center gap-x-2"
                onClick={() => toggleDropdown(link.id)}
              >
                {link.title}
                {link.submenu && (
                  <i
                    className={`fa-solid fa-chevron-down text-[12px] mb-1 transition-all duration-400 ${
                      isOpen === link.id ? "rotate-180" : "!rotate-0"
                    }`}
                  ></i>
                )}
              </div>
              <ul
                className={`height-animation transition-all overflow-hidden duration-300 ${
                  isOpen === link.id && link.submenu ? "expand mt-3" : ""
                }`}
              >
                <div className="bg-[#f5f8fc] px-5 py-4 rounded-sm flex flex-col gap-y-4">
                  {link.submenu?.map((sub, index) => (
                    <li
                      onClick={() => toggleNested(sub.id)}
                      key={sub.id}
                      className={`text-[#003f57] ${
                        index === 0 ? "hidden" : ""
                      }`}
                    >
                      <span className="flex items-center w-max gap-x-1">
                        {sub.title}
                        {sub.submenu && (
                          <i className="fa-solid fa-chevron-down text-[12px]"></i>
                        )}
                      </span>
                      {openNested === sub.id && sub.submenu && (
                        <ul className="space-y-3 mt-4">
                          {sub.submenu.map((nested) => (
                            <li key={nested.id} className="w-full text-xs">
                              <Link>{nested.title}</Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </div>
              </ul>
            </Link>
          ))}
        </ul>
      </aside>
      <ul className="w-full flex items-center px-5 py-1 gap-x-5 relative z-[9999]">
        <li
          onClick={toggleSidebar}
          className="text-[#1589d4] flex items-center gap-x-2 md:hidden"
        >
          <i className="fa-solid fa-bars"></i>
          فهرست
        </li>
        {links.map((link) => (
          <Link
            to={link.href}
            key={link.id}
            className="relative group py-3 hidden md:inline"
            onMouseEnter={() => setOpenDropdown(link.id)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <li className="text-[#003f57] flex items-center gap-2 custom-animation">
              {link.title}
              {link.submenu && (
                <i className="fa-solid fa-chevron-down text-[#003f57] text-xs"></i>
              )}
            </li>
            <AnimatePresence>
              {link.submenu && openDropdown === link.id && (
                <motion.ul
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute right-0 mt-3 bg-[#f7f8fa] border border-gray-300 shadow-3xl rounded-lg p-1 dropdown-menu"
                >
                  {link.submenu.map((sub, index) => (
                    <li
                      key={sub.id}
                      className={`px-4 py-[7px] relative flex justify-between items-center group ${
                        sub.submenu ? "has-nested-menu" : ""
                      } ${index === 0 ? "menu-pointer" : ""}`}
                      onMouseEnter={() => handleSubmenuEnter(link.id, index)}
                      onMouseLeave={() => handleSubmenuLeave(link.id)}
                    >
                      <Link
                        to={sub.href}
                        className={`flex items-center gap-2 text-[#646464] transition-color duration-200 hover:text-[#E5B264] menu-link  ${
                          location.pathname === sub.href
                            ? "!text-[#e08600]"
                            : ""
                        }`}
                      >
                        {sub.title}
                        {sub.submenu && (
                          <i className="fa-solid fa-angle-left text-[#003f57] font-light mt-[1px] text-sm"></i>
                        )}
                      </Link>
                      {sub.submenu && (
                        <AnimatePresence>
                          {openSubmenu[link.id] === index && (
                            <motion.ul
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                              className="absolute right-[100%] top-0 bg-[#f7f8fa] border border-gray-300 shadow-3xl rounded-lg p-1 dropdown-menu"
                            >
                              {sub.submenu.map((nested, nestedIndex) => (
                                <li
                                  key={nested.id}
                                  className={`px-4 py-[5px] text-sm ${
                                    nestedIndex === 0
                                      ? "nested-menu-pointer"
                                      : ""
                                  }`}
                                >
                                  <Link
                                    to={nested.href}
                                    className="text-[#646464] hover:text-[#E5B264] transition-color duration-200"
                                  >
                                    {nested.title}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      )}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </Link>
        ))}
        <li className="w-[138px] h-[32px] mr-auto px-3 py-1 bg-[#ffb03b] rounded-md login-btn">
          <Link>
            <span className="absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 w-max text-white z-[100] flex items-center gap-1">
              <i className="fa-solid fa-arrow-right-to-bracket"></i>
              ورود | ثبت نام
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
