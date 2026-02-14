import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Dashboard(){
    const [username,setusername] = useState([]);
    const [filter,setfilter] = useState("");
    const [balance,setbalance] = useState(0);
    useEffect(() => {
        const fetchBalance = async () => {
            const res = await axios.get(`http://localhost:5000/api/v1/account/balance`,
                {
                    headers:{
                        Authorization : `Bearer ${localStorage.getItem("token")}`,
                    }   
                }   
            )
            setbalance(res.data.balance);
        }
        fetchBalance(); 
    },[])        

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`http://localhost:5000/api/v1/user/bulk?filter=${filter}`);
            setusername(res.data.users);
        }    

        fetchData();
    },[filter]);

    return (
        <div className="bg-white h-screen">
            {/* AppBar / Navbar */}
            <div className="shadow h-14 flex justify-between items-center px-10">
                <div className="font-bold text-xl">
                    Payments App
                </div>
                <div className="flex items-center">
                    <div className="mr-4 font-medium">
                        Hello, User
                    </div>
                    <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center items-center text-xl">
                        U
                    </div>
                </div>
            </div>

            <div className="m-8 px-10">
                {/* Balance Section */}
                <div className="flex items-center text-lg">
                    <div className="font-bold">
                        Your Balance
                    </div>
                    <div className="font-semibold ml-4">
                        ₹{balance}
                    </div>
                </div>

                {/* Users Section */}
                <div className="font-bold mt-6 text-lg">
                    Users
                </div>
                <div className="my-2">
                    <input 
                        onChange={e => {setfilter(e.target.value)}}
                        type="text" 
                        placeholder="Search users..." 
                        className="w-full px-2 py-1 border rounded border-slate-200"
                    />
                </div>

                {/* User List */}
                <div className="mt-4">
                     {username.map((user) => (  
                        <UserRow 
                          key={user._id}
                          user={user}
                        />
                     ))}   
                    
                </div>
            </div>
        </div>
    );
};

function UserRow({ user }) {
    
    const navigate = useNavigate();
    function HandleClick()
    {
        navigate('/send', {
            state :{
                user,
            }
        });        
    }

    return (
        <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
                <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center items-center mr-2">
                    <div className="text-sm">
                        {user.firstName[0]}
                    </div>
                </div>
                <div className="font-bold">
                    {user.username}
                </div>
            </div>

            <div>
                <button onClick={HandleClick} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2">
                    Send Money
                </button>
            </div>
        </div>
    );
}