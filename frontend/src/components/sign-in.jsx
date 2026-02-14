import React,{useState} from 'react';
import InputBox from './inputBox';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function SignIn(){
    const navigate = useNavigate();
    const [username,setUserName] = useState("");
    const [password,setPassword] = useState("");

    const handleSignIn = async () => {
        const res = await axios.post("http://localhost:5000/api/v1/user/sign-in",
            {
                username,
                password
            }
        )
        const success = res.data;
        if(success.token)
        {
            localStorage.setItem("token",success.token);
            navigate("/dashboard");
        }   
    }

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    {/* Header Section */}
                    <div className="font-bold text-4xl pt-6">
                        Sign In
                    </div>
                    <div className="text-slate-500 text-md pt-1 px-4 pb-4">
                        Enter your credentials to access your account
                    </div>

                    {/* Input Fields */}
                    <div className="text-left">
                        <InputBox onChange = {(e) => setUserName(e.target.value)}label={"Email"} placeholder={"johndoe@example.com"} />
                        <InputBox onChange = {(e) => setPassword(e.target.value)} label={"Password"} placeholder={""} />
                    </div>

                    {/* Button */}
                    <div className="pt-4">
                        <button onClick={handleSignIn} type="button" className=" w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                            Sign In
                        </button>
                    </div>

                    {/* Bottom Link */}
                    <div className="py-2 text-sm flex justify-center">
                        <div>
                            Dont have an account ?
                        </div>
                        <a className="pointer underline pl-1 cursor-pointer" href="/signin">
                            Sign-up
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
