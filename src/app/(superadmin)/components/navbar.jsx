"use client"
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Settings, User, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const Header = ({ userData }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setLoading(true);
    await signOut();
    setLoading(false);
  };

  return (
    <nav className="fixed start-0 top-0 z-40 w-full mb-10">
      <header className="bg-[#243460] text-white p-4 flex justify-end">
        {/* User Icon with Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center justify-center text-[12px] font-sans font-semibold text-[#243460] w-8 h-8 bg-white border text-center border-[#243460] rounded-full focus:outline-none">
              {userData.name[0]}
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-56 mt-2 bg-white rounded-xl p-2"
          >
            <h1 className="text-[14px] font-bold text-gray-900 mb-1">
              HI {userData.name}
            </h1>
            <hr className="h-2" />

            {/* Uncommented Items */}
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                <User className="mr-2 text-blue-500" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                <Settings className="mr-2 text-blue-500" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <div className="flex justify-end items-center">
                <Button
                  className={`bg-red-500 hover:bg-red-600 rounded-full mt-4 text-white px-4 py-2 flex items-center ${
                    loading ? "bg-blue-300" : ""
                  }`}
                  onClick={handleSignOut}
                  disabled={loading}
                >
                  <LogOut className="mr-2" />
                  {loading ? "Logging out..." : "Logout"}
                </Button>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    </nav>
  );
};

export default Header;
