import React, { useEffect, useState } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { savePaymentAction } from '../actions/cartAction';
import CheckoutSteps from '../components/CheckoutSteps';
import { State } from '../reducers';

type Props = {};

const PaymentScreen = (props: Props) => {



  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { shippingAddress } = useSelector((state: State) => state.cart)

  useEffect(() => {

    if (!shippingAddress.address) {
      navigate('/shipping')
    }
  }, [navigate, shippingAddress.address]);




  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(savePaymentAction(paymentMethod))
    navigate('/placeOrder')
  }


  return (

    <>
      <Row className={'justify-content-md-center'}>
        <Col xs={12} md={8}>
          <CheckoutSteps signIn shipping payment />
          <h1>Payment Method</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label as='legend'>Select Method</Form.Label>
              <Col>
                <Form.Check
                  type='radio'
                  label='PayPal'
                  id='PayPal'
                  name='paymentMethod'
                  value='PayPal'
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
                {/* <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check> */}
              </Col>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Continue
            </Button>
          </Form>

        </Col>
      </Row>
    </>
  );
};

export default PaymentScreen;
