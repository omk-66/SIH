import Image from 'next/image';
import { useState } from 'react';
import { FaPen } from 'react-icons/fa';


const Profile = ({ user }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        location: user.location,
        bio: user.bio
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSave = () => {
        // Save logic goes here
        setIsEditing(false);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg dark:bg-card">
            <div className="flex items-center space-x-6">
                <div className="relative w-32 h-32">
                    <Image
                        src={user.profilePicture}
                        alt="Profile Picture"
                        layout="fill"
                        className="rounded-full object-cover"
                    />
                </div>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-violet-800 dark:text-violet-300">{formData.name}</h1>
                    <p className="text-gray-600 dark:text-gray-400">{formData.bio}</p>
                </div>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="p-2 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition"
                >
                    <FaPen />
                </button>
            </div>

            {isEditing && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-violet-800 dark:text-violet-300 mb-4">Edit Profile</h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-violet-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 dark:border-violet-600 dark:bg-violet-700 dark:text-white"
                            placeholder="Name"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-violet-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 dark:border-violet-600 dark:bg-violet-700 dark:text-white"
                            placeholder="Email"
                        />
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-violet-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 dark:border-violet-600 dark:bg-violet-700 dark:text-white"
                            placeholder="Location"
                        />
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-violet-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 dark:border-violet-600 dark:bg-violet-700 dark:text-white"
                            placeholder="Bio"
                        />
                        <button
                            onClick={handleSave}
                            className="w-full p-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
