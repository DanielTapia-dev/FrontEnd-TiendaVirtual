import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from '../components/Header';
import { useRouter } from "next/router";
import { getMeApi } from "../api/users"
import router from 'next/router';
import {
    useQuery,
    useMutation,
    useQueryClient
} from 'react-query';
import useAuth from "../hooks/userAuth";
import Swal from 'sweetalert2';
import Router from 'next/router';
import { getToken } from '../api/token';
import { addCompra } from "../api/comprar";

// Create a client
const queryClient = new QueryClient()

export default function Carrito() {

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
    }

    return (
        <div>
            <Header />
            <div className="flex flex-row justify-center">
                <QueryClientProvider client={queryClient}>
                    <Todos value={usuario} />
                </QueryClientProvider>
            </div>
            <div className="flex flex-row justify-center">

            </div>
        </div>
    )
}

function Todos(usuario: any) {
    // cargando query mediante ReactQuery
    //const { data, error, isLoading } = useQuery('productos', fetcher);


    // Access the client
    const queryClient = useQueryClient();

    // Mutations
    const mutation = useMutation(addCompra, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('todos')
        },
    })

    const token: any = getToken()

    const { isLoading, error, data, isFetching } = useQuery("repoData", () =>
        fetch(
            `${process.env.KEY}/api/carritos/${usuario.value.dbUser._id}`, {
            method: 'GET',
            headers: {
                token: token,
            }
        }
        ).then((res) => res.json())
    );

    if (isLoading) return <div><h1>Cargando...</h1></div>;
    /* if (data.ok == false) {
        return <div><h1>Servidor fuera de servicio</h1></div>;
    }; */


    return (
        <div>
            <table className="rounded-t-lg m-5 w-2 mx-auto text-gray-100 bg-gradient-to-l from-indigo-500 to-indigo-800">
                <tr className="text-left border-b-2 border-indigo-300 font-bold">
                    <th className="px-4 py-3 ">Producto</th>
                    <th className="px-4 py-3">Cantidad</th>
                    <th className="px-4 py-3">Total</th>
                    <th className="px-4 py-3">Accion</th>
                </tr>
                {data?.carritos?.map((data: any) => (
                    <tr className="border-indigo-400 font-semibold" key={data._id}>
                        <td className="px-4 py-3 border-b border-indigo-300">{data.producto.nombre}</td>
                        <td className="px-4 py-3 border-b border-indigo-300">{data.cantidad}</td>
                        <td className="px-4 py-3 border-b border-indigo-300">{data.producto.precioUnitario * data.cantidad}</td>
                        <td className="px-4 py-3 border-b border-indigo-300">
                            <div className="p-2 w-30">
                                <div onClick={() => eliminarProducto(data)} className="flex items-center p-4 bg-red-200 rounded-lg shadow-xs cursor-pointer hover:bg-red-500 hover:text-gray-100">
                                    <p className=" text-xs font-bold ml-2 text-gray-700">
                                        ELIMINAR
                                    </p>
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}
            </table>
            <button onClick={() => { mutation.mutate({ usuario: usuario.value.dbUser._id }) }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Comprar
            </button>
        </div>

    )
}

function eliminarProducto(data: any) {
    console.log("Este es el producto " + data._id);
}
