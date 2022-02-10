import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { State } from '../reducers'
import { Container, Row, Col, Alert, ListGroup, Image, Card, Button } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import Loader from '../components/Loader'
import { orderDetailAction } from '../actions/orderAction'
import { Link } from 'react-router-dom'

type Props = {}

const OrderScreen = (props: Props) => {

  const dispatch = useDispatch()
  const { order, loading: orderLoading, error: orderError, success } = useSelector((state: State) => state.orderDetail)
  const { user, loading: userLoading, error: userError } = useSelector((state: State) => state.userSignIn)
  const { id } = useParams()
  console.log(order);

  useEffect(() => {
    if (user.token && id) {

      dispatch(orderDetailAction(id, user.token))
    } else {
      console.log('something went wrong');
    }
  }, [dispatch, id, user])

  return (
    // <div>{order.orderItems}</div>

    <Container>
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
                    !order.isDelivered && 
                    <Alert variant={'danger'}>Not Delivered</Alert>
                  }
                </ListGroup.Item>

                <ListGroup.Item>
                  <h4>Payment Method</h4>
                  Method: {order.paymentMethod}
                  
                  {
                    !order.isPaid && 
                    <Alert variant={'danger'}> Not Paid</Alert>
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

              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </Container>


  )
}

export default OrderScreen