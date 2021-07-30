import { getToken } from './token';
export async function addCarrito(producto: any) {
    try {
        const token: any = getToken();
        const url = 'https://app-node-nextjs.herokuapp.com/api/carrito';
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
        return result;
    } catch (error: any) {
        console.log(error)
        return null;
    }
}