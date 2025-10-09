import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

const SignUp = () => {
	const [inputs, setInputs] = useState({
		fullName: "",
		email: "",
		username: "",
		gender: "",
	});
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword1, setShowPassword1] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)
	const { loading, signup } = useSignup();

	const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(inputs);
	};

	return (
		<>
			<h1 className='text-3xl font-semibold text-center text-gray-800 dark:text-gray-200'>
				Sign Up <span className='text-blue-500'> ChitChat</span>
			</h1>

			<form onSubmit={handleSubmit} className='mt-6'>
				<div>
					<label className='label p-2'>
						<span className='text-base label-text text-gray-800 dark:text-gray-200'>Full Name</span>
					</label>
					<input
						type='text'
						placeholder='John Doe'
						className='w-full input input-bordered h-10 bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white'
						value={inputs.fullName}
						onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
					/>
				</div>

				<div>
					<label className='label p-2 '>
						<span className='text-base label-text text-gray-800 dark:text-gray-200'>Username</span>
					</label>
					<input
						type='text'
						placeholder='johndoe'
						className='w-full input input-bordered h-10 bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white'
						value={inputs.username}
						onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
					/>
				</div>

				<div>
					<label className='label p-2 '>
						<span className='text-base label-text text-gray-800 dark:text-gray-200'>Email</span>
					</label>
					<input
						type='email'
						placeholder='you@example.com'
						className='w-full input input-bordered h-10 bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white'
						value={inputs.email}
						onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
					/>
				</div>

				<div className="relative">
					<label className='label'>
						<span className='text-base label-text text-gray-800 dark:text-gray-200'>Password</span>
					</label>
					<input
						type={showPassword1? 'text':'password'}
						placeholder='Enter Password'
						className='w-full input input-bordered h-10 bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					{!showPassword1 && <IoEye className="absolute top-[51px] right-[15px] cursor-pointer w-[20px] h-[20px] text-gray-500" onClick={() => {setShowPassword1(true)}}/>}
					{showPassword1 && <IoEyeOff className="absolute top-[51px] right-[15px] cursor-pointer w-[20px] h-[20px]  text-gray-500" onClick={() => {setShowPassword1(false)}}/>}
				</div>

				<div className="relative">
					<label className='label'>
						<span className='text-base label-text text-gray-800 dark:text-gray-200'>Confirm Password</span>
					</label>
					<input
						type={showPassword2?'text': 'password'}
						placeholder='Confirm Password'
						className='w-full input input-bordered h-10 bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					{!showPassword2 && <IoEye className="absolute top-[51px] right-[15px] cursor-pointer w-[20px] h-[20px] text-gray-500" onClick={() => {setShowPassword2(true)}}/>}
					{showPassword2 && <IoEyeOff className="absolute top-[51px] right-[15px] cursor-pointer w-[20px] h-[20px]  text-gray-500" onClick={() => {setShowPassword2(false)}}/>}
				</div>

				<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

				<Link
					to={"/login"}
					className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-gray-800 dark:text-gray-200'
				>
					Already have an account?
				</Link>

				<div>
					<button className='btn btn-block btn-sm mt-2 border border-slate-700 bg-sky-500 text-white dark:bg-sky-600' disabled={loading}>
						{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
					</button>
				</div>
			</form>
		</>
	);
};
export default SignUp;