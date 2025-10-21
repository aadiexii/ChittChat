import { Navigate } from "react-router-dom";
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import { useAuthContext } from "../../context/AuthContext";
import "../home/Home.css"
// import ProfileButton from "../../components/profile/ProfileButton";

const Home = () => {
    // redirecting to landing page if user is not logged in
    const { authUser } = useAuthContext();
    console.log(authUser)
    if(!authUser){
        return <Navigate to='/' />
    }
    return (
        <div className='flex flex-col h-screen justify-center items-center'>
            <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 dark:bg-gray-900/50'>
                <Sidebar />
                <MessageContainer />
            </div>
        </div>
    );
};
export default Home;