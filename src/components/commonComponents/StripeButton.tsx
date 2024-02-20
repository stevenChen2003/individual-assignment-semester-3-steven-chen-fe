import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import TokenManager from '../../api/TokenManager';
import { toast } from 'react-toastify';

const StripeButton = ({ price, handleProceedToPayment }) => {
  const publishableKey = 'pk_test_51OZKR3DfFgDt3Iz4vF7Yi4Wlykl6gT9l1V3NoZzwnlnax6l9FlTHCpoMtuBxEIKHXR7Sq7fXcZFXLUvrhPwcHRmr004925UeYZ';
  const stripePrice = price * 100;

  const onToken = (token) => {
    console.log("Token", token.id);

    axios
      .post('http://localhost:8080/payment', {
        amount: stripePrice,
        token: token.id,
      }, {
        headers: {
          Authorization: `Bearer ${TokenManager.getAccessToken()}`,
        },
      })
      .then((response) => {
        console.log("Test",response);
        toast.success('Payment success');
        handleProceedToPayment();
      })
      .catch((error) => {
        toast.error('Payment failed');
      });
  };

  return (
    <StripeCheckout
      amount={stripePrice}
      label="Pay Now"
      description={`Your total is $${price}`}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
      currency="EUR"
    >
      <button className='btn btn-primary'>Proceed with Payment</button>
    </StripeCheckout>
  );
};

export default StripeButton;
