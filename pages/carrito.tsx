import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from '../components/Header';
import { useRouter } from "next/router";
import { getMeApi } from "../api/users"
import router from 'next/router';
import {
    useQuery,
    useMutation,
    useQueryClient,
} from 'react-query';
import useAuth from "../hooks/userAuth";
import Swal from 'sweetalert2';
import Router from 'next/router';
import { getToken } from '../api/token';

// Create a client
const queryClient = new QueryClient()

export default function Carrito() {

    const [user, setUser] = useState(undefined);
    const { logout, auth } = useAuth();
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const response = await getMeApi(logout);
            setUser(response || null);
        })()
    }, [auth]);

    const usuario: any = user;

    if (user === undefined) return null;
    if (!auth && !user) {
        router.replace("/");
        return null;
    }

    return (
        <div>
            <Header />
            <QueryClientProvider client={queryClient}>
                <Todos value={usuario} />
            </QueryClientProvider>
        </div>
    )
}

function Todos(usuario: any) {
    // cargando query mediante ReactQuery
    //const { data, error, isLoading } = useQuery('productos', fetcher);
    console.log(usuario);

    const token: any = getToken()

    const { isLoading, error, data, isFetching } = useQuery("repoData", () =>
        fetch(
            `https://app-node-nextjs.herokuapp.com/api/historiales/${usuario.dbUser._id}`, {
            method: 'GET',
            headers: {
                token: token,
            }
        }
        ).then((res) => res.json())
    );

    if (isLoading) return <div><h1>Cargando...</h1></div>;
    if (data.ok == false) {
        return <div><h1>Servidor fuera de servicio</h1></div>;
    };

    return (
        <div>
            {data?.historiales?.map((data: any) => (
                <div className="mx-2 flex flex-row" key={data._id} >
                    <h1 className="text-blue-500">Compra: &nbsp;</h1>
                    <h1 >fecha {data.compra.fecha} &nbsp;</h1>
                    <h1 >total {data.compra.total}</h1>
                </div>


            ))}
        </div>
    )
}