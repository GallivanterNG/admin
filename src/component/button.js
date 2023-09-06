import React from 'react'

const GalliButton = ({ isButtonValid, handleOnClick, loading, buttonLoadingText, buttonText, className }) => {
    return (
        <div>
            <div
                className={`${isButtonValid
                    ? "bg-green-600 hover:bg-[#0f5c2e] text-white"
                    : "bg-gray-200 text-gray-500"
                    } ${className} text-[16px] text-center cursor-pointer capitalize  px-8 py-4 rounded-md w-fit`}
                onClick={isButtonValid ? handleOnClick : undefined}
            >
                {" "}
                {loading ? buttonLoadingText : buttonText}
            </div>
        </div>
    )
}

export default GalliButton
