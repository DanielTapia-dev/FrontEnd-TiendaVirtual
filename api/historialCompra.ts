export async function getHistoriales(id: String) {
    try {
        const url = `https://app-node-nextjs.herokuapp.com/api/historiales/${id}`;
        const params = {
            method: 'GET',
            headers: {
                token: ''
            }
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error: any) {
        return null;
    }
}