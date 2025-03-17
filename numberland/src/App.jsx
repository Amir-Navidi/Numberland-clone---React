import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import VirtualNum from "./components/numbers/VirtualNum";
import Footer from "./components/layout/Footer";
import AccountPage from "./components/reusableComponents/account/AccountPage";
import logo from "./assets/images/favicon/logo.svg";
import Sim from "./components/numbers/sim";
import Blog from "./components/blog/Blog";
import BlogPost from "./components/reusableComponents/blog/BlogPost";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="mx-auto w-full max-w-full xs:max-w-[90%] md:max-w-[80%] lg:max-w-[1100px] container pt-10 mb-16 xs:mb-0">
        <a className="w-full flex justify-center" href="#">
          <img
            className="logo w-full sm:w-1/2 max-w-[260px] sm:max-w-[300px]"
            src={logo}
            alt="Logo"
          />
        </a>
      </div>
      <Header />
      <main className="mt-[-1px] mx-auto w-full max-w-full xs:max-w-[90%] md:max-w-[80%] lg:max-w-[1100px] container shadow-3xl bg-white xs:rounded-3xl xs:px-3 lg:px-5 py-5 xs:mt-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

function BlogsLayout() {
  return (
    <>
      <Navbar />
      <div className="mx-auto w-full max-w-full sm:px-5 lg:px-0 lg:max-w-[1250px] container pt-10 mb-16 xs:mb-0">
        <a className="w-full flex justify-center" href="#">
          <img
            className="logo w-full sm:w-1/2 max-w-[260px] sm:max-w-[300px]"
            src={logo}
            alt="Logo"
          />
        </a>
        <div className="mt-7">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/blogs" element={<BlogsLayout />}>
          <Route index element={<Blog />} />
          <Route path="post/:slug" element={<BlogPost />} />
        </Route>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<VirtualNum />} />
          <Route path="account/:accountType" element={<AccountPage />} />
          <Route path="international-sim" element={<Sim />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
