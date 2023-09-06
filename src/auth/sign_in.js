import { Input } from "antd";
import React, { useState } from 'react';
import { useAuth } from "./auth_contaxt";
import GalliButton from "../component/button";
import { useNavigate } from "react-router-dom";


const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signIn } = useAuth();
    const [loading, setLoading] = useState(false)

    const handleSignIn = async () => {
        setLoading(true);
        try {
            await signIn(email, password);
            navigate('/');
        } catch (error) {
            //   setError(error);
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen items-center justify-center w-full">
            <img
                className="h-12 mb-10"
                src="./assets/logo.png"
                alt="" />
            <div className=" bg-white p-12 rounded-lg w-1/2 mx-auto flex flex-col gap-3">
                <div>
                    <h3 className="text-[24px] font-medium mb-1">Provider SignIn</h3>
                    <h3 className="text-[16px] text-gray-500 mb-4">Please login to continue</h3>
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
                <div>Don't have an account? <span className="text-green-500 font-semibold cursor-pointer" onClick={() => { navigate('/signup') }}>Sign Up</span> </div>
                <GalliButton
                    isButtonValid={true}
                    handleOnClick={handleSignIn}
                    loading={loading}
                    buttonLoadingText={"Logging In"}
                    buttonText={"Login"}
                    className={""} />

            </div>
        </div>
    );
}

export default SignIn;
