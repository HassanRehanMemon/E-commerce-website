import React from 'react';
import { Row, Col, Container } from 'react-bootstrap'
import Product from '../components/Product';
import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import axios, {AxiosResponse} from 'axios'
import {State } from '../reducers'
import { listProducts } from '../actions/productAction';

const HomeScreen = () => {
    
    const dispatch = useDispatch();
    const productList = useSelector((state :State) => state.productList)
    // const [products, setProduct] = useState<any[]>([]);
    const {products, error, loading } =  productList
    
    useEffect(()=>{
        dispatch(listProducts())
        // axios.get('/api/products').then(({data})=>{ console.log(data);
        //     // setProduct(data)
        // })
        
    }, [dispatch])
    console.log(products);

    return (
        <Container>

            <Row>
                {loading &&
                    products.map((product: { _id: React.Key | null | undefined; }) => {
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
