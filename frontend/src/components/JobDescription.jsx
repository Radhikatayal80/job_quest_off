import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import { Building2, MapPin, Calendar, Users, Briefcase, DollarSign, Clock } from 'lucide-react';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';

const JobDescription = () => {
    const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store=>store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            
            if(res.data.success){
                setIsApplied(true); // Update the local state
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob(); 
    },[jobId,dispatch, user?._id]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    {/* Header Section */}
                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6'>
                        <div>
                            <h1 className='font-bold text-2xl md:text-3xl text-gray-900 mb-3'>{singleJob?.title}</h1>
                            <div className='flex flex-wrap items-center gap-2'>
                                <Badge className='bg-blue-100 text-blue-700 hover:bg-blue-200'>{singleJob?.postion} Positions</Badge>
                                <Badge className='bg-orange-100 text-orange-700 hover:bg-orange-200'>{singleJob?.jobType}</Badge>
                                <Badge className='bg-purple-100 text-purple-700 hover:bg-purple-200'>{singleJob?.salary} LPA</Badge>
                            </div>
                        </div>
                        <Button
                            onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied}
                            className={`w-full md:w-auto px-6 py-2.5 rounded-lg ${
                                isApplied 
                                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                                    : 'bg-[#7209b7] hover:bg-[#5f32ad] text-white'
                            }`}>
                            {isApplied ? 'Already Applied' : 'Apply Now'}
                        </Button>
                    </div>

                    {/* Job Details Section */}
                    <div className="space-y-6">
                        <div>
                            <h2 className='text-lg font-semibold text-gray-900 pb-3 border-b'>Job Description</h2>
                            <p className="mt-4 text-gray-700 leading-relaxed">
                                {singleJob?.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <MapPin className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Location</p>
                                    <p className="font-medium">{singleJob?.location}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Briefcase className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Experience</p>
                                    <p className="font-medium">{singleJob?.experience} years</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <DollarSign className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Salary</p>
                                    <p className="font-medium">{singleJob?.salary} LPA</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-100 rounded-lg">
                                    <Users className="w-5 h-5 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Total Applicants</p>
                                    <p className="font-medium">{singleJob?.applications?.length}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-pink-100 rounded-lg">
                                    <Calendar className="w-5 h-5 text-pink-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Posted Date</p>
                                    <p className="font-medium">{new Date(singleJob?.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default JobDescription