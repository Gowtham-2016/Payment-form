export interface PaymentData {
  to: string;
  from: string;
  amount: number;
  description?: string;
  mockStatusCode: number;
}

export interface PaymentResponse {
  status: number;
  success?: boolean;
  message: string;
}

export class PaymentError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'PaymentError';
    this.status = status;
  }
}

export const sendPayment = async (data: PaymentData): Promise<PaymentResponse> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (data.to && data.from && data.amount > 0 && data.mockStatusCode === 200) {
      return { status: 200, success: true, message: 'Payment successful' };
    } else if (data.mockStatusCode === 400) {
      throw new PaymentError(400, 'Bad Request: Invalid input');
    } else if (data.mockStatusCode === 401) {
      throw new PaymentError(401, 'Unauthorized!');
    } else {
      throw new PaymentError(500, 'Server Error. Please try again later.');
    }
  } catch (error) {
    throw error;
  }
};
