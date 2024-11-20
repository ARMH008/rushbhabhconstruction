/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import loginImage from "../assets/image.png";
import { Link } from "react-router-dom";
const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  //const navigate = useNavigate();
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (validateForm()) {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const res = await axios.post(
          "api/v1/users/signup",
          {
            name,
            email,
            password,
            passwordConfirm,
          },
          config
        );

        //console.log("Submitting form data:", res.data.data);

        if (res.data.status === "success") {
          //you can use alert to tell user singup succesfully
          //console.log("Signup successful");
          setShowSuccessAlert(true);
          setTimeout(() => setShowSuccessAlert(false), 2000);
          window.location.assign("/");
        }
      }
    } catch (error) {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 2000);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    // Validate name
    if (!name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Validate email
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    // Validate password
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    // Validate confirm password
    if (password !== passwordConfirm) {
      newErrors.passwordConfirm = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1  text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              //backgroundImage: `url(https://www.google.com/url?sa=i&url=https%3A%2F%2Ficonscout.com%2Fillustrations%2Ffarmers&psig=AOvVaw3ijm_4WmPD6qg3PGl0Igka&ust=1731750265432000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKDZtsaG3okDFQAAAAAdAAAAABAJ)`,
              backgroundImage: `url(${loginImage})`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <form onSubmit={handleSubmit}>
            <div className=" flex flex-col items-center">
              <div className="text-center">
                <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                  Sign up
                </h1>
                <p className="text-[12px] text-gray-500">
                  Hey enter your details to create your account
                </p>
              </div>
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs flex flex-col gap-4">
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors?.email && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.email}
                    </div>
                  )}

                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors?.password && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </div>
                  )}

                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="password"
                    placeholder="Password Confirm"
                    name="passwordConfirm"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                  {errors?.confirmPassword && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword}
                    </div>
                  )}

                  <button className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span className="ml-3">Sign Up</span>
                  </button>
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    Already have an account?{" "}
                    <Link to="/signin">
                      <span className="text-blue-900 font-semibold">
                        Sign in
                      </span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignupPage;
