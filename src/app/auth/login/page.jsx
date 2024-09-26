"use client";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await signIn("credentials", { email, password, redirect: false });
        setLoading(false);
        if (res?.error) {
            alert("Invalid credentials");
        } else {
            alert("Login successful!");
            router.push("/profile");
        }
    };

    return (
        <div className="flex min-h-screen flex-col mt-20 px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center text-2xl font-bold tracking-tight text-[#243460]">
                    Log in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-4" action="#" onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 pl-4 text-[#243460]">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                placeholder="Enter your email"
                                className="block w-full rounded-xl border-0 pl-2 py-1.5 text-[#243460] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 pl-4 text-[#243460]">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                value={password}
                                type="password"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="*****"
                                className="block w-full rounded-xl border-0 pl-2 py-1.5 text-[#243460] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <Button
                            type="submit"
                            className="flex w-full mt-10 justify-center rounded-xl bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </Button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not having an account?
                    <a href="/auth/register" className="font-semibold leading-6 pl-4 text-indigo-600 hover:text-indigo-500">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
