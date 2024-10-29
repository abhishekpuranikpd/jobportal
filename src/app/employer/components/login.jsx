"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Set loading state to true

        try {
            const res = await fetch("/api/employer/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                throw new Error("Failed to login");
            }

            const data = await res.json();
            alert("Login Success");
            router.push("/employer/profile");
        } catch (error) {
            alert("Something Went Wrong");
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="sm:w-full sm:max-w-sm bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-center text-2xl font-bold tracking-tight text-[#243460] mb-4">
                    Log in to your Employer account
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[#243460] mb-1">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            placeholder="Enter your email"
                            className="block w-full rounded-md border border-gray-300 pl-2 py-2 text-[#243460] shadow-sm focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-[#243460] mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            value={password}
                            type="password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="*****"
                            className="block w-full rounded-md border border-gray-300 pl-2 py-2 text-[#243460] shadow-sm focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <Button
                            type="submit"
                            className="flex w-full mt-6 justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            disabled={isLoading} // Disable button during loading
                        >
                            {isLoading ? "Logging in..." : "Sign in"} {/* Loading state text */}
                        </Button>
                    </div>
                </form>

                <p className="mt-4 text-center text-sm text-gray-500">
                    Not having an account?
                    <a
                        href="/auth/register"
                        className="font-semibold leading-6 pl-2 text-indigo-600 hover:text-indigo-500"
                    >
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
