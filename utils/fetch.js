import { getToken } from "../api/token";

export async function authFetch(url, params, logout) {
    const token = getToken();
    if (!token) {
        //Usuario no logeado sacar de la cuenta
        logout();
    } else {
        if (hasExpiredToken(token)) {
            //Token caducado
            logout();
        } else {
            const paramsTemp = {
                ...params,
                header: {
                    ...params?.header
                }
            };


            try {
                const response = await fetch(url, paramsTemp);
                const result = await response.json();
                return result;
            } catch (error) {
                console.log(error);
                return error;
            }
        }
    }
}