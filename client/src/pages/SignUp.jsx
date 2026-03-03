import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const response = await res.json();
      setErrorMessage(response.message);
      setLoading(false);
      if (res.ok) {
        setToken(response.token);
        // setItem("token", token);
        localStorage.setItem("token", token);
        navigate("/sign-in");
      }
    } catch (err) {
      setErrorMessage(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-3">
        <div className="max-w-4xl w-full flex flex-col  mb-20 md:flex-row gap-5">
          {/* Left */}
          <div className="flex-1 shadow-lg rounded-xl p-5 bg-green-100 dark:bg-green-800 flex flex-col items-center justify-center">
            <Link
              to="/"
              className="font-bold dark:text-white text-4xl text-center"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-green-500 via-green-600 to-green-700 rounded-lg text-white shadow-md">
                ರೈತರ
              </span>
              ಸಹಾಯಕ
            </Link>
            <p className="text-sm mt-5 text-center">
              ರೈತರ ಶಕ್ತೀಕರಣ, ಬೆಳೆಯುವ ಭವಿಷ್ಯ
            </p>
          </div>
          {/* Right */}
          <div className="flex-1 shadow-lg rounded-xl p-5 bg-green-100 dark:bg-green-800 transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-green-50 dark:hover:bg-green-700 duration-700">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="username" value="ನಿಮ್ಮ ಬಳಕೆದಾರ ಹೆಸರು" />
                <TextInput
                  type="text"
                  placeholder="ಬಳಕೆದಾರಹೆಸರು"
                  id="username"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="email" value="ನಿಮ್ಮ ಇಮೇಲ್" />
                <TextInput
                  type="email"
                  placeholder="ಉದಾ: abc@xyz.com"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="password" value="ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್" />
                <TextInput
                  type="password"
                  placeholder="ಪಾಸ್‌ವರ್ಡ್"
                  id="password"
                  onChange={handleChange}
                />
              </div>
              <Button
                gradientDuoTone="purpleToPink"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <Spinner className="text-center" size="lg" />
                ) : (
                  "ಸೈನ್ ಅಪ್"
                )}
              </Button>
              <OAuth />
            </form>
            <div className="flex gap-2 text-sm mt-5">
              <span>ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೆ?</span>
              <Link to="/sign-in" className="text-blue-500">
                ಸೈನ್ ಇನ್
              </Link>
            </div>
            {errorMessage && (
              <Alert
                className="mt-5"
                color={
                  errorMessage.includes("successful") ? "success" : "failure"
                }
              >
                {errorMessage}
              </Alert>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
