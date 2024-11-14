import constants from "../../resources/constants";

async function fetchUsers() {
    const response = await fetch(`${constants.API_URL_USER}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

const listUserData = async () => {
    try {
        const data = await fetchUsers();
        console.log("dat:",data);
        return data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

export default listUserData;
