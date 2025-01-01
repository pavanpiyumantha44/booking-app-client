import dayjs from "dayjs";


// Function to validate email
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

// Function to validate mobile number
function validateMobileNumber(mobileNumber) {
  const mobileRegex = /^[0-9]{10}$/; 
  return mobileRegex.test(mobileNumber);
}


const validateBooking = (startDttm, endDttm) => {
    const startDateTime = dayjs(startDttm);
    const endDateTime = dayjs(endDttm);
  
    // Check if both dates are in the future
    const now = dayjs();
    if (startDateTime.isBefore(now) || endDateTime.isBefore(now)) {
      return { isValid: false, message: "You cannot add events to past dates or time." };
    }
  
    // Check if both times are within allowed hours (6:00 AM - 9:00 PM)
    const startHour = startDateTime.hour();
    const endHour = endDateTime.hour();
    if (startHour < 6 || endHour >= 21) {
      return { isValid: false, message: "Bookings must be between 6:00 AM and 9:00 PM." };
    }
    
     // Check if the start and end times are on the same day
    if (!startDateTime.isSame(endDateTime, 'day')) {
      return { isValid: false, message: "The booking must start and end on the same day." };
    }
    
    // Check if the start time is before the end time
    if (startDateTime.isSameOrAfter(endDateTime)) {
      return { isValid: false, message: "The start time must be before the end time." };
    }
    
    // Check if the booking duration is at least 30 minutes
    const durationMinutes = endDateTime.diff(startDateTime, 'minute');
    if (durationMinutes < 30) {
      return { isValid: false, message: "The booking duration must be at least 30 minutes." };
    }
    // All validations passed
    return { isValid: true, message: "Booking is valid." };
  };

const validateOverlapBookings = (startDttm, endDttm, availableBookings,serviceId) => {
    const startDateTime = dayjs(startDttm.toString());
    const endDateTime = dayjs(endDttm.toString());
    
    const hasOverlap = availableBookings.some((booking) => {
        const existingStart = dayjs(booking.start);
        const existingEnd = dayjs(booking.end);
        return (
          booking.serviceId === serviceId &&
          startDateTime.isBefore(existingEnd) &&
          endDateTime.isAfter(existingStart)
        );
      });
    if (hasOverlap) {
        return { isValid: false, message: "This time slot is already taken. Please choose a different time or a tennis court."};
    }else{
        return { isValid: true, message: "Booking is valid." };
    }
}
export {validateEmail,validateMobileNumber,validateBooking, validateOverlapBookings};