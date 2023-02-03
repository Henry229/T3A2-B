export default function validateInputs(date, firstName, lastName, mobile) {
  const letters = /^[A-Za-z]+$/;
  const mobileNumber = /^[0-9]+$/;
  if (!date || date.toLocaleString().slice(12) === '00:00:00') {
    throw new Error('Please select a valid date and time from the calendar');
  }

  if (!firstName.match(letters) || !lastName.match(letters)) {
    throw new Error('Please type valid name without space.');
  }

  if (
    mobile.length != 10 ||
    !mobile.match(mobileNumber) ||
    !mobile.startsWith('04')
  ) {
    throw new Error('Please type a valid mobile number');
  }
}
