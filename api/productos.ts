export async function getActiveProducts() {
    try {
        const url = `${process.env.KEY}/api/productosActivos`;
        const params = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error: any) {
        return null;
    }
}