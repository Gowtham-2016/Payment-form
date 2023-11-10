export const sendPayment = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
  
      if (data.to && data.from && data.amount > 0 && data.mockStatusCode === 200) {
        // On Success - Display Success Dialog
        return { status: 200, success: true, message: 'Payment successful' };
      } else if (data.mockStatusCode === 400) {
        // 400 - Bad Request - Display error message to user
        throw { status: 400, message: 'Bad Request: Invalid input' };
      } else if (data.mockStatusCode === 401) {
        // 401 - Unauthorized - Redirect to login page
        throw { status: 401, message: 'Unauthorized!' };
      } else {
        // 5XX - Server Error - Display error message to user
        throw { status: 500, message: 'Server Error. Please try again later.' };
      }
    } catch (error) {
      // If an error occurs, throw it to be caught by the calling code
      throw error;
    }
  };