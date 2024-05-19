import { Outlet } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import NavBar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

const Root = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
    top: "6rem",
  });
  return (
    <div className="">
      <div>
        <NavBar></NavBar>
      </div>
      <motion.div
        className="fixed top-18 left-0 right-0 h-2 bg-blueViolet origin-[0] z-[100]"
        style={{ scaleX }}
      />
      <div className="">
        <Outlet></Outlet>
      </div>
      <div className="">
        <Footer></Footer>
      </div>
      <Toaster></Toaster>
    </div>
  );
};

export default Root;
