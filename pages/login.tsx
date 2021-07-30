import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { useFormik, ErrorMessage } from 'formik';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from 'react-query';
import { loginUser } from '../api/users';
import useAuth from "../hooks/userAuth";
import Swal from 'sweetalert2';
import Router from 'next/router';

const Login = () => {
    return (
        // Provide the client to your App
        <QueryClientProvider client={queryClient}>
            <LoginForm />
        </QueryClientProvider>
    )
}

// Create a client
const queryClient = new QueryClient()

function LoginForm() {

    const { login } = useAuth();

    // Access the client
    const queryClient = useQueryClient();

    // Mutations
    const mutation = useMutation(loginUser, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('todos');

        },
    })

    if (mutation.data) {
        try {
            if (mutation.data.token) {
                login(mutation.data.token);
                mutation.reset();
                Swal.fire({
                    icon: 'success',
                    title: 'Correcto',
                    text: 'Ingreso exitoso',
                    preConfirm: () => {
                        Router.push('/')
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Credenciales incorrectas'
                });
                mutation.reset();
            }
        } catch (error) {
        }
    }

    const formik = useFormik({
        initialValues: initialValues(),
        onSubmit: (values) => {
            mutation.mutate(values);
            Swal.fire({
                allowOutsideClick: false,
                icon: 'info',
                title: 'Cargando',
                text: 'Espere por favor...'
            });
            Swal.showLoading();
        },
        validate: values => {
            let errors = {
                email: "",
                nombre: "",
                apellido: "",
                password: ""
            };
            if (!values.password) {
                errors.password = 'Campo requerido!'
            }
            if (!values.email) {
                errors.email = 'Campo requerido!'
            } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(values.email)) {
                errors.email = 'Email invalido!'
            }
            if (errors.email == "" && errors.nombre == "" && errors.apellido == "" && errors.password == "") {
                return {};
            } else {
                return errors;
            }

        }
    })

    return (
        <form className="flex flex-col items-center justify-center h-screen p-1 rounded-md text-justify" onSubmit={formik.handleSubmit}>
            <Link href="/">
                <img className="w-20 md:w-40 cursor-pointer" src="/logo.png" alt="" />
            </Link>
            <h1 className="text-3xl font-bold">Login</h1>
            <div className="flex flex-row border-2 p-1 mt-2 rounded-md w-60 md:w-72">
                <h1>Usuario:</h1>
                <input className="outline-none ml-2 w-full" type="text" name="email" onChange={formik.handleChange} value={formik.values.email} />
                {formik.errors.email && <div className="error text-red-500 text-xs">{formik.errors.email}
                </div>}
            </div>
            <div className="flex flex-row border-2 p-1 mt-2 rounded-md w-60 md:w-72" >
                <h1>Contraseña:</h1>
                <input className="outline-none ml-2 w-full" type="password" name="password" onChange={formik.handleChange} value={formik.values.password} />
                {formik.errors.password && <div className="error text-red-500 text-xs">{formik.errors.password}</div>}
            </div>
            <div className="flex flex-row justify-center w-60 md:w-72 mt-2 text-sm ">
                <button className="button-basic">Iniciar sesion</button>
            </div>
            <div className="flex flex-row justify-between w-60 md:w-72 mt-2 text-sm ">
                <h1>¿No tienes una cuenta?</h1>
                <Link href="/register">
                    <h1 className="cursor-pointer text-blue-600">Resgistrate</h1>
                </Link>
            </div>
        </form>
    )
}

function initialValues() {
    return {
        email: "",
        password: ""
    };
}


export default Login;
