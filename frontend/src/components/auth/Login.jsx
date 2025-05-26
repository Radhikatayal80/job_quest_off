import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading,user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }
    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className='flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8'>
                <form 
                    onSubmit={submitHandler} 
                    className='w-full max-w-md bg-white shadow-sm border border-gray-200 rounded-xl p-6 sm:p-8'
                >
                    <h1 className='font-bold text-2xl sm:text-3xl text-gray-900 mb-6'>Welcome Back</h1>
                    
                    <div className='space-y-4'>
                        {/* Email Field */}
                        <div>
                            <Label className="text-gray-700">Email Address</Label>
                            <Input
                                type="email"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                                placeholder="Enter your email"
                                className="mt-1 w-full"
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <Label className="text-gray-700">Password</Label>
                            <Input
                                type="password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                placeholder="Enter your password"
                                className="mt-1 w-full"
                            />
                        </div>

                        {/* Role Selection */}
                        <div>
                            <Label className="text-gray-700 block mb-2">Select Role</Label>
                            <RadioGroup className="flex flex-wrap items-center gap-4">
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        checked={input.role === 'student'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer"
                                    />
                                    <Label className="cursor-pointer">Student</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer"
                                    />
                                    <Label className="cursor-pointer">Recruiter</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button 
                        type="submit" 
                        className="w-full mt-6 bg-[#6A38C2] hover:bg-[#5b30a6] text-white py-2"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                <span>Please wait</span>
                            </div>
                        ) : (
                            'Login'
                        )}
                    </Button>

                    {/* Sign Up Link */}
                    <p className='text-sm text-center mt-6 text-gray-600'>
                        Don't have an account?{' '}
                        <Link to="/signup" className='text-[#6A38C2] hover:text-[#5b30a6] font-medium'>
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login