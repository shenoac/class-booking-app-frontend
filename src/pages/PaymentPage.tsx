import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { Button, Box, Typography, CircularProgress, createTheme, ThemeProvider } from '@mui/material';
import { useLocation } from 'react-router-dom'; // Use to get bookingId from the previous page

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
  const location = useLocation();
  const { bookingId } = location.state as { bookingId: number };  // Get bookingId from state

  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState<number | null>(null);  // To store fetched price
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch price when the component mounts
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/payment-details/price/${bookingId}`);
        
        // Log the full response object
        console.log("Full API Response: ", response);

        // Access the correct field (price) from the response
        const fetchedPrice = response.data;  // Assuming API directly returns the price

        // Log the fetched price and its type
        console.log("Fetched price: ", fetchedPrice, "Type of fetchedPrice: ", typeof fetchedPrice);

        setPrice(Number(fetchedPrice)); // Ensure the fetched price is a number

        // Log the converted price
        console.log("Converted price: ", Number(fetchedPrice), "Type of convertedPrice: ", typeof Number(fetchedPrice));

      } catch (error) {
        console.error('Error fetching price:', error);
        setErrorMessage('Error fetching price. Please try again.');
      }
    };

    fetchPrice();
  }, [bookingId]);

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (price === null) {
        setErrorMessage('Error: Price not available.');
        setLoading(false);
        return;
      }

      // Create payment intent using the fetched price (still hardcoded for now)
      const { data: paymentIntent } = await axios.post('http://localhost:8080/payments/create', {
        amount: price * 100,  // This will later be replaced with 'price'
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

        {price !== null ? (
          <>
            <Typography variant="h6" gutterBottom>
              Amount to Pay: ${price.toFixed(2)}
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
          </>
        ) : (
          <CircularProgress />
        )}

        {errorMessage && <Typography color="error" mt={2}>{errorMessage}</Typography>}
        {successMessage && <Typography color="primary" mt={2}>{successMessage}</Typography>}
      </Box>
    </ThemeProvider>
  );
};

export default PaymentPage;
