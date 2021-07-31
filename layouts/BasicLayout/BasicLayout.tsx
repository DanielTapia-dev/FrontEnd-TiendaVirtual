import React, { useEffect, useState } from 'react';
import Header from "../../components/Header";
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from 'react-query';
import { getActiveProducts } from '../../api/productos';
import { addCarrito } from '../../api/addCarrito';
import Swal from 'sweetalert2';
import Router, { useRouter } from 'next/router';
import useAuth from "../../hooks/userAuth";
import { getMeApi } from '../../api/users';
import { getToken } from '../../api/token';

// Create a client
const queryClient = new QueryClient()

export default function BasicLayout(props: any) {

    const [user, setUser] = useState(undefined);
    const { logout, auth } = useAuth();


    useEffect(() => {
        (async () => {
            const response = await getMeApi();
            setUser(response || null);
        })()
    }, [auth]);

    const usuario: any = user;


    if (user === undefined) return null;
    /* if (!auth && !user) {
        router.replace("/");
        return null;
    } */

    let token: any = auth;

    const { children } = props;
    return (
        <div>
            <Header />
            <QueryClientProvider client={queryClient}>
                <div className="bg-gray-200 h-full">
                    <br />
                    <Todos value={usuario} />
                </div>
            </QueryClientProvider>
        </div>
    )
}


/*  */

function Todos(usuario: any) {
    //const [user2, setUser2] = useState(undefined);
    /*  (async () => {
         const response = await getMeApi();
         setUser2(response || null);
     })()
 
     const usuario: any = user2;
     console.log(usuario); */
    // cargando query mediante ReactQuery
    //const { data, error, isLoading } = useQuery('productos', fetcher);
    const { data, error, isLoading } = useQuery('productos', getActiveProducts);

    const token = getToken();

    // Access the client
    const queryClient = useQueryClient();

    // Mutations
    const mutation = useMutation(addCarrito, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('todos')
        },
    })

    if (isLoading) return <div><h1>Cargando...</h1></div>;
    if (data.ok == false) {
        return <div><h1>Servidor fuera de servicio</h1></div>;
    };

    console.log(data);

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {data?.productosActivos?.map((producto: any) => (
                    <div key={producto._id} className="md:bg-white shadow-lg rounded-lg  md:flex my-4 mx-2">
                        <div className="flex flex-row justify-center rounded-t-lg w-full bg-white">
                            <img className="rounded-t-lg md:rounded-l-lg md:w-full max-h-52" src={producto.img} alt="" />
                        </div>
                        <div className="bg-white shadow-lg px-6 pb-6">
                            <h2 className="text-2xl uppercase font-semibold tracking-tight text-gray-900">{producto.nombre}</h2>
                            <div className="text-sm font-semibold text-gray-500">{producto.precioUnitario}</div>
                            <div className="text-sm font-semibold text-gray-500">Stock: {producto.stock}</div>
                            {usuario.value ? <div className="add-btn" onClick={() => { mutation.mutate({ usuario: usuario.value.dbUser._id, producto: producto._id, cantidad: "1" }) }}><h1 className="symbol mr-2 text-white">+</h1><button className="text-white">Agregar</button></div> :
                                <div className="add-btn" onClick={moverALogin}><h1 className="symbol mr-2 text-white">+</h1><button className="text-white">Agregar</button></div>
                            }

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

    function moverALogin() {
        Router.push("/login")
    }
}

