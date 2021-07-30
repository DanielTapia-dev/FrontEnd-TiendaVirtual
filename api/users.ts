import Swal from 'sweetalert2';
import Router from 'next/router'
import jwtDecode from 'jwt-decode';
import { authFetch } from '../utils/fetch';

export async function registerApi(formData: any) {
    try {
        const url = 'https://app-node-nextjs.herokuapp.com/api/auth/new';
        const params = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error)
        return null;
    }
}

export async function loginUser(formData: any) {

    try {
        const url = 'https://app-node-nextjs.herokuapp.com/api/auth/';
        const params = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error)
        return {};
    }
}

export async function getMeApi(logout: any) {
    try {
        const id = localStorage.getItem('token');
        if (id) {
            const uid = jwtDecode<any>(id).uid;
            const url = `https://app-node-nextjs.herokuapp.com/api/auth/datosUsuario/${uid}`;
            const result = await fetch(url, {
                method: 'GET',
                headers: {
                    token: id,
                }
            });
            return result.json();
        } else {
            return null;
        }
    } catch (error) {
        console.log(error)
    }
}