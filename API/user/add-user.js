import Cookies from "js-cookie";
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
    const clientToken = Cookies.get('clientToken');
    if (!clientToken) {
        throw new Error('Client token is missing');
    }
    
    // Get the current date and time in milliseconds
    const currentDate = new Date().getTime()

   // If backend expects the date as a string, use currentDate.toString()
    const userData = {
        ...informations,
        createdAt: {
            $date: {
                $numberLong: currentDate
            }
        },
        updatedAt: {
            $date: {
                $numberLong: currentDate
            }
        }
    };

    const dataRaw = {
        token: clientToken,
        newUserPermission: userData
    };
    try {
        await createUser(dataRaw);
    } catch (error) {
        console.error('Error in createUserData:', error);
    } 
};

export default createUserData;
