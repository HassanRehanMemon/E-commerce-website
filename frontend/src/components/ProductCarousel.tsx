import React, { useEffect } from 'react'
import { Alert, Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { productCarouselAction } from '../actions/productAction';
import { State } from '../reducers';
import Loader from './Loader';

type Props = {}

const ProductCarousel = (props: Props) => {


    const dispatch = useDispatch();
    const productCarouselList = useSelector((state: State) => state.productCarousel)
    // const [products, setProduct] = useState<any[]>([]);
    const { products, error, loading } = productCarouselList

    useEffect(() => {
        dispatch(productCarouselAction())

    }, [dispatch,])

    return (
        loading ? (
            <Loader />
        ) : error ? (
            <Alert variant='danger'>{error}</Alert>
        ) : (
            <Carousel pause='hover' className='bg-dark' indicators={false}>
                {products && products.map((product) => (
                    <Carousel.Item key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <Image src={product.image} alt={product.name} fluid />
                            <Carousel.Caption className='carousel-caption'>
                                <h2>
                                    {product.name} (${product.price})
                                </h2>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        )
    )
}

export default ProductCarousel