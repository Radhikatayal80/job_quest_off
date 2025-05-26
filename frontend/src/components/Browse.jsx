import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import Footer from './shared/Footer';

const Browse = () => {
    useGetAllJobs();
    const {allJobs} = useSelector(store=>store.job);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[])

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-2'>
                        Job Listings
                        <span className="text-[#6A38C2] ml-2">({allJobs.length})</span>
                    </h1>
                    <p className="text-gray-600">Explore the latest job opportunities</p>
                </div>

                {/* Jobs Grid */}
                {allJobs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-10 bg-white rounded-lg shadow-sm">
                        <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <span className="text-xl text-gray-600">No Jobs Found</span>
                        <p className="text-gray-400 mt-2">Try adjusting your search criteria</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
                        {allJobs.map((job) => (
                            <div key={job._id} className="transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
                                <Job job={job}/>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer/>
        </div>
    )
}

export default Browse