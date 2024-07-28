import { useState } from 'react';
import logo from "../../../public/icons/Logo.svg"
import useAuth from '../../Hooks/useAuth';
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingComponent from '../../SharedComponents/Loading/LoadingComponent';



const SignIn = () => {
  const [activeTab, setActiveTab] = useState('sign-in');
  const { signIn, createUser, updateUserProfile, signInWithGoogle, user, setUser, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

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

        // redirect
        const from = location.state?.from?.pathname || '/'
        navigate(from);

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


  // continue with google
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      if (loading) { <LoadingComponent /> }
      // navigate
      const from = location.state?.from?.pathname || '/';
      navigate(from)

      toast.success("Sign-in with Google Successfully");
    } catch (error) {
      toast.error(error.message);
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

          {/*  */}
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
              </div>
            </form>
          )}

          {/* continue with social */}

          <p className="mt-4 text-center text-gray-600 ">or</p>

          <a onClick={handleGoogleSignIn} href="#" className="flex items-center justify-center px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg hover:bg-stone-100 ">
            <svg className="w-6 h-6 mx-2" viewBox="0 0 40 40">
              <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
              <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
              <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
              <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
            </svg>

            <span className="mx-2">Continue with Google</span>
          </a>
        </div>
      </section >
    </div >
  );
};

export default SignIn;
