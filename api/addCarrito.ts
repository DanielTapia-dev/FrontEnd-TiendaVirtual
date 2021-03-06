import { getToken } from './token';
import Swal from 'sweetalert2';
export async function addCarrito(producto: any) {
    console.log(producto)
    try {
        const token: any = getToken();
        const url = `${process.env.KEY}/api/carrito`;
        const params = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                token: token
            },
            body: JSON.stringify(producto)
        };
        const response = await fetch(url, params);
        const result = await response.json();
        if (result.ok == true) {
            Swal.fire({
                icon: 'success',
                title: 'Producto ingresado',
                text: 'Ingreso exitoso',
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Existen productos fuera de stock - Se han actualizado las existencias en el carrito al maximo de unidades'
            });
        }
        return result;
    } catch (error: any) {
        console.log(error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El producto no pudo ser ingresado'
        });
        return null;
    }
}