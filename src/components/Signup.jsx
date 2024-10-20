import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import authService from "../appwrite/auth"
import { Input, Button } from '../components'
import { useDispatch } from "react-redux"
import { login } from "../store/authSlice"
import { useForm } from "react-hook-form"

const Signup = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [error, setError] = useState('')
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setError('')
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const userData = await authService.currentUser()
                if (userData) {
                    dispatch(login(userData))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className="mx-auto w-[500px] max-w-2xl bg-gray-100 rounded-xl p-10 border border-black/10">
                <div className="mb-2 flex justify-center">
                    <span className='inline-block w-full max-w-[100px]'>
                        <h1>LOGO</h1>
                    </span>
                </div>
                <h2 className='text-center text-2xl from-bold leading-tight'>Sign up to your account</h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Already have an account?&nbsp;
                    <Link to='/login' className='font-medium text-primary transition-all duration-200 hover:underline'>
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(create)}>
                    <div className="space-y-5">
                        <Input
                            label='Full Name: '
                            type='text'
                            placeholder='Enter your full name...'
                            {...register('name', {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^[A-Za-z\s'-]+$/.test(value) ||
                                        'Please enter valid name'
                                }
                            })}
                        />
                        <Input
                            label='Email: '
                            type='email'
                            placeholder='Enter your email address...'
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w)*(\.\w{2,3})+$/.test(value) ||
                                        'Please give the valid email'
                                }
                            })}
                        />
                        <Input
                            label='Password: '
                            placeholder='Enter your password...'
                            type='text'
                            {...register('password', {
                                required: true,
                            })}
                        />
                        <Button type="submit" className="w-full">Create account</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup