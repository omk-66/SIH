import Profile from "@/components/profile/profile-page";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function ProfilePage() {
    const { getUser } = useKindeBrowserClient();
    const user = getUser();
    const data = {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        location: 'New York, USA',
        bio: 'Avid traveler and photographer.',
        profilePicture: '/images/profile.jpg', // Update with actual image path
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Profile user={data} />
        </div>
    );
}
