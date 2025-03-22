import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import auth from '../appwrite/auth'
import { login as authlogin } from '../store/authstore'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const login = async (data) => {
      setError('')
      try {
        const session = await auth.login(data)
        if(session) {
          const userdata = await auth.getUser()
          if(userdata) dispatch(authlogin(userdata))
          navigate('/')
        } else {
          setError('Invalid credentials')
        }
      } catch (error) {
        setError(error.message)
        console.log(error)
      }
    }

  return (
    <section className="justify-center h-screen items-center flex  flex-col  bg-gradient-to-br from-blue-50 to-indigo-100">
 
  <div className="md:w-1/2 flex items-center justify-center p-6 md:p-6">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Log in</h2>
        <p className="text-gray-600 mt-2">Enter your credentials to access your account</p>
      </div>

      <form onSubmit={handleSubmit(login)} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
          <input
            id="email"
            type="email"
            placeholder="name@company.com"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
            {...register("email", {
              required: "Email is required",
              validate: {
                matchPattern: (value) => 
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Please enter a valid email address"
              }
            })}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          </div>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
            {...register("password", {
              required: "Password is required"
            })}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        {error && (
          <div className="px-4 py-3 bg-red-50 border-l-4 border-red-500 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
        >
          Sign in
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <Link 
            to='/signup'
            className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  </div>
</section>
  )
}

export default Login