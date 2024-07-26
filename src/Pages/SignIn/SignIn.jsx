import { useState } from 'react';
import logo from "../../../public/icons/Logo.svg"
import useAuth from '../../Hooks/useAuth';
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";



const SignIn = () => {
  const [activeTab, setActiveTab] = useState('sign-in');
  const { signIn, createUser, updateUserProfile, signInWithGoogle, signInWithGitHub, user, setUser } = useAuth();

  // react hook form
  const { register, handleSubmit, formState: { errors }, reset } = useForm();


  // create user & Login User

  const onSubmit = async (data) => {
    try {
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
    } catch (error) {
      console.error(error)
    }
  }

  // tab Handle Function
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    reset();
  };

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
                {errors.logInEmail?.type === 'required' && <p role="alert">Email is required</p>}
              </div>

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
                {errors.logInPassword?.type === 'required' && <p role="alert">Password is required</p>}
              </div>

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
                {errors.Username?.type === 'required' && <p role="alert">username is required</p>}
              </div>

              <div className="relative flex items-center mt-6">
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
                {errors.email?.type === 'required' && <p role="alert">email is required</p>}
              </div>

              <div className="relative flex items-center mt-4">
                <span className="absolute">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  {...register("password", { required: true })}
                  type="password"
                  className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-stone-700 focus:ring-stone-800 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Password"
                />
                {errors.password?.type === 'required' && <p role="alert">password is required</p>}
              </div>

              <div className="relative flex items-center mt-4">
                <span className="absolute">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  {...register("confirmPassword", { required: true })}
                  type="password"
                  className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-stone-700 focus:ring-stone-800 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Confirm Password"
                />
                {errors.confirmPassword?.type === 'required' && <p role="alert">password is not matching</p>}
              </div>

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
        </div>
      </section>
    </div>
  );
};

export default SignIn;
