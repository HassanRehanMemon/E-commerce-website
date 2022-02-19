import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { State } from '../reducers'
import { Container, Row, Col, Alert, ListGroup, Image, Card, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import { orderDeliverAction, orderDetailAction, orderPaidAction } from '../actions/orderAction'
import { Link } from 'react-router-dom'
import { PayPalButton } from 'react-paypal-button-v2'
import axios from 'axios'
import { OrderDeliver, OrderPaid } from '../constants'

type Props = {}

const OrderScreen = (props: Props) => {

  const [payPalSDK, setPayPalSDK] = useState(false)

  const dispatch = useDispatch()
  const { order, loading: orderLoading, error: orderError } = useSelector((state: State) => state.orderDetail)
  const { loading: deliverLoading, error: deliverError, success: deliverSuccess } = useSelector((state: State) => state.orderDeliver)

  const { user, } = useSelector((state: State) => state.userSignIn)
  const { success: PaySuccess, error: payError } = useSelector((state: State) => state.orderPaid)
  const { id } = useParams()
  console.log(order);

  useEffect(() => {

    const payPalScript = async () => {
      const client_id = await axios.get('/api/config/paypal')

      console.log(client_id);
      //script
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${client_id.data}`
      script.async = true
      console.log(payPalSDK);
      script.addEventListener('load', () => {

        console.log('should be here');
        setPayPalSDK(true)
      })
      document.body.appendChild(script)

    }


    if ((user.token && id) && (!order.totalPrice || PaySuccess || deliverSuccess || order._id !== id)) {

      dispatch({ type: OrderPaid.RESET })
      dispatch({ type: OrderDeliver.RESET })
      console.log(`fetching ${id}`);
      dispatch(orderDetailAction(id, user.token))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        payPalScript()
      } else {
        setPayPalSDK(true)
      }
    }
    else {
      console.log('something went wrong');
    }
  }, [dispatch, id, user, order, PaySuccess, payPalSDK, deliverSuccess])

  const payPalResultHandler = (result: any) => {
    if (id) {
      dispatch(orderPaidAction(id, user.token, result))
    }

  }

  const deliverHandler = () => {
    if (id) {
      dispatch(orderDeliverAction(id))
    }
  }

  return (
    // <div>{order.orderItems}</div>

    <Container>
      {payError !== "" && <Alert variant={'danger'}>{payError}</Alert>}
      {deliverError !== "" && <Alert variant={'danger'}>{deliverError}</Alert>}
      {orderLoading ? <Loader /> : (
        <Row className={'justify-content-md-center'}>
          <Col xs={12} md={8}>
            {orderError !== "" &&
              <Alert variant={'danger'}>{orderError} </Alert>
            }
            {order.orderItems.length === 0 ? (
              <Alert>
                Your cart is empty <Link to='/'>Go Back</Link>
              </ Alert>
            ) : (
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h4>Shipping Address</h4>
                  <p>
                    <strong>Name: </strong>
                    {order.user.name}
                  </p>
                  <p>
                    <strong>Email: </strong>
                    {order.user.email}
                  </p>
                  <p>
                    <strong> Address: </strong>
                    {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.country}, {order.shippingAddress.postalCode}
                  </p>
                  {
                    !order.isDelivered

                      ? <Alert variant={'danger'}>Not Delivered</Alert>
                      : <Alert variant={'success'}>Deliverd</Alert>

                  }
                </ListGroup.Item>

                <ListGroup.Item>
                  <h4>Payment Method</h4>
                  Method: {order.paymentMethod}

                  {
                    !order.isPaid ?
                      <Alert variant={'danger'}> Not Paid</Alert>
                      :
                      <Alert variant={'success'}>Paid</Alert>
                  }

                </ListGroup.Item>
                {order.orderItems.map((item) => (
                  <ListGroup.Item key={item.product_id}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={6}>
                        <Link to={`/product/${item.product_id}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        ${item.price} * {item.qty} = ${(item.price * item.qty).toFixed(2)}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant={'flush'}>
                <ListGroup.Item className={'justify-content-center text-center'}>
                  <h2>
                    SUB-TOTAL
                  </h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Item Price: </Col>
                    <Col>${order.orderItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Tax:</Col>
                    <Col>${order.tax ?? '0'}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping Fee</Col>
                    <Col>${order.shippingFee ?? '0'}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>${(order.totalPrice).toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>

                {
                  !order.isPaid && (

                    <ListGroup.Item>
                      {!payPalSDK ? <Loader /> :
                        <PayPalButton amount={order.totalPrice} onSuccess={payPalResultHandler} />
                      }
                    </ListGroup.Item>
                  )

                }
                {
                  user && user.isAdmin && order.isPaid && !order.isDelivered
                  && (
                    deliverLoading ? <Loader /> :
                      <Button 
                      className='btn btn-block'
                      onClick={deliverHandler}
                      >
                        Mark as Deliver
                      </Button>
                  )
                }
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </Container>


  )
}

export default OrderScreen