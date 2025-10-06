import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { loading, login } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(username, password);
	};

	return (
		<>
			<h1 className='text-3xl font-semibold text-center text-gray-800 dark:text-gray-200'>
				Login
				<span className='text-blue-500'> ChitChat</span>
			</h1>

			<form onSubmit={handleSubmit} className='mt-6'>
				<div>
					<label className='label p-2'>
						<span className='text-base label-text text-gray-800 dark:text-gray-200'>Username</span>
					</label>
					<input
						type='text'
						placeholder='Enter username'
						className='w-full input input-bordered h-10 bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>

				<div>
					<label className='label mt-2'>
						<span className='text-base label-text text-gray-800 dark:text-gray-200'>Password</span>
					</label>
					<input
						type='password'
						placeholder='Enter Password'
						className='w-full input input-bordered h-10 bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<div className='flex justify-between items-center mt-4'>
					<Link
						to='/forgot-password'
						className='text-sm hover:underline hover:text-blue-600 text-gray-800 dark:text-gray-200'
					>
						Forgot Password?
					</Link>
					<Link to='/signup' className='text-sm hover:underline hover:text-blue-600 text-gray-800 dark:text-gray-200'>
						{"Don't"} have an account?
					</Link>
				</div>

				<div>
					<button className='btn btn-block btn-sm mt-4 bg-sky-500 text-white dark:bg-sky-600' disabled={loading}>
						{loading ? <span className='loading loading-spinner '></span> : "Login"}
					</button>
				</div>
			</form>
		</>
	);
};
export default Login;