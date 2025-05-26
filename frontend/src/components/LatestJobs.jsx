import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
   
    return (
        <section className="py-20 px-4 bg-gray-50">
            <div className='max-w-7xl mx-auto'>
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className='text-4xl md:text-5xl font-bold mb-4'>
                        <span className='text-[#6A38C2]'>Latest & Top </span> 
                        <span className="relative">
                            Job Openings
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-[#6A38C2]/20 rounded-full"></div>
                        </span>
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover the most recent job opportunities from top companies
                    </p>
                </div>

                {/* Jobs Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300 ease-in-out'>
                    {allJobs.length <= 0 ? (
                        <div className="col-span-full flex flex-col items-center justify-center p-10 bg-white rounded-lg shadow-sm">
                            <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                            <span className="text-xl text-gray-600">No Jobs Available</span>
                            <p className="text-gray-400 mt-2">Check back later for new opportunities</p>
                        </div>
                    ) : (
                        allJobs?.slice(0,6).map((job) => (
                            <div key={job._id} className="transform hover:-translate-y-1 transition-transform duration-300">
                                <LatestJobCards job={job}/>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    )
}

export default LatestJobs