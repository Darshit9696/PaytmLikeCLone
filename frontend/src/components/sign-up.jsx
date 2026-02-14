import React,{ useState } from 'react';
import InputBox from './inputBox';
import  axios  from 'axios';

export default function SignUp(){
    const [firstName,setfirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [username,setUserName] = useState("");
    const [password,setPassword] = useState("");

    const handleSignup = async () => {
        
        try {
            const res = await axios.post("http://localhost:5000/api/v1/user/sign-up",
                {
                    firstName,
                    lastName,
                    username,
                    password
                }
            );

            console.log(res.data);
        }catch(err)
        {
            console.log("Sign up failed",err.response?.data || err.message);
        }

    }

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    {/* Header Section */}
                    <div className="font-bold text-4xl pt-6">
                        Sign Up
                    </div>
                    <div className="text-slate-500 text-md pt-1 px-4 pb-4">
                        Enter your information to create an account
                    </div>

                    {/* Input Fields */}
                    <div className="text-left">
                        <InputBox onChange={(e) => setfirstName(e.target.value)} label={"First Name"} placeholder={"John"} />
                        <InputBox onChange = {(e)=> setLastName(e.target.value)} label={"Last Name"} placeholder={"Doe"} />
                        <InputBox onChange = {(e)=> setUserName(e.target.value)} label={"Email"} placeholder={"johndoe@example.com"} />
                        <InputBox  onChange={(e) => setPassword(e.target.value)} label={"Password"} placeholder={"Password"} />
                    </div>

                    {/* Button */}
                    <div className="pt-4">
                        <button onClick={handleSignup} type="button" className=" w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                            Sign Up
                        </button>
                    </div>

                    {/* Bottom Link */}
                    <div className="py-2 text-sm flex justify-center">
                        <div>
                            Already have an account?
                        </div>
                        <a className="pointer underline pl-1 cursor-pointer" href="/signin">
                            Login
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
