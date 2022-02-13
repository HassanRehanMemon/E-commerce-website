import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { saveShippingAddressAction } from '../actions/cartAction';
import CheckoutSteps from '../components/CheckoutSteps';
import { State } from '../reducers';

type Props = {};

const ShippingScreen = (props: Props) => {

    const { shippingAddress } = useSelector((state: State) => state.cart)
    const [address, setAddress] = useState(shippingAddress.address ?? "")
    const [city, setCity] = useState(shippingAddress.city ?? "")
    const [country, setCountry] = useState(shippingAddress.country ?? "")
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode ?? "")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const shipFormHandler = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(saveShippingAddressAction({ address, city, country, postalCode }))
        navigate('/payment')


    }

    return (

        <Container>
            <Row className={'justify-content-md-center'}>
                <Col xs={12} md={8}>
                    <CheckoutSteps signIn shipping />
                    <Form onSubmit={shipFormHandler}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Enter Address" value={address}
                                onChange={(val) => setAddress(val.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" placeholder="Enter City" value={city}
                                onChange={(val) => setCity(val.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Country</Form.Label>
                            <Form.Control type="text" placeholder="Enter Country" value={country}
                                onChange={(val) => setCountry(val.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control type="text" placeholder="Enter Postal Code" value={postalCode}
                                onChange={(val) => setPostalCode(val.target.value)} />
                        </Form.Group>

                        <Button variant="primary" type="submit" >
                            NEXT
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ShippingScreen;
