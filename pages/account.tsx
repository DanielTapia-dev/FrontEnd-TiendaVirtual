import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import Header from '../components/Header';
import { useRouter } from "next/router";
import useAuth from "../hooks/userAuth";
import { getMeApi } from "../api/users"
import router from 'next/router';
import { getHistoriales } from "../api/historialCompra";

// Create a client
const queryClient = new QueryClient()

export default function Account() {

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
    let roleplay = "";
    if (usuario) {
        roleplay = usuario.role;
    }

    if (user === undefined) return null;
    if (!auth && !user) {
        router.replace("/");
        return null;
    }

    let token: any = auth;


    {/* <div className=" p-2 bg-gray-600 w-2/12 rounded-lg"><h1 className="text-xl text-red-600 ">Administración</h1><span className="symbol ml-2">F</span></div> */ }

    return (
        <div>
            <Header />
            <div className="mt-10 mx-4">
                {roleplay == "administrador" ? (<div className="align-middle w-full md:w-1/4 transition duration-300 transform hover:scale-105 cursor-pointer font-semibold p-2 text-sm md:text-base text-white bg-gray-600">
                    <div onClick={abrirPanel} className="flex flex-row justify-center">
                        <a>Panel de Administración</a>
                        <span className="symbol ml-2">F</span>
                    </div>

                </div>) : (<div></div>)}
            </div>
            <div className="flex flex-col md:flex-row w-full ">
                <div className="flex flex-col  mt-7 mx-4 md:w-1/2">
                    <div className="flex flex-row justify-between md:w-full mt-2">
                        <h1 className="w-2/5 text-lg text-gray-700 mr-3 p-1">Primer nombre:</h1>
                        <input className=" w-full text-lg text-gray-700 border-2 border-gray-600 rounded-lg p-1" type="text" defaultValue={usuario.dbUser.nombre_1} />
                    </div>
                    <div className="flex flex-row justify-between md:w-full mt-2">
                        <h1 className=" w-2/5 text-lg text-gray-700 mr-3 p-1">Segundo nombre:</h1>
                        <input className="w-full text-lg text-gray-700 border-2 border-gray-600 rounded-lg p-1" type="text" defaultValue={usuario.dbUser.nombre_2} />
                    </div>
                    <div className="flex flex-row justify-between md:w-full mt-2">
                        <h1 className="w-2/5 text-lg text-gray-700 mr-3 p-1">Primer apellido:</h1>
                        <input className="w-full text-lg text-gray-700 border-2 border-gray-600 rounded-lg p-1" type="text" defaultValue={usuario.dbUser.apellido_1} />
                    </div>
                    <div className="flex flex-row justify-between md:w-full mt-2">
                        <h1 className="w-2/5 text-lg text-gray-700 mr-3 p-1">Segundo apellido:</h1>
                        <input className="w-full text-lg text-gray-700 border-2 border-gray-600 rounded-lg p-1" type="text" defaultValue={usuario.dbUser.apellido_2} />
                    </div>
                    <div className="flex flex-row justify-between md:w-full mt-2">
                        <h1 className="w-2/5 text-lg text-gray-700 mr-3 p-1">Dirección:</h1>
                        <input className="w-full text-lg text-gray-700 border-2 border-gray-600 rounded-lg p-1" type="text" defaultValue={usuario.dbUser.direccion} />
                    </div>
                    <div className="flex flex-row justify-between md:w-full mt-2">
                        <h1 className="w-2/5 text-lg text-gray-700 mr-3 p-1">Password:</h1>
                        <input className="w-full text-lg text-gray-700 border-2 border-gray-600 rounded-lg p-1" type="text" />
                    </div>
                </div>
                <QueryClientProvider client={queryClient}>
                    <div className="border-2 border-black mx-2 mt-4 md:w-1/2 ">
                        <Todos />
                    </div>
                </QueryClientProvider>
            </div>
        </div>
    )



    function abrirPanel() {
        router.push("/administracion")
    }

    function Todos() {
        // cargando query mediante ReactQuery
        //const { data, error, isLoading } = useQuery('productos', fetcher);
        console.log(usuario.dbUser._id);
        const { isLoading, error, data, isFetching } = useQuery("repoData", () =>
            fetch(
                `https://app-node-nextjs.herokuapp.com/api/historiales/${usuario.dbUser._id}`, {
                method: 'GET',
                headers: {
                    token: token.token,
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
}


