import React from 'react';
import products from '../products';
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product';

const HomeScreen = () => {
    return (
        <Row>
            {

                products.map((product) => {
                    return <Product  key={product.name} product={JSON.parse(JSON.stringify(product))} />
                    // return <Product />
                })
            }
        </Row>


    );
};

export default HomeScreen;
