import { useNavigate } from "react-router-dom";
import useGetUserProfileData from "../../hooks/useGetUserProfileData";

const ProfileButton = () => {
    const { profileData, loading } = useGetUserProfileData();
    const navigate = useNavigate();

    console.log("Profile Data:", profileData);

    if (loading) {
        return <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" disabled>Loading...</button>;
    }

    return (
        <button
            className="text-white px-4 py-2 rounded transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.8)]"
            onClick={() => navigate("/profile")}
        >
            <img src={profileData?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData?.name || profileData?.username)}&background=0D8ABC&color=fff&rounded=true&size=200`} alt="user profile pic" className="w-20 h-20 rounded-full transition-all duration-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.9)] hover:scale-110"
                onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.name || profileData.username)}&background=0D8ABC&color=fff&rounded=true&size=200`;
                }}
            />
        </button>
    );
}

export default ProfileButton;