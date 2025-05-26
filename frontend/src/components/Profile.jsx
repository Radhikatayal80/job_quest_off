import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Profile Card */}
                <div className="bg-white shadow-sm rounded-2xl overflow-hidden">
                    {/* Cover Photo */}
                    <div className="h-32 bg-gradient-to-r from-[#6A38C2] to-[#9461FF]" />
                    
                    {/* Profile Info */}
                    <div className="px-8 pb-8">
                        <div className="flex justify-between -mt-16">
                            <Avatar className="h-32 w-32 ring-4 ring-white shadow-lg">
                                <AvatarImage 
                                    src={user?.profile?.profilePhoto || "https://ui-avatars.com/api/?name=" + user?.fullname} 
                                    alt="profile" 
                                />
                            </Avatar>
                            <Button 
                                onClick={() => setOpen(true)} 
                                className="mt-20 bg-white hover:bg-gray-50" 
                                variant="outline"
                            >
                                <Pen className="w-4 h-4 mr-2" />
                                Edit Profile
                            </Button>
                        </div>

                        <div className="mt-4">
                            <h1 className="text-2xl font-bold text-gray-900">{user?.fullname}</h1>
                            <p className="text-gray-600 mt-1">{user?.profile?.bio || "No bio added yet"}</p>
                        </div>

                        {/* Contact Info */}
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 text-gray-600">
                                <div className="p-2 bg-purple-50 rounded-lg">
                                    <Mail className="w-5 h-5 text-purple-600" />
                                </div>
                                <span>{user?.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <Contact className="w-5 h-5 text-blue-600" />
                                </div>
                                <span>{user?.phoneNumber || "No phone number added"}</span>
                            </div>
                        </div>

                        {/* Skills Section */}
                        <div className="mt-8">
                            <h2 className="text-lg font-semibold text-gray-900 mb-3">Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {user?.profile?.skills?.length > 0 ? (
                                    user.profile.skills.map((skill, index) => (
                                        <Badge 
                                            key={index}
                                            className="bg-purple-100 text-purple-800 hover:bg-purple-200"
                                        >
                                            {skill}
                                        </Badge>
                                    ))
                                ) : (
                                    <span className="text-gray-500">No skills added yet</span>
                                )}
                            </div>
                        </div>

                        {/* Resume Section */}
                        <div className="mt-8">
                            <h2 className="text-lg font-semibold text-gray-900 mb-3">Resume</h2>
                            {user?.profile?.resume ? (
                                <a 
                                    target="_blank"
                                    href={user.profile.resume}
                                    className="inline-flex items-center px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    {user.profile.resumeOriginalName || "View Resume"}
                                </a>
                            ) : (
                                <span className="text-gray-500">No resume uploaded</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Applied Jobs Section */}
                <div className="mt-8 bg-white shadow-sm rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Applied Jobs</h2>
                    <AppliedJobTable />
                </div>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile