import showAlert from "./showAlert";

// Valid PhoneNumber Function 
function isValidPhoneNumber(phoneNumber) {
// Remove spaces
phoneNumber = phoneNumber.replace(/\s+/g, '');

// Check if the phone number consists only of digits
const regex = /^\d+$/;

// Check the length of the number (11 digits for Turkey)
const isValidLength = phoneNumber.length === 11;

return regex.test(phoneNumber) && isValidLength;
}
function isValidEmail(email) {
return email.includes("@");
}
// Check if all fields are filled
function areAllFieldsFilled(fields) {
return !Object.values(fields).some(value => value === "");
}
 
 // Restriction Functions
 function handleValidationsCreatedData( { handleCreateUser, informations, handleCloseModal, dynamicType }) {
    if (!areAllFieldsFilled(informations)) {
      showAlert("Lütfen tüm alanları doldurunuz.");
      return false;
    }
  
    if (informations.name && informations.password && informations.name === informations.password) {
      showAlert('İsim ile şifre aynı olamaz');
      return false;
    }
  
    if (informations.email && !isValidEmail(informations.email)) {
      showAlert('Lütfen geçerli bir email giriniz.');
      return false;
    }
  
    if (informations.phone && !isValidPhoneNumber(informations.phone)) {
      showAlert('Lütfen 11 haneli ve geçerli bir telefon numarası giriniz.');
      return false;
    }
  
    // If all conditions are ok, create the data
    handleCreateUser({ informations, handleCloseModal, dynamicType });
    return true;
}
export default handleValidationsCreatedData