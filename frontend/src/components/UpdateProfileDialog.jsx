import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2, Upload, X, User, Mail, Phone, FileText, Code } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { Textarea } from './ui/textarea'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const [fileName, setFileName] = useState(user?.profile?.resumeOriginalName || '');

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        file: user?.profile?.resume || ""
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            setInput({ ...input, file });
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!input.fullname || !input.email) {
            toast.error("Name and email are required!");
            return;
        }

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file instanceof File) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                setOpen(false);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[500px] overflow-y-auto h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Update Your Profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile information here. Click update when you're done.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={submitHandler} className="space-y-6">
                    <div className="space-y-4">
                        {/* Name Field */}
                        <div className="space-y-2">
                            <Label htmlFor="fullname" className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Full Name *
                            </Label>
                            <Input
                                id="fullname"
                                name="fullname"
                                placeholder="Enter your full name"
                                value={input.fullname}
                                onChange={changeEventHandler}
                                required
                            />
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                Email Address *
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={input.email}
                                onChange={changeEventHandler}
                                required
                            />
                        </div>

                        {/* Phone Number Field */}
                        <div className="space-y-2">
                            <Label htmlFor="phoneNumber" className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                Phone Number
                            </Label>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                placeholder="Enter your phone number"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                            />
                        </div>

                        {/* Bio Field */}
                        <div className="space-y-2">
                            <Label htmlFor="bio" className="flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Bio
                            </Label>
                            <Textarea
                                id="bio"
                                name="bio"
                                placeholder="Tell us about yourself"
                                value={input.bio}
                                onChange={changeEventHandler}
                                rows={3}
                            />
                        </div>

                        {/* Skills Field */}
                        <div className="space-y-2">
                            <Label htmlFor="skills" className="flex items-center gap-2">
                                <Code className="w-4 h-4" />
                                Skills
                            </Label>
                            <Input
                                id="skills"
                                name="skills"
                                placeholder="Enter skills (comma separated)"
                                value={input.skills}
                                onChange={changeEventHandler}
                            />
                            <p className="text-sm text-gray-500">Separate multiple skills with commas</p>
                        </div>

                        {/* Resume Upload */}
                        <div className="space-y-2">
                            <Label htmlFor="file" className="flex items-center gap-2">
                                <Upload className="w-4 h-4" />
                                Resume (PDF)
                            </Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept="application/pdf"
                                    onChange={fileChangeHandler}
                                    className="hidden"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => document.getElementById('file').click()}
                                    className="w-full"
                                >
                                    {fileName ? (
                                        <div className="flex items-center justify-between w-full">
                                            <span className="truncate">{fileName}</span>
                                            <X 
                                                className="w-4 h-4 text-gray-500 hover:text-red-500"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setFileName('');
                                                    setInput({...input, file: ''});
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <span>Choose PDF file</span>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="w-full sm:w-auto"
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            className="w-full sm:w-auto"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                'Update Profile'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfileDialog