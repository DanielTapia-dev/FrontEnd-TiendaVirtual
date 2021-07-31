import { getToken } from './token';
import Swal from 'sweetalert2';
import Router from 'next/router';
export async function addCompra(compra: any) {
    console.log(compra)
    try {
        const token: any = getToken();
        const url = `${process.env.KEY}/api/compra`;
        const params = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                token: token
            },
            body: JSON.stringify(compra)
        };
        const response = await fetch(url, params);
        const result = await response.json();
        if (result.ok == true) {
            Swal.fire({
                icon: 'success',
                title: 'Correcto',
                text: 'Gracias por su compra',
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error en la compra'
            });
        }
        Router.push("/");
        return result;
    } catch (error: any) {
        console.log(error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error en la compra'
        });
        return null;
    }
}