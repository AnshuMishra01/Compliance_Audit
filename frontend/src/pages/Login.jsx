import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const [isOfficer, setIsOfficer] = useState(false);
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleLogin = () => {
    const redirectUri = isOfficer
      ? `http://localhost:5173/officer/dashboard`
      : `http://localhost:5173/employee/dashboard`;

    loginWithRedirect({
      redirectUri: redirectUri,
    });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="flex flex-col md:flex-row w-full">
        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 p-8 flex items-center justify-center"
        >
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-8">
              <div className="flex flex-col justify-center items-center space-y-5 w-full">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-5xl p-2 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500"
                >
                  Login.
                </motion.div>
                <div className="flex items-center mb-4">
                  <input
                    id="officer-checkbox"
                    type="checkbox"
                    checked={isOfficer}
                    onChange={(e) => setIsOfficer(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="officer-checkbox"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    I am an officer
                  </label>
                </div>
                <button
                  className="text-white bg-blue-700 w-full transition hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 duration-300"
                  onClick={handleLogin}
                >
                  Login to your account
                </button>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <a href="#" className="text-orange-500 hover:underline">
                  Sign Up here
                </a>
              </p>
            </motion.div>
          </div>
        </motion.div>
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:block md:w-1/2 bg-gradient-to-br from-gray-700 to-gray-800 p-8"
        >
          <div className="w-full h-full rounded-md bg-gradient-to-br from-gray-800 to-gray-700 shadow-2xl flex items-center justify-center">
            <img
              className="w-3/4"
              src="../src/assets/tablet-login-concept-illustration.png"
              alt="Login Illustration"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
