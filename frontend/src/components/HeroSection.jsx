import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search, Briefcase, Building2, Users } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (e) => {
        e.preventDefault();
        if (query.trim()) {
            dispatch(setSearchedQuery(query));
            navigate("/browse");
        }
    }

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-purple-50 to-white py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className='text-center'>
                    {/* Badge */}
                    <div className="animate-fade-in-down">
                        <span className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-[#6A38C2] font-medium text-sm sm:text-base'>
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6A38C2] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#6A38C2]"></span>
                            </span>
                            No. 1 Job Hunt Website
                        </span>
                    </div>

                    {/* Hero Content */}
                    <div className='mt-8 flex flex-col gap-6'>
                        <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-tight'>
                            Search, Apply & <br className="hidden sm:block" />
                            Get Your <span className='text-[#6A38C2] relative'>
                                Dream Jobs
                                <svg className="absolute -bottom-2 left-0 w-full h-2 text-[#6A38C2] opacity-20" viewBox="0 0 100 10">
                                    <path fill="currentColor" d="M0 5 Q 25 0, 50 5 Q 75 10, 100 5" />
                                </svg>
                            </span>
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg sm:text-xl text-gray-600">
                            Find the perfect job that matches your skills and career goals. 
                            Thousands of opportunities await!
                        </p>

                        {/* Search Bar */}
                        <form onSubmit={searchJobHandler} className='flex flex-col sm:flex-row w-full max-w-2xl mx-auto gap-4'>
                            <div className='relative flex-1'>
                                <input
                                    type="text"
                                    placeholder='Search jobs by title or keyword'
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className='w-full px-6 py-4 rounded-full border border-gray-200 shadow-lg outline-none focus:ring-2 focus:ring-purple-500 transition-all'
                                />
                                <Search className='absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                            </div>
                            <Button 
                                type="submit"
                                className="px-8 py-4 rounded-full bg-[#6A38C2] hover:bg-[#5b30a6] text-white font-medium transition-all"
                            >
                                Search Jobs
                            </Button>
                        </form>

                        {/* Stats */}
                        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                            <StatsCard icon={<Briefcase />} number="10k+" label="Job Posts" />
                            <StatsCard icon={<Building2 />} number="2k+" label="Companies" />
                            <StatsCard icon={<Users />} number="50k+" label="Job Seekers" className="col-span-2 sm:col-span-1" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <svg
                    className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern
                            id="hero-pattern"
                            width={200}
                            height={200}
                            x="50%"
                            y={-1}
                            patternUnits="userSpaceOnUse"
                        >
                            <path d="M100 200V.5M.5 .5H200" fill="none" />
                        </pattern>
                    </defs>
                    <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                        <path
                            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                            strokeWidth={0}
                        />
                    </svg>
                    <rect width="100%" height="100%" strokeWidth={0} fill="url(#hero-pattern)" />
                </svg>
            </div>
        </section>
    )
}

// Stats Card Component
const StatsCard = ({ icon, number, label, className = "" }) => (
    <div className={`flex flex-col items-center p-4 rounded-2xl bg-white border border-gray-100 shadow-sm ${className}`}>
        <div className="p-2 rounded-full bg-purple-100 text-[#6A38C2]">
            {icon}
        </div>
        <p className="mt-2 text-2xl font-bold text-gray-900">{number}</p>
        <p className="text-sm text-gray-600">{label}</p>
    </div>
)

export default HeroSection