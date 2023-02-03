export default function validateInputs(date, firstName, lastName, mobile, isMobileOnly=false) {
  const letters = /^[A-Za-z]+$/
  const mobileNumber = /^[0-9]+$/

  if (!isMobileOnly) {
    if (!date || date.toLocaleString().slice(12) === '00:00:00') {
      throw new Error('Please select a valid date nad time from the calendar')
    }

    if (
      !firstName.match(letters) || 
      !lastName.match(letters)
    ) {
      throw new Error('Please type valid name without space.')
    }
  }

  if (
    mobile.length != 10 ||
    !mobile.match(mobileNumber) ||
    !mobile.startsWith('04')
  ) {
    throw new Error ('Please type a 10 digits of mobile number starts with 04')
  }
}
