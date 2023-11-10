import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { sendPayment } from './api/mockApi';
import App from './App';

jest.mock('./api/mockApi');

describe('Payment Component', () => {
  it('should open modal when clicking on payment Button', async () => {
    render(<App />);

    const paymentBtn = screen.getByTestId('payment-btn');
    fireEvent.click(paymentBtn);

    const form = screen.getByTestId('form-container');

    expect(form).toBeInTheDocument();
  });

  it('should successfully send payment', async () => {
    render(
      <App />
    );

    const paymentBtn = screen.getByTestId('payment-btn');
    fireEvent.click(paymentBtn);

    const form = screen.getByTestId('form-container');
    expect(form).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('to-input'), { target: { value: 'recipient@example.com' } });
    fireEvent.change(screen.getByTestId('from-input'), { target: { value: 'USD' } });
    fireEvent.change(screen.getByTestId('amount-input'), { target: { value: '100' } });
    fireEvent.change(screen.getByTestId('description-input'), { target: { value: 'Test Payment' } });

    sendPayment.mockResolvedValueOnce({ success: true });

    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      expect(screen.getByText(/payment success!/i)).toBeInTheDocument();
    });
  });

  it('should handle 400 Bad Request', async () => {
    render(
      <App />
    );
    const paymentBtn = screen.getByTestId('payment-btn');
    fireEvent.click(paymentBtn);

    const form = screen.getByTestId('form-container');
    expect(form).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('to-input'), { target: { value: 'recipient@example.com' } });
    fireEvent.change(screen.getByTestId('from-input'), { target: { value: 'USD' } });
    fireEvent.change(screen.getByTestId('amount-input'), { target: { value: '100' } });
    fireEvent.change(screen.getByTestId('description-input'), { target: { value: 'Test Payment' } });

    sendPayment.mockRejectedValueOnce({ status: 400, message: 'Invalid input' });

    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      expect(screen.getByText(/invalid input/i)).toBeInTheDocument();
    });
  });

  it('should handle 5XX Server Error', async () => {
    render(
      <App />
    );

    const paymentBtn = screen.getByTestId('payment-btn');
    fireEvent.click(paymentBtn);

    const form = screen.getByTestId('form-container');
    expect(form).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('to-input'), { target: { value: 'recipient@example.com' } });
    fireEvent.change(screen.getByTestId('from-input'), { target: { value: 'USD' } });
    fireEvent.change(screen.getByTestId('amount-input'), { target: { value: '100' } });
    fireEvent.change(screen.getByTestId('description-input'), { target: { value: 'Test Payment' } });

    sendPayment.mockRejectedValueOnce({ status: 500, message: 'Server Error' });

    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      expect(screen.getByText(/server error/i)).toBeInTheDocument();
    });
  });

  it('should handle 401 Unauthorized', async () => {
    render(
      <App />
    );

    const paymentBtn = screen.getByTestId('payment-btn');
    fireEvent.click(paymentBtn);

    const form = screen.getByTestId('form-container');
    expect(form).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('to-input'), { target: { value: 'recipient@example.com' } });
    fireEvent.change(screen.getByTestId('from-input'), { target: { value: 'USD' } });
    fireEvent.change(screen.getByTestId('amount-input'), { target: { value: '100' } });
    fireEvent.change(screen.getByTestId('description-input'), { target: { value: 'Test Payment' } });

    sendPayment.mockRejectedValueOnce({ status: 401, message: 'Unauthorized' });

    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      expect(screen.getByText(/unauthorized/i)).toBeInTheDocument();
    });
  });
});
