import React from 'react';
import { Row, Col, Container, Alert } from 'react-bootstrap'
import Product from '../components/Product';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../reducers'
import { listProducts } from '../actions/productAction';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { Link, useParams } from 'react-router-dom';

const HomeScreen = () => {

    const { keyword } = useParams()
    const dispatch = useDispatch();
    const productList = useSelector((state: State) => state.productList)
    // const [products, setProduct] = useState<any[]>([]);
    const { products, error, loading } = productList

    useEffect(() => {
        dispatch(listProducts(keyword))

    }, [dispatch, keyword])

    return (
        <Container>
            <Meta title={'HR-store'} description={'Portfolio'} />

            {loading ? <Loader />
                : error !== ""
                    ?
                    <Alert variant={'danger'} > {error} </Alert>
                    : products?.length === 0 ?
                        <>

                            <Row>
                                <Link to='/' className="btn btn-dark my-3">Go Back</Link>
                            </Row>
                            <Row>
                                <h3>No products found: Try other keywords</h3>
                            </Row>
                        </>

                        :
                        <Row>
                            {
                                products &&
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
            }


        </Container>
    );
};

export default HomeScreen;
