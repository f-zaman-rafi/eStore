import { useState } from 'react';
import logo from "../../../public/icons/Logo.svg"
import useAuth from '../../Hooks/useAuth';
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";



const SignIn = () => {
  const [activeTab, setActiveTab] = useState('sign-in');
  const { signIn, createUser, updateUserProfile, signInWithGoogle, signInWithGitHub, user, setUser } = useAuth();

  // react hook form
  const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm();


  // create user & Login User

  const onSubmit = async (data) => {
    try {
      // create user
      if (activeTab === 'sign-up') {
        // create user
        const res = await createUser(data.email, data.password);
        const loggedUser = res.user;

        // update user profile
        await updateUserProfile(data.username)

        // set user state
        setUser({ ...loggedUser, displayName: data.username })

        // toast
        toast.success('Registered Successfully');

      }
      // login with email
      if (activeTab === 'sign-in') {
        await signIn(data.logInEmail, data.logInPassword);
        toast.success('Logged-In Successfully');
      }

    } catch (error) {
      // toast.error(error.message)
      if (error.message.includes('auth/email-already-in-use')) {
        toast.error('The email provided is already in use. Please log in or use another email.');
      } else if (error.message.includes('auth/invalid-email')) {
        toast.error('Please enter a valid email address.');
      } else if (error.message.includes('auth/weak-password')) {
        toast.error('Password is too weak. Please choose a stronger password.');
      } else if (error.message.includes('auth/user-not-found')) {
        toast.error('No account found with this email address. Please sign up first.');
      } else if (error.message.includes('auth/wrong-password')) {
        toast.error('Incorrect password. Please try again.');
      } else if (error.message.includes('auth/too-many-requests')) {
        toast.error('Too many login attempts. Please try again later.');
      } else if (error.message.includes('auth/operation-not-allowed')) {
        toast.error('This operation is not allowed. Please contact support.');
      } else if (error.message.includes('auth/user-disabled')) {
        toast.error('This account has been disabled. Please contact support.');
      } else if (error.message.includes('auth/internal-error')) {
        toast.error('An internal error occurred. Please try again later.');
      } else if (error.message.includes('auth/network-request-failed')) {
        toast.error('Network error. Please check your connection and try again.');
      } else {
        toast.error('An unexpected error occurred. Please try again later.');
      }
    }
  }

  // tab Handle Function
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    reset();
  };

  // validate password
  const validateConfirmPassword = (value) => {
    const { password } = getValues();
    return password === value || "Passwords not matching"
  }

  console.log(user)

  return (
    <div className='my-16 min-h-screen '>
      <section className="bg-white flex justify-center">
        <div className="container mx-auto max-w-md p-6 bg-white rounded-lg shadow-2xl  py-10">
          {/* Tabs */}
          <div className="flex justify-center mb-4">
            <img className="w-auto h-7 sm:h-8" src={logo} alt="Logo" />
          </div>
          <div className="flex justify-center mb-6">
            <button
              className={`w-1/2 py-4 border-b-2 ${activeTab === 'sign-in' ? 'border-black text-black font-bold' : 'border-transparent text-gray-500'}`}
              onClick={() => handleTabChange('sign-in')}
            >
              Sign In
            </button>
            <button
              className={`w-1/2 py-4 border-b-2 ${activeTab === 'sign-up' ? 'border-black text-black font-bold' : 'border-transparent text-gray-500'}`}
              onClick={() => handleTabChange('sign-up')}
            >
              Sign Up
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'sign-in' && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative flex items-center mt-6">
                <span className="absolute">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input
                  {...register("logInEmail", { required: true })}
                  type="email"
                  className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-stone-700 focus:ring-stone-800 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Email address"
                />
              </div>
              {errors.logInEmail?.type === 'required' && <p role="alert"><span className="text-red-500 ml-2 text-xs">Email is required</span></p>}

              <div className="relative flex items-center mt-4">
                <span className="absolute">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  {...register("logInPassword", { required: true })}
                  type="password"
                  className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-stone-700 focus:ring-stone-800 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Password"
                />
              </div>
              {errors.logInPassword?.type === 'required' && <p role="alert"><span className="text-red-500 ml-2 text-xs">Password is required</span></p>}

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-lg hover:bg-stone-900 focus:outline-none focus:ring focus:ring-stone-800 focus:ring-opacity-50"
                >
                  Sign In
                </button>
                <div className="mt-6 text-center">
                  <a href="#" className="text-sm text-blue-500 hover:underline">
                    Forgot your password?
                  </a>
                </div>
              </div>
            </form>
          )}

          {activeTab === 'sign-up' && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative flex items-center mt-6">
                <span className="absolute">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input
                  {...register("username", { required: true })}
                  type="text"
                  className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-stone-700 focus:ring-stone-800 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="username"
                />
              </div>
              {errors.username?.type === 'required' && <p role="alert"><span className="text-red-500 ml-2 text-xs">username is required</span></p>}

              <div className="relative flex items-center mt-4">
                <span className="absolute">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-stone-700 focus:ring-stone-800 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Email address"
                />
              </div>
              {errors.email?.type === 'required' && <p role="alert"><span className="text-red-500 ml-2 text-xs">email is required</span></p>}

              <div className="relative flex items-center mt-4">
                <span className="absolute">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  {...register("password", {
                    required: "Password is required",
                    validate: {
                      minLength: value => value.length >= 8 || "Must be at least 8 characters long",
                      hasLowerCase: value => /[a-z]/.test(value) || "Must contain at least one lowercase letter",
                      hasUpperCase: value => /[A-Z]/.test(value) || "Must contain at least one uppercase letter",
                      hasNumber: value => /\d/.test(value) || "Must contain at least one number",
                      hasSpecialChar: value => /[@$!%*?&]/.test(value) || "Must contain at least one special character",
                    }
                  })}
                  type="password"
                  className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-stone-700 focus:ring-stone-800 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Password"
                />
              </div>
              {errors.password && <span className="text-red-500 ml-2 text-xs">{errors.password.message}</span>}

              <div className="relative flex items-center mt-4">
                <span className="absolute">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  {...register("confirmPassword", {
                    required: "Password is required",
                    validate: validateConfirmPassword

                  })}
                  type="password"
                  className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-stone-700 focus:ring-stone-800 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Confirm Password"
                />
              </div>
              {errors.confirmPassword && <span className="text-red-500 ml-2 text-xs">{errors.confirmPassword.message}</span>}

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-lg hover:bg-stone-900 focus:outline-none focus:ring focus:ring-stone-800 focus:ring-opacity-50"
                >
                  Sign Up
                </button>
                <div className="mt-6 text-center">
                  <a href="#" className="text-sm text-blue-500 hover:underline">
                    Already have an account?
                  </a>
                </div>
              </div>
            </form>
          )}

          {/* continue with social */}

          <div className="flex items-center justify-between mt-4">
            {/* GitHub Icon */}
            <a className="mx-1.5 dark:hover:text-blue-400 text-gray-400 transition-colors duration-300 transform hover:text-blue-500" href="#">
              <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.15 6.84 9.47.5.09.68-.22.68-.49v-1.74c-2.81.61-3.4-1.33-3.4-1.33-.46-1.16-1.12-1.47-1.12-1.47-.92-.63.07-.62.07-.62 1.01.07 1.54 1.04 1.54 1.04.9 1.55 2.35 1.11 2.92.85.09-.65.35-1.1.64-1.35-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.66 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.39.2 2.41.1 2.66.64.7 1.03 1.59 1.03 2.68 0 3.83-2.34 4.69-4.56 4.94.35.3.66.91.66 1.83v2.71c0 .28.18.58.68.49C19.13 20.15 22 16.42 22 12c0-5.52-4.48-10-10-10z" />
              </svg>
            </a>

            {/* Google Icon */}
            <a className="mx-1.5 dark:hover:text-blue-400 text-gray-400 transition-colors duration-300 transform hover:text-blue-500" href="#">
              <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M6.75732 6.22215L11.9865 10.0365L17.3285 6.09078C18.1446 5.44632 19.191 5.33494 20.046 5.76509C20.9153 6.20242 21.5 7.1513 21.5 8.44705V16.7618C21.5 17.2333 21.4407 17.9088 21.0814 18.4781C20.6956 19.0893 20.019 19.4943 18.9793 19.4943H16.889C16.6129 19.4943 16.389 19.2704 16.389 18.9943V13.2008L12.2867 16.2518C12.1093 16.3838 11.8662 16.3835 11.689 16.2511L7.61098 13.2036V16.7186C7.61098 16.9947 7.38713 17.2186 7.11098 17.2186C6.83484 17.2186 6.61098 16.9947 6.61098 16.7186V12.2058C6.61098 12.0165 6.71781 11.8435 6.88699 11.7588C7.05617 11.674 7.25871 11.692 7.41029 11.8053L11.9891 15.2269L16.5906 11.8046C16.7423 11.6918 16.9446 11.6741 17.1135 11.759C17.2824 11.8439 17.389 12.0168 17.389 12.2058V18.4943H18.9793C19.7234 18.4943 20.0572 18.2272 20.2358 17.9443C20.4408 17.6194 20.5 17.1787 20.5 16.7618V8.44705C20.5 7.46479 20.0744 6.89879 19.5966 6.65841C19.1071 6.41213 18.4732 6.45826 17.9434 6.87938C17.9388 6.88305 17.9341 6.88664 17.9294 6.89014L12.2854 11.0589C12.1097 11.1887 11.8701 11.1894 11.6937 11.0607L6.16182 7.02554C5.66596 6.65592 4.93253 6.43285 4.36979 6.51816C4.10149 6.55884 3.89833 6.66433 3.75932 6.82883C3.62023 6.99343 3.5 7.27084 3.5 7.74087V17.1491C3.5 17.8103 3.73627 18.1246 3.96224 18.2868C4.21573 18.4688 4.53566 18.5148 4.74399 18.4962C4.75875 18.4949 4.77357 18.4943 4.78839 18.4943H6.11098C6.38713 18.4943 6.61098 18.7181 6.61098 18.9943C6.61098 19.2704 6.38713 19.4943 6.11098 19.4943H4.80887C4.42163 19.5237 3.86072 19.445 3.37906 19.0992C2.85986 18.7264 2.5 18.0915 2.5 17.1491V7.74087C2.5 7.09846 2.66719 6.57192 2.99552 6.18339C3.32393 5.79476 3.7682 5.59794 4.2199 5.52946C5.09621 5.39661 6.09189 5.72702 6.75732 6.22215Z" />
              </svg>
            </a>

          </div>
        </div>
      </section >
    </div >
  );
};

export default SignIn;
