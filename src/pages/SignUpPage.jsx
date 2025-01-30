import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Signup() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [preferences, setPreferences] = useState([]);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handlePreferenceChange = (e) => {
    const { value, checked } = e.target;
    setPreferences((prev) =>
      checked ? [...prev, value] : prev.filter((p) => p !== value)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 4 || password.length > 10) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must be between 4 and 10 characters.",
        confirmButtonText: "Okay",
      });
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        { username:userName, email, password, preferences },
        {
          headers: {
            "Content-Type": "application/json",
          },
          maxBodyLength: Infinity,
        }
      );

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "You have been registered successfully.",
          confirmButtonText: "Okay",
        }).then(() => {
          navigate("/");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: response.data.message || "Failed to sign up.",
          confirmButtonText: "Okay",
        });
      }
    } catch (error) {
      let errorMessage = "An error occurred. Please try again.";

      if (error.response) {
        errorMessage = error.response.data.message || "Failed to sign up.";
      } else if (error.request) {
        errorMessage = "No response from the server. Please try again.";
      }
      Swal.fire({
        icon: "error",
        title: "Sign Up Error",
        text: errorMessage,
        confirmButtonText: "Okay",
      });
    }
  };

  const preferenceOptions = [
    "Movies", "Cricket", "Football", "Anime", "Cooking",
    "Traveling", "Music", "Reading", "Gaming", "Technology"
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 mb-6">
          Create Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Username</label>
            <input type="text" className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-blue-500" placeholder="John Doe" value={userName} onChange={(e) => setUserName(e.target.value)} required />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
            <input type="email" className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-blue-500" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
            <input type={isPasswordVisible ? "text" : "password"} className="border border-gray-300 rounded-lg py-2 px-4 pr-10 w-full focus:outline-none focus:border-blue-500" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} maxLength={10} required />
            <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-3 mt-6 flex items-center text-gray-600 focus:outline-none">
              {isPasswordVisible ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Preferences</label>
            <div className="grid grid-cols-2 gap-2">
              {preferenceOptions.map((option) => (
                <label key={option} className="flex items-center space-x-2">
                  <input type="checkbox" value={option} checked={preferences.includes(option)} onChange={handlePreferenceChange} className="form-checkbox h-4 w-4 text-blue-600" />
                  <span className="text-gray-700 text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full mt-auto inline-block bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-600 transition duration-300 transform hover:scale-105">
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account? <a href="/" className="text-blue-500 hover:underline">Log In</a>
        </p>
      </div>
    </div>
  );
}
