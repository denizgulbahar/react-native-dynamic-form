import Cookies from "js-cookie";
import constants from "../../resources/constants";

async function fetchUsers(token) {
    const response = await fetch(`${constants.API_URL_USER}/get-users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })  // Use ES6 shorthand property name for { token: token }
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

const listUserData = async () => {
    const clientToken = Cookies.get('clientToken');

    if (!clientToken) {
        throw new Error('Client token is missing');
    }

    try {
        const data = await fetchUsers(clientToken);
        return data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

export default listUserData;
