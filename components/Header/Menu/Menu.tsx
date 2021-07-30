import React, { useState, useEffect } from "react";
import Link from "next/link";
import useAuth from "../../../hooks/userAuth";
import { getMeApi } from "../../../api/users";
import { deleteToken } from "../../../api/token";
import { useRouter } from "next/router";

export default function Menu() {
    return (
        <div className="Menu">
            <MenuOptions />
        </div>
    )
}

function MenuOptions() {

    let [user, setUser] = useState(undefined)

    let { logout, auth } = useAuth();

    const router = useRouter();

    useEffect(() => {
        (async () => {
            const response = await getMeApi(logout);
            setUser(response);
        })()
    }, [])

    return (
        <div className="flex flex-row justify-between">
            <nav className="ml-2 hidden md:flex my-1">
                <ul className="flex flex-row justify-start">
                    <Link href="/"><li className="item-header">
                        <a>INICIO</a>
                    </li></Link>
                    {user ? (
                        <Link href="/carrito"><li className="item-header">
                            <a>CARRITO</a>
                        </li></Link>
                    ) : (<div></div>)}
                </ul>
            </nav>
            <span className="md:hidden text-gray-700 text-lg font-bold ml-2">&equiv;</span>
            <nav className="ml-2">


                {auth ? (<ul className="flex flex-row justify-start items-center my-1"><Link href="/account">
                    <li className="item-header">
                        <span className="symbol mr-1">U</span>
                        <a>Mi cuenta</a>
                    </li>
                </Link><li onClick={logout2} className="item-header">
                        <span className="symbol mr-1">X</span>
                        <button>Cerrar sesion</button>
                    </li></ul>) : (
                    <ul className="flex flex-row justify-start items-center my-1">

                        <Link href="/login">
                            <li className="item-header">
                                <span className="symbol mr-1">U</span>
                                <a>Iniciar sesion</a>
                            </li>
                        </Link>

                    </ul>)}


            </nav>
        </div>
    );

    function logout2() {
        setUser(undefined);
        deleteToken();
        window.location.reload();
    }
}
