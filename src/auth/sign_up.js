import { Input } from "antd";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth_contaxt";
import GalliButton from "../component/button";

const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signUp } = useAuth();
    const [loading, setLoading] = useState(false)

    const handleSignUp = async () => {
        setLoading(true)
        await signUp(email, password);
        navigate('/');
        setLoading(false)
    };

    return (
        <div className="flex flex-col h-screen items-center justify-center w-full">
            <img
                className="h-12 mb-10"
                src="./assets/logo.png"
                alt="" />
            <div className=" bg-white p-12 rounded-lg w-1/2 mx-auto flex flex-col gap-3">
                <div>
                    <h3 className="text-[24px] font-medium mb-1">Provider Signup</h3>
                    <h3 className="text-[16px] text-gray-500 mb-4">Please create an account to continue</h3>
                </div>
                <Input
                    className="w-full h-[48px] hover:border-green-500 active:border-green-600"
                    placeholder="Email"
                    value={email}
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    className="w-full h-[48px] hover:border-green-500 active:border-green-600"
                    placeholder="Password"
                    value={password}
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div>Already have an account? <span className="text-green-500 font-semibold cursor-pointer" onClick={() => { navigate('/signin') }}>Sign In</span> </div>
                <GalliButton
                    isButtonValid={true}
                    handleOnClick={handleSignUp}
                    loading={loading}
                    buttonLoadingText={"Submitting"}
                    buttonText={"Register"}
                    className={""} />

            </div>
        </div>
    );
}

export default SignUp;
