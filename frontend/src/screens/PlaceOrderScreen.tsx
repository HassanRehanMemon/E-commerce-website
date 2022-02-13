import React, { useEffect } from 'react';
import { Row, Col, ListGroup, Image, Form, Button, Alert, Card, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { calculatePriceAction, cartAddItemAction, cartRemoveItemAction } from '../actions/cartAction';
import { placeOrderAction } from '../actions/orderAction';
import CheckoutSteps from '../components/CheckoutSteps';
import { State } from '../reducers';
import { AddToCart, PlaceOrder } from '../constants'
import Loader from '../components/Loader'

type Props = {};

const PlaceOrderScreen = (props: Props) => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { cartItems, shippingAddress, paymentMethod, totalPrice, tax, shippingFee } = useSelector((state: State) => state.cart)
    const { user } = useSelector((state: State) => state.userSignIn)
    const { success, error, order, loading } = useSelector((state: State) => state.placeOrder)
    const checkoutHandler = () => {
        dispatch(placeOrderAction(
            cartItems,
            shippingAddress,
            paymentMethod,
            shippingFee,
            tax,
            totalPrice,
            user.token
        ))
        // console.log(

        //     cartItems,
        //     shippingAddress,
        //     paymentMethod,
        //     shippingFee,
        //     tax,
        //     totalPrice,
        //     user.token
        // );

    }

    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`)
            dispatch({ type: PlaceOrder.RESET })
            dispatch({ type: AddToCart.RESET })

        }
    }, [success, navigate, dispatch])

    useEffect(() => {

        if (!shippingAddress.address) {
            navigate('/shipping')
        } else if (paymentMethod === "") {
            navigate('/payment')
        }

        dispatch(calculatePriceAction())
    }, [dispatch, shippingAddress, paymentMethod, navigate])


    return (
        <Container>
            <Row className={'justify-content-md-center'}>
                <CheckoutSteps signIn shipping payment order />
                <Col xs={12} md={8}>
                    {loading &&
                        <Loader />
                    }
                    {error !== "" &&
                        <Alert variant={'danger'}>{error} </Alert>
                    }
                    {cartItems.length === 0 ? (
                        <Alert>
                            Your cart is empty <Link to='/'>Go Back</Link>
                        </ Alert>
                    ) : (
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h4>Shipping Address</h4>
                                {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.country}, {shippingAddress.postalCode}

                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h4>Payment Method</h4>
                                Method: {paymentMethod}

                            </ListGroup.Item>
                            {cartItems.map((item) => (
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
                                    <Col>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${tax}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping Fee</Col>
                                    <Col>${shippingFee}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${(totalPrice).toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <Button
                                type={'button'}
                                className={'btn btn-block'}
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Chekout
                            </Button>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>

    );
};

export default PlaceOrderScreen;
