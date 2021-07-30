import jwtDecode from 'jwt-decode';
import { getMeApi } from './users';

export function setToken(token: any) {
    localStorage.setItem("token", token);
}

export function getToken() {
    return localStorage.getItem("token");

}

export function deleteToken() {
    return localStorage.removeItem("token");
}

export function hasExpiredToken(token: any) {
    const tokenDecode = jwtDecode<any>(token);
    const expiredDate = tokenDecode.exp * 1000;
    const currentDate = new Date().getTime();

    if (currentDate > expiredDate) {
        return true;
    } else {
        return false;
    }
}