import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { Button, Box, Typography, CircularProgress, createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#D8BFD8',  // Mauve
    },
    secondary: {
      main: '#4B0082',
    },
    background: {
      default: '#F5F5F5',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

const PaymentPage: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { data: paymentIntent } = await axios.post('http://localhost:8080/payments/create', {
        amount: 1000,
      });

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(paymentIntent.client_secret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      if (result.error) {
        setErrorMessage(result.error.message || 'Payment failed. Please try again.');
      } else if (result.paymentIntent?.status === 'succeeded') {
        setSuccessMessage('Payment successful!');
      }
    } catch (error) {
      setErrorMessage('Error processing payment. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: '#f9f9f9',
          padding: 3,
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          maxWidth: '500px',
          margin: '0 auto',
          marginTop: '50px',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Payment Page
        </Typography>
        <form onSubmit={handlePayment}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
          <Box mt={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!stripe || loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Pay Now'}
            </Button>
          </Box>
        </form>
        {errorMessage && <Typography color="error" mt={2}>{errorMessage}</Typography>}
        {successMessage && <Typography color="primary" mt={2}>{successMessage}</Typography>}
      </Box>
    </ThemeProvider>
  );
};

export default PaymentPage;
