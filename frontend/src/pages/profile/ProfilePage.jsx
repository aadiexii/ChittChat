import useGetUserProfileData from "../../hooks/useGetUserProfileData";

const ProfilePage = () => {
    const { profileData, loading } = useGetUserProfileData();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[450px] md:h-[550px] w-2/6 rounded-lg bg-gray-300 dark:bg-gray-900/60">
                <span className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Loading...</span>
            </div>
        );
    }

    console.log(profileData);

    return (
        <div className="flex sm:h-[450px] md:h-[550px] w-2/6 rounded-lg overflow-hidden bg-gray-300 dark:bg-gray-900/60 backdrop-filter backdrop-blur-md bg-opacity-40 justify-center items-center shadow-lg">
            {profileData ? (
                <div className="flex flex-col items-center space-y-8 px-8 py-10">
                    {/* Profile Pic */}
                    <div>
                        <img
                            src={profileData.avatar}
                            alt={profileData.username}
                            className="rounded-full w-52 h-52 border-4 border-white dark:border-gray-700 shadow-lg"
                        />
                    </div>
                    <div className="text-center">
                        <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">@{profileData.username}</h2>
                        <div className=" text-xl text-gray-700 dark:text-gray-300">
                            <div className="flex justify-center space-x-4">
                                <span className="font-bold">Email:</span>
                                <p>{profileData.email}</p>
                            </div>
                            <div className="flex justify-center space-x-4">
                                <span className="font-bold">Name:</span>
                                <p>{profileData.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-gray-700 dark:text-gray-300 font-semibold text-2xl">No profile data available.</div>
            )}
        </div>
    );
};

export default ProfilePage;
