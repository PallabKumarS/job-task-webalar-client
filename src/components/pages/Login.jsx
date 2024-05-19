import { useState } from "react";
import { BsEyeSlashFill, BsEyeFill, BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import useAuth from "../shared/useAuth";
import { axiosPublic } from "../shared/useAxios";

const Login = () => {
  const [show, setShow] = useState(false);

  const { handleAlert, googleLogIn, logIn, setLoading, fbLogIn, userData } =
    useAuth();

  const navigate = useNavigate();

  const handleLogIn = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    logIn(email, password)
      .then(() => {
        navigate("/dashboard/profile");
        handleAlert("success", "User Logged In Successfully");
      })
      .catch((error) => {
        handleAlert("error", `${error.message}`);
        setLoading(false);
      });
  };

  const handleGoogleLogIn = async () => {
    setLoading(true);
    try {
      const result = await googleLogIn();
      const checkUser = await checkUserExists(result?.user?.email);
      if (checkUser) {
        navigate("/dashboard/profile");
        handleAlert("success", "User Logged In Successfully");
      } else {
        createRoles(
          result?.user?.email,
          result?.user?.displayName,
          result?.user?.photoURL
        );
      }
    } catch (error) {
      handleAlert("error", error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleFBLogIn = async () => {
    setLoading(true);
    try {
      const result = await fbLogIn();
      const checkUser = await checkUserExists(result?.user?.email);
      if (checkUser) {
        navigate("/dashboard/profile");
        handleAlert("success", "User Logged In Successfully");
      } else {
        createRoles(
          result?.user?.email,
          result?.user?.displayName,
          result?.user?.photoURL
        );
      }
    } catch (error) {
      handleAlert("error", error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // const checkUserExists = (email) => {
  //   axiosSecure.get(`${baseUrl}/users?email=${email}`).then((res) => {
  //     if (res.data?.email == email) {
  //       setUserData(res.data);
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });
  // };
  const checkUserExists = (email) => {
    if (userData?.email == email) {
      return true;
    } else {
      return false;
    }
  };

  const createRoles = (email, name, photo) => {
    const userData = {
      email: email,
      name: name,
      photo: photo,
      role: "visitor",
    };

    axiosPublic.post(`/users?email=${email}`, userData).then((res) => {
      if (res.status == 201) {
        handleAlert("success", "User Logged In Successfully");
        navigate("/dashboard/profile");
      }
    });
  };

  return (
    <div className="">
      <Helmet>
        <title>Task Manager | Login</title>
      </Helmet>
      <div className=" py-5 md:w-3/4 xl:w-1/2 mx-auto mt-10 relative text-center mb-10 px-3 rounded-lg">
        <h2 className="text-3xl mt-5 mb-5 text-teal-500">Please Login Here</h2>

        <form onSubmit={handleLogIn}>
          <input
            className="w-3/4 mb-3 rounded-lg py-2 px-3 "
            type="email"
            name="email"
            placeholder="Enter a Valid Email"
            required
          />

          <br />
          <input
            className="w-3/4 mb-3 rounded-lg py-2 px-3 "
            type={show ? "text" : "password"}
            name="password"
            placeholder="Enter a Password"
            required
          />
          <span
            className="z-10 w-fit absolute translate-y-3/4 -translate-x-5"
            onClick={() => setShow(!show)}
          >
            {show ? <BsEyeFill></BsEyeFill> : <BsEyeSlashFill></BsEyeSlashFill>}
          </span>

          <br />
          <button className="w-1/2 rounded-lg text-teal-500 font-semibold text-lg bg-sky-600 py-3 hover:bg-sky-800 hover:text-teal-700">
            Login
          </button>
        </form>

        <div className="text-center mx-auto mb-3">
          <p className="mb-2 mt-2">Or Login Using</p>
          <button
            onClick={handleGoogleLogIn}
            className="w-1/2 rounded-lg font-semibold text-lg bg-cyan-600 py-3 hover:bg-cyan-800 "
          >
            <FcGoogle className="text-center mx-auto w-10 h-10"></FcGoogle>
          </button>
          <p className="mb-2 mt-2">Or Login Using</p>
          <button
            onClick={handleFBLogIn}
            className="w-1/2 rounded-lg font-semibold text-lg bg-cyan-600 py-3 hover:bg-cyan-800 "
          >
            <BsFacebook className="text-center mx-auto w-10 h-10 text-blue-600"></BsFacebook>
          </button>
        </div>

        <p>
          Do not have an account? <br /> Please{" "}
          <span className="font-semibold text-teal-500 ml-2 hover:underline">
            <Link to="/register">Register</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
