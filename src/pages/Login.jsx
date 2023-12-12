import React from "react";
import { useState, } from "react";
import { useCookies } from "react-cookie";
import { useNavigate ,Link } from "react-router-dom";
import axios from "../api/axios";
import { signInFailure, signInStart,signInSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector,  } from "react-redux";




export default function Login() {
  const [formData, setFormData] = useState({});
  const {loading, error } = useSelector((state) => state.user);
  const [errorMsg, setErrorMsg] = useState("");
  const LOGIN_URL = "/login";
  const Navigate = useNavigate();

  const dispatch = useDispatch();



  const [cookies, setCookies]=useCookies(["access_token"])
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      dispatch(signInStart);  
      const res = await axios.post(LOGIN_URL, JSON.stringify(formData), {
        headers: { "Content-Type": "application/json" },
      });
      localStorage.setItem("access_token", res.data.access_token);
      setCookies("access_token",res.data.access_token)
      dispatch(signInSuccess(res.data))
      Navigate('/')
    } catch (error) {
      dispatch(signInFailure(error.response.data.message));
      setErrorMsg(error.response.data.message);
    }
  };
  return (
    <>
      <div>
        {" "}
        <h1>
          <strong>
            <center>Sign In</center>
          </strong>
        </h1>
      </div>
      <br></br>
      <br></br>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
      <div className="max-w-sm mx-auto">
        <p>
          dont Have an account ?
          <Link to="/register">
            <span className="text-blue-500 p-2">Sign up</span>
          </Link>
        </p>
      </div>
    </>
  );
}
