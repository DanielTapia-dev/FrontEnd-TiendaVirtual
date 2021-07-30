import React, { useState } from 'react';
import Link from "next/link";
import { useFormik, ErrorMessage } from 'formik';
import { registerApi } from "../api/users";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from 'react-query';
import useAuth from "../hooks/userAuth";
import Swal from 'sweetalert2';
import Router from 'next/router';

const Reguister = () => {
    return (
        // Provide the client to your App
        <QueryClientProvider client={queryClient}>
            <ReguisterForm />
        </QueryClientProvider>
    )
}

// Create a client
const queryClient = new QueryClient()

function ReguisterForm() {

    const { login } = useAuth();
    // Access the client
    const queryClient = useQueryClient();

    // Mutations
    const mutation = useMutation(registerApi, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('todos')
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
                    text: 'El email ya existe'
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
        },
        validate: values => {
            let errors = {
                email: "",
                nombre_1: "",
                apellido_1: "",
                password: ""
            };
            if (!values.apellido_1) {
                errors.apellido_1 = 'Campo requerido!'
            } else if (!/^[A-Z]+$/i.test(values.apellido_1)) {
                errors.apellido_1 = 'Solo letras!'
            }
            if (!values.password) {
                errors.password = 'Campo requerido!'
            } else if (values.password.length < 6) {
                errors.password = 'Minimo 6 caracteres!'
            }
            if (!values.nombre_1) {
                errors.nombre_1 = 'Campo requerido!'
            } else if (!/^[A-Z]+$/i.test(values.nombre_1)) {
                errors.nombre_1 = 'Solo letras!'
            }
            if (!values.email) {
                errors.email = 'Campo requerido!'
            } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(values.email)) {
                errors.email = 'Email invalido!'
            }
            if (errors.email == "" && errors.nombre_1 == "" && errors.apellido_1 == "" && errors.password == "") {
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
            <h1 className="text-3xl font-bold">Register</h1>
            <div className="flex flex-row border-2 p-1 mt-2 rounded-md w-60 md:w-72">
                <h1>Email:</h1>
                <input className="outline-none ml-2 w-full" type="email" name="email" onChange={formik.handleChange} value={formik.values.email} />
                {formik.errors.email && <div className="error text-red-500 text-xs">{formik.errors.email}
                </div>}
            </div>
            <div className="flex flex-row border-2 p-1 mt-2 rounded-md w-60 md:w-72">
                <h1>Nombre:</h1>
                <input className="outline-none ml-2 w-full" type="text" name="nombre_1" onChange={formik.handleChange} value={formik.values.nombre_1} />
                {formik.errors.nombre_1 && <div className="error text-red-500 text-xs">{formik.errors.nombre_1}</div>}
            </div>
            <div className="flex flex-row border-2 p-1 mt-2 rounded-md w-60 md:w-72">
                <h1>Apellido:</h1>
                <input className="outline-none ml-2 w-full" type="text" name="apellido_1" onChange={formik.handleChange} value={formik.values.apellido_1} />
                {formik.errors.apellido_1 && <div className="error text-red-500 text-xs">{formik.errors.apellido_1}</div>}
            </div>
            <div className="flex flex-row border-2 p-1 mt-2 rounded-md w-60 md:w-72">
                <h1>Password:</h1>
                <input className="outline-none ml-2 w-full" type="password" name="password" onChange={formik.handleChange} value={formik.values.password} />
                {formik.errors.password && <div className="error text-red-500 text-xs">{formik.errors.password}</div>}
            </div>
            <div className="flex flex-row justify-center w-60 md:w-72 mt-2 text-sm ">
                <button className="button-basic" type="submit">Crear cuenta</button>
            </div>
            <div className="flex flex-row justify-between w-60 md:w-72 mt-2 text-sm ">
                <h1>¿Ya tienes una cuenta?</h1>
                <Link href="/login">
                    <h1 className="cursor-pointer text-blue-600">Login</h1>
                </Link>
            </div>
        </form>
    )
}

function initialValues() {
    return {
        email: "",
        nombre_1: "",
        apellido_1: "",
        password: "",
        role: "cliente"
    };
}

export default Reguister;
