import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
// import ProfileButton from "../../components/profile/ProfileButton";

const Home = () => {
    return (
        <div className='flex flex-col'>
            {/* <div className='flex items-center justify-between p-4'>
                <h1 className='text-2xl font-bold text-gray-800 dark:text-gray-200'>ChittChat</h1>
                <ProfileButton />
            </div> */}
            <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 dark:bg-gray-900/50'>
                <Sidebar />
                <MessageContainer />
            </div>
        </div>
    );
};
export default Home;