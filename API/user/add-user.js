import constants from "../../resources/constants";

async function createUser(data) {
    try {
        const response = await fetch(`${constants.API_URL_USER}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error in createUser:', error);
        throw error;
    }
}

const createUserData = async (informations) => {

    try {
        await createUser(informations);
    } catch (error) {
        console.error('Error in createUserData:', error);
    } 
};

export default createUserData;
