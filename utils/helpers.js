import validator from 'validator';
import crypto from 'crypto';

const generateRandomId = (length = 10) => {
  if (!Number.isInteger(length) || length <= 0) {
    throw new Error('Length must be a positive integer.');
  }
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
};

const formatDate = (date) => {
    if (!date) {
        return null;
    }

    let dateObj;

    if (date instanceof Date) {
        dateObj = date;
    } else {
        try {
           dateObj = new Date(date);
           if(isNaN(dateObj.getTime())) {
              return null;
           }

        } catch (error) {
          return null;
        }
    }
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const calculateDaysBetween = (startDate, endDate) => {
  if (!startDate || !endDate) {
    return null;
  }


  if(!isDateValid(startDate) || !isDateValid(endDate)){
       return null;
  }


  try {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return null;
      }

      const timeDiff = end.getTime() - start.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return daysDiff;

  } catch (error) {
      return null;
  }

};


const isDateValid = (dateString) => {
    if(!dateString) {
       return false
    }


    try {
        const dateObj = new Date(dateString);

        if (isNaN(dateObj.getTime())) {
             return false;
        }

        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        return formattedDate === dateString;


    } catch (error) {
        return false;
    }
};


export { generateRandomId, formatDate, calculateDaysBetween, isDateValid };