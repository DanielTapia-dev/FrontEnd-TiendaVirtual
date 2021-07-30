export async function getActiveProducts() {
    try {
        const url = 'https://app-node-nextjs.herokuapp.com/api/productosActivos';
        const params = {
            method: 'GET'
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error: any) {
        return null;
    }
}