"use client";
import React from 'react';

const Profileclient = ({ data }) => {
    const openResumeInNewWindow = (url) => {
        window.open(url, '_blank');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-sm w-full">
                <div className="bg-green-500 text-white text-center py-4">
                    <h1 className="text-xl font-bold">{data.fullName}</h1>
                </div>
                <div className="p-6">
                    <p className="text-gray-700 mb-2"><span className="font-semibold">Email:</span> {data.email}</p>
                    <p className="text-gray-700 mb-2"><span className="font-semibold">Phone:</span> {data.phone}</p>
                    <p className="text-gray-700"><span className="font-semibold">Location:</span> {data.location}</p>
                    <div className="button-container flex flex-col space-y-2 mt-4">
                        <button
                            className="view-button bg-blue-500 text-white rounded px-4 py-2"
                            onClick={() => openResumeInNewWindow(data.resume)}
                        >
                            View Resume
                        </button>
                        {/* <a
                            href={data.resume}
                            download={`${data.fullName}_Resume.pdf`}
                            className="bg-gray-300 text-black rounded px-4 py-2 text-center inline-block"
                        >
                            Download Resume
                        </a> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profileclient;
