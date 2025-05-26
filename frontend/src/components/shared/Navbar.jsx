import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Menu, X } from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {  
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const isActive = (path) => {
        return location.pathname === path ? 'text-[#6A38C2] font-semibold' : 'text-gray-700 hover:text-[#6A38C2]';
    }

    return (
        <nav className='sticky top-0 z-50 bg-white shadow-sm'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>
                    {/* Logo */}
                    <div className='flex-shrink-0'>
                        <Link to="/" className='flex items-center gap-2'>
                            <h1 className='text-xl sm:text-2xl font-bold'>
                                Job<span className='text-[#F83002]'>Quest</span>
                            </h1>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className='hidden md:flex items-center gap-8'>
                        <ul className='flex font-medium items-center gap-6'>
                            {user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link className={isActive("/admin/companies")} to="/admin/companies">Companies</Link></li>
                                    <li><Link className={isActive("/admin/jobs")} to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link className={isActive("/")} to="/">Home</Link></li>
                                    <li><Link className={isActive("/jobs")} to="/jobs">Jobs</Link></li>
                                    <li><Link className={isActive("/browse")} to="/browse">Browse</Link></li>
                                </>
                            )}
                        </ul>

                        {!user ? (
                            <div className='flex items-center gap-3'>
                                <Link to="/login">
                                    <Button variant="outline" className="hover:bg-gray-100">Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white">Signup</Button>
                                </Link>
                            </div>
                        ) : (
                            <UserMenu user={user} logoutHandler={logoutHandler} />
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className='md:hidden'>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className='inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#6A38C2] hover:bg-gray-100'
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className='md:hidden'>
                    <div className='px-2 pt-2 pb-3 space-y-1'>
                        {user && user.role === 'recruiter' ? (
                            <>
                                <Link to="/admin/companies" className='block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100'>Companies</Link>
                                <Link to="/admin/jobs" className='block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100'>Jobs</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/" className='block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100'>Home</Link>
                                <Link to="/jobs" className='block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100'>Jobs</Link>
                                <Link to="/browse" className='block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100'>Browse</Link>
                            </>
                        )}
                        {!user ? (
                            <div className='flex flex-col gap-2 p-3'>
                                <Link to="/login"><Button variant="outline" className="w-full">Login</Button></Link>
                                <Link to="/signup"><Button className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                            </div>
                        ) : (
                            <div className='p-3'>
                                <div className='flex items-center gap-3 mb-3'>
                                    <Avatar>
                                        <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                    </Avatar>
                                    <div>
                                        <p className='font-medium'>{user?.fullname}</p>
                                        <p className='text-sm text-gray-500'>{user?.profile?.bio}</p>
                                    </div>
                                </div>
                                {user.role === 'student' && (
                                    <Link to="/profile" className='flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md'>
                                        <User2 size={20} />
                                        <span>View Profile</span>
                                    </Link>
                                )}
                                <button
                                    onClick={logoutHandler}
                                    className='flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md text-red-600 w-full'
                                >
                                    <LogOut size={20} />
                                    <span>Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}

// User Menu Component
const UserMenu = ({ user, logoutHandler }) => (
    <Popover>
        <PopoverTrigger asChild>
            <Avatar className="cursor-pointer hover:ring-2 hover:ring-[#6A38C2] hover:ring-offset-2 transition-all">
                <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
            </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-80">
            <div className='space-y-4'>
                <div className='flex gap-3'>
                    <Avatar>
                        <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                    </Avatar>
                    <div>
                        <h4 className='font-medium'>{user?.fullname}</h4>
                        <p className='text-sm text-gray-500'>{user?.profile?.bio}</p>
                    </div>
                </div>
                <div className='space-y-2'>
                    {user.role === 'student' && (
                        <Link to="/profile" className='flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md'>
                            <User2 size={20} />
                            <span>View Profile</span>
                        </Link>
                    )}
                    <button
                        onClick={logoutHandler}
                        className='flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md text-red-600 w-full'
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </PopoverContent>
    </Popover>
);

export default Navbar