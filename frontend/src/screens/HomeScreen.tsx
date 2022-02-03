import React from 'react';
import products from '../products';
import { Row, Col, Container } from 'react-bootstrap'
import Product from '../components/Product';

const HomeScreen = () => {
    return (
        <Container>

            <Row>
                {
                    products.map((product) => {
                        return (
                            <Col sm={12} md={6} lg={4} xl={3}>
                                <Product key={product._id} product={JSON.parse(JSON.stringify(product))} />
                            </Col>
                        )
                        // return <Product />
                    })
                }
            </Row>


        </Container>
    );
};

export default HomeScreen;
