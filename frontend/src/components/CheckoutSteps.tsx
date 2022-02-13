import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

type Props = {
    signIn?: boolean,
    shipping?: boolean,
    payment?: boolean,
    order?: boolean,

};

const CheckoutSteps = (props: Props) => {
    return (
        <Nav className={'justify-content-center mb-3'}>
            <Nav.Item>
                {
                    props.signIn ? (
                        <LinkContainer to='/signIn'>
                            <Nav.Link> Sign In</Nav.Link>
                        </LinkContainer>
                    ) : (

                        <Nav.Link disabled> Sign In</Nav.Link>
                    )

                }
            </Nav.Item>
            <Nav.Item>
                {
                    props.shipping ? (
                        <LinkContainer to='/shipping'>
                            <Nav.Link>Shipping</Nav.Link>
                        </LinkContainer>
                    ) : (

                        <Nav.Link disabled>Shipping</Nav.Link>
                    )

                }
            </Nav.Item>
            <Nav.Item>
                {
                    props.payment ? (
                        <LinkContainer to='/payment'>
                            <Nav.Link>Payment</Nav.Link>
                        </LinkContainer>
                    ) : (

                        <Nav.Link disabled>Payment</Nav.Link>
                    )

                }
            </Nav.Item>
            <Nav.Item>
                {
                    props.order ? (
                        <LinkContainer to='/'>
                            <Nav.Link>Order</Nav.Link>
                        </LinkContainer>
                    ) : (

                        <Nav.Link disabled>Order</Nav.Link>
                    )

                }
            </Nav.Item>
        </Nav>
    );
};

export default CheckoutSteps;
