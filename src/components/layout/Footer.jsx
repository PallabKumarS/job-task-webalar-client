import { BsFacebook, BsTwitter } from "react-icons/bs";
import logo from "/demoLogo.png";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  const { handleAlert } = useContext(AuthContext);

  const handleNewsletter = (e) => {
    e.preventDefault();
    handleAlert("success", "You Have Successfully Submitted To Our Newsletter");
  };
  return (
    <div className="mt-20 text-center mx-auto">
      <footer className="footer p-10 bg-base-200 justify-evenly">
        <aside className="text-center">
          <img src={logo} alt="" className="mx-auto h-40" />
          <p className={`text-lg font-medium`}>
            <span className="text-3xl font-bold text-teal-500">
              Task Manager
            </span>
            <br />
            Providing Reliable Service Since 2014
          </p>
        </aside>

        <div>
          <div className="mx-auto mb-10">
            <nav className="text-center mx-auto">
              <header className="text-2xl text-center mx-auto font-medium text-teal-500 mb-3">
                Social Links
              </header>
              <div className="grid grid-flow-col gap-10">
                <a href="https://www.facebook.com/PallabKumars">
                  <BsFacebook className="text-4xl text-blue-500 hover:link-hover"></BsFacebook>
                </a>
                <a href="https://www.instagram.com/pallabkumars/">
                  <FaInstagram className="text-4xl text-red-500 hover:link-hover"></FaInstagram>
                </a>
                <a href="https://twitter.com/PallabKumarS">
                  <BsTwitter className="text-4xl text-sky-500 hover:link-hover"></BsTwitter>
                </a>
              </div>
            </nav>
          </div>
          <form className="mt-3 mb-2">
            <header className="footer-title">Newsletter</header>
            <fieldset className="form-control w-80">
              <label className="label">
                <span className="label-text">Enter your email address</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="username@site.com"
                  className="input input-bordered w-full pr-16"
                />
                <button
                  onClick={handleNewsletter}
                  className="btn btn-primary absolute top-0 right-0 rounded-l-none"
                >
                  Subscribe
                </button>
              </div>
            </fieldset>
          </form>
          <p>Copyright © 2023 - All right reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
