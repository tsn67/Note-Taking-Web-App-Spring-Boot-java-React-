import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { LoadingRing } from "../components/LoadingRing";
import { MessagePopUp } from "../components/MessagePopUp";
import { useNavigate } from "react-router-dom";

export const LoginSignupForm = () => {
    const [choice, setChoice] = useState("login");

    const animation1 = {
        left: 0,
        top: 0,
    };

    return (
        <div className="w-scren h-screen grid place-content-center bg-background-primary">
            <div className="flex flex-col relative md:w-[350px] md:h-[400px] w-[300px] h-[350px]">
                <motion.div
                    layout
                    initial={{ y: 0, x: 0 }}
                    animate={choice == "login" ? animation1 : {}}
                    className="w-full h-full bg-linear-to-b from-blue-1 via-blue-2 to-blue-3 absolute top-[20px] left-[20px]  p-[3px] rounded-2xl"
                    style={{ zIndex: choice == "login" ? "50" : "0" }}
                >
                    <div className="w-full h-full bg-background-primary rounded-xl flex flex-col box-border gap-[30px] px-[10px] pt-[40px] justify-between">
                        <LoginForm stateChange={choice}></LoginForm>
                    </div>
                </motion.div>
                <motion.div
                    layout
                    initial={{ y: 0, x: 0 }}
                    animate={choice == "signup" ? animation1 : {}}
                    className="w-full h-full p-[3px] bg-linear-to-b from-yellow-1 via-yellow-2 to-yellow-3  absolute tnoAnimationop-[20px] left-[20px] top-[20px] rounded-2xl"
                >
                    <div className="w-full h-full bg-background-primary rounded-xl flex flex-col box-border gap-[30px] px-[10px] pt-[40px] justify-between">
                        <SignUpForm stateChange={choice} setState={setChoice}></SignUpForm>
                    </div>
                </motion.div>
            </div>
            <p
                style={{ color: choice == "signup" ? "#7DB0EA" : "#DBB550" }}
                onClick={() => {
                    setChoice((prev) => (prev == "login" ? "signup" : "login"));
                }}
                className="mt-[30px] hover:underline hover:select-none text-center text-yellow-3 font-medium text-lg"
            >
                {choice == `login`
                    ? `create account?`
                    : `already have an account?`}
            </p>
        </div>
    );
};

function LoginForm({ stateChange, setState }) {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        setUserName("");
        setPassword("");
        setError("");
    }, [stateChange]);

    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

    const handleLogin = async () => {
        try {
            if (username.length == 0 || password.length == 0) {
                if(username.length == 0) {
                    setError('username is empty!')
                    return;
                }
                if(password.length == 0) 
                    setError('password is empty!')
                return
            }
            const requestData = {
                username: username,
                password: password,
            };
            setLoading(true);
            const res = await axios.post(
                `${baseUrl}/user/login`,
                requestData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            localStorage.setItem("note-app-username", res.data.username);
            localStorage.setItem("note-app-userid", res.data.id);
            navigate('/main');
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error)
            } else {
                setError("something went wrong!")
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            {loading && <LoadingRing />}
            <div className="flex flex-col gap-[40px]">
                <div className="w-full flex flex-col gap-[10px]">
                    <p className="text-2xl text-gray-light-text">Username</p>
                    <input
                        value={username}
                        onChange={(e) => {setError('');setUserName(e.target.value)}}
                        type="text"
                        className=" focus:border-none text-white text-lg focus:outline-none h-[40px] px-[15px] py-[10px] rounded-md box-border w-full bg-gray-light"
                    ></input>
                </div>
                <div className="w-full flex flex-col gap-[10px] ">
                    <p className="text-2xl text-gray-light-text">Password</p>
                    <input
                        value={password}
                        onChange={(e) => {setError('');setPassword(e.target.value)}}
                        type="password"
                        className="bg-gray-light text-white text-lg focus:border-none focus:outline-none h-[40px] px-[15px] py-[10px] rounded-md box-border w-full"
                    ></input>
                    {error.length != 0 && <p className="text-red-500 text-md text-center">{error}</p>}
                </div>
            </div>

            <button onClick={handleLogin} className="w-full h-[40px] bg-blue-2 mb-[10px] rounded-md font-semibold text-2xl hover:bg-blue-1 active:mb-[15px]">
                Log In
            </button>
        </>
    );
}

function SignUpForm({ stateChange, setState }) {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setUserName("");
        setPassword("");
        setError("");
    }, [stateChange]);

    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

    const handleRegister = async () => {
        try {
            if (username.length == 0 || password.length == 0) {
                if(username.length == 0) {
                    setError('username is empty!')
                    return;
                }
                if(password.length == 0) 
                    setError('password is empty!')
                return
            }
            const requestData = {
                username: username,
                password: password,
            };
            setLoading(true);
            const res = await axios.post(
                `${baseUrl}/user/add-user`,
                requestData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(res.data);
            //set to login
            setSuccess(true);
            setState('login');
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error)
            } else {
                setError("something went wrong!")
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && (<LoadingRing/>)}
            {success && (<MessagePopUp message={"account created!"} setClose={setSuccess}/>)}
            <div className="flex flex-col gap-[40px]">
                <div className="w-full flex flex-col gap-[10px]">
                    <p className="text-2xl text-gray-light-text">Username</p>
                    <input
                        value={username}
                        onChange={(e) => {setError('');setUserName(e.target.value)}}
                        type="text"
                        className=" focus:border-none text-white text-lg focus:outline-none h-[40px] px-[15px] py-[10px] rounded-md box-border w-full bg-gray-light"
                    ></input>
                </div>
                <div className="w-full flex flex-col gap-[10px] ">
                    <p className="text-2xl text-gray-light-text">Password</p>
                    <input
                        value={password}
                        onChange={(e) => {setError('');setPassword(e.target.value)}}
                        type="password"
                        className="bg-gray-light text-white text-lg focus:border-none focus:outline-none h-[40px] px-[15px] py-[10px] rounded-md box-border w-full"
                    ></input>

                    {error.length != 0 && <p className="text-red-500 text-md text-center">{error}</p>}
                </div>
            </div>

            <button
                onClick={() => {
                    setLoading(true);
                    handleRegister();
                }}
                className="w-full h-[40px] bg-yellow-2 mb-[10px] rounded-md font-semibold text-2xl hover:bg-yellow-1 active:mb-[15px]"
            >
                Sign Up
            </button>
        </>
    );
}
