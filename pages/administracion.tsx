import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from '../components/Header';
import { useRouter } from "next/router";
import useAuth from "../hooks/userAuth";
import { getMeApi } from "../api/users"
import router from 'next/router';

// Create a client
const queryClient = new QueryClient()

export default function Administracion() {

    const [user, setUser] = useState(undefined);
    const { logout, auth } = useAuth();
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const response = await getMeApi();
            setUser(response || null);
        })()
    }, [auth]);

    const usuario: any = user;
    if (user === undefined) return null;

    if (!auth && !user) {
        router.replace("/");
        return null;
    } else if (usuario.dbUser.role != "administrador") {
        router.replace("/");
        return null;
    }

    return (
        <div>
            <Header />
            <h1>Este es el panel de administracion, cuenta con un acceso seguro para administradores</h1>
            <QueryClientProvider client={queryClient}>

            </QueryClientProvider>
        </div>
    )
}