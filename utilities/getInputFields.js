
export function getInputFields(createData) {
    let inputFields;
    try {
        if (!Array.isArray(createData)) {
            throw new Error("createData is not an array");
        }
        inputFields = (Object.keys(createData[0])).filter(key => key !== "id"); // Id must be unique value
    } catch (error) {
        console.error("Error:", error.message);
    }
    return inputFields;
}
