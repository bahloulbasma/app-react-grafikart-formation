
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";


const Register = () => {
    
    const [formData,setFormData]= useState({})
    const [error,setError]=useState(false)
    const [errorMsg,setErrorMsg]= useState('')
    const [loading,setLoading]=useState(false)
    const REGISTER_URL = "/register";
    const handleChange = (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
    }
    const handleSubmit =async(e)=>{
        e.preventDefault();
       try {
        setLoading(true)
        const res = await axios.post(REGISTER_URL, JSON.stringify(formData), {
            headers: { "Content-Type": "application/json" },
          })
          setLoading(false)
          setError(false) 
       } catch (error) {
        setLoading(false)
        setError(true)
    
        setErrorMsg(error.response.data.message)
       }  
    }
  return (
    <div>
      <h1 style={{ textAlign: "center", fontSize: "30px" }}>
        <strong>Sign Up</strong>
      </h1>
      <form  onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-2">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@flowbite.com"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="lastName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="firstName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="role"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Role
          </label>
          <select
            id="role"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleChange}
          >
            <option value="ROLE_ADMIN">ROLE_ADMIN</option>
            <option value="ROLE_CH">ROLE_CH</option>
            <option value="ROLE_PO">ROLE_PO</option>
          </select>
        </div>
        <button
          disabled= {loading?'disabled':''}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-5"
        >
         {loading?'loading...':'Register new account'} 
        </button>
      </form>
      <div className="max-w-sm mx-auto">
        <p>
          Have an account ?
          <Link to="/login">
            <span className="text-blue-500 p-2">Sign in</span>
          </Link>
        </p>
      </div>
      <div className="max-w-sm mx-auto">
        <p>
         {error && <p style={{color:'red'}}>{errorMsg}</p>}
        </p>
      </div>
    </div>
  );
};

export default Register;
