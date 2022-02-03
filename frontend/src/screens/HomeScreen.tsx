import React from 'react';
import { Row, Col, Container } from 'react-bootstrap'
import Product from '../components/Product';
import { useEffect, useState } from 'react';
import axios, {AxiosResponse} from 'axios'

const HomeScreen = () => {
    
    const [products, setProduct] = useState<any[]>([]);
    
    useEffect(()=>{
        axios.get('/api/products').then(({data})=>{
            // console.log(data);
            setProduct(data)
        })
    }, [])

    return (
        <Container>

            <Row>
                {
                    products.map((product) => {
                        return (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={JSON.parse(JSON.stringify(product))} />
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
