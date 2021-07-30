import React from 'react';
import Link from "next/link";

export default function TopBar() {
    return (
        <div className="bg-gray-800">
            <div className="flex flex-row items-center justify-between mx-2 md:mx-20">
                <Logo />
                <Buscador />
            </div>

        </div>
    )
}

function Logo() {
    return (
        <Link href="/">
            <img className="w-20 md:w-40 cursor-pointer" src="/logo.png" alt="" />
        </Link>
    )
}

function Buscador() {
    return (
        <div className="flex flex-row items-center shadow-sm bg-white rounded-md">
            <input className="ml-2 w-20 md:w-40 lg:w-60 outline-none text-black" type="text" />
            <span className="text-black symbol mr-2 cursor-pointer">L</span>
        </div>
    )
}