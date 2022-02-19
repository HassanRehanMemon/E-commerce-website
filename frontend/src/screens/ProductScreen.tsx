import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Image, ListGroup, Card, Alert, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { AddReivewAction, listDetailProduct } from '../actions/productAction';
import Loader from '../components/Loader';
import Rating from '../components/Rating';
import { State } from '../reducers';
import { useNavigate } from 'react-router-dom'
import { AddReview } from '../constants';

const ProductScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState('')
    const [comment, setComment] = useState('')
    console.log(qty)
    const dispatch = useDispatch()
    const { product, error, loading } = useSelector((state: State) => state.productDetail)
    const { loading: reviewLoading, error: reviewError, success: reviewSuccess } = useSelector((state: State) => state.addReview)
    const { user } = useSelector((state: State) => state.userSignIn)


    useEffect(() => {
        if (!product._id || product._id !== id || reviewSuccess) {

            dispatch(listDetailProduct(id))
            dispatch({ type: AddReview.RESET })
        }


    }, [dispatch, id, reviewSuccess])

    const submitHandler = (e: React.FormEvent) => {
        if (id) {

            dispatch(AddReivewAction(id, rating, comment))
        }

    }


    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`)
    }
    return (
        <div>
            <Link to='/' className="btn btn-dark my-3">Go Back</Link>
            {
                loading
                    ? <Loader />
                    : error !== ""
                        ?
                        <Alert variant='danger'>{error}</Alert>
                        : (
                            <>
                                <Row>
                                    <Col md={6}>
                                        <Image src={product.image} fluid />
                                    </Col>
                                    <Col md={3}  >
                                        <ListGroup variant="flush">
                                            <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
                                            <ListGroup.Item><Rating rating={product.rating} text={`${product.numReviews} reviews`} /></ListGroup.Item>
                                            <ListGroup.Item>Price ${parseFloat(product.price).toFixed(2)}</ListGroup.Item>
                                            <ListGroup.Item>{product.description}</ListGroup.Item>
                                        </ListGroup>
                                    </Col>
                                    <Col md={3}>

                                        <ListGroup variant="flush">
                                            <Card>

                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Price: </Col>
                                                        <Col>${(Number(product.price) * qty).toFixed(2)}</Col>
                                                    </Row>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Status: </Col>
                                                        <Col>{product.countInStock > 0 ? 'In-stock' : 'Out of stock'}</Col>
                                                    </Row>
                                                </ListGroup.Item>
                                                {
                                                    product.countInStock > 0 &&
                                                    <ListGroup.Item>
                                                        <Row >
                                                            <Col>Quantity:</Col>
                                                            <Col>
                                                                <Form.Control
                                                                    as='select'
                                                                    value={qty}
                                                                    onChange={(e) => setQty(Number(e.target.value))}
                                                                >
                                                                    {[...Array(product.countInStock).keys()].map(
                                                                        (x) => (
                                                                            <option key={x + 1} value={x + 1}>
                                                                                {x + 1}
                                                                            </option>
                                                                        )
                                                                    )}
                                                                </Form.Control>
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                }
                                                <ListGroup.Item>
                                                    <Button
                                                        className="btn-block"
                                                        disabled={product.countInStock === 0}
                                                        onClick={addToCartHandler}
                                                    >
                                                        Add to Cart
                                                    </Button>
                                                </ListGroup.Item>

                                            </Card>
                                        </ListGroup>
                                    </Col>
                                </Row>
                                <Row className='justify-content-md-center mt-5'>
                                    <Col md={8} lg={8}>
                                        <h2>Reviews</h2>
                                        {product.reviews.length === 0 && <Alert>No Reviews</Alert>}
                                        <ListGroup variant='flush'>
                                            {product.reviews.map((review: any) => (
                                                <ListGroup.Item key={review._id}>
                                                    <strong>{review.name}</strong>
                                                    <Rating rating={review.rating} />
                                                    {/* <p>{review.createdAt.substring(0, 10)}</p> */}
                                                    <p>{review.comment}</p>
                                                </ListGroup.Item>
                                            ))}
                                            <ListGroup.Item>
                                                <h2>Write a Customer Review</h2>
                                                {reviewSuccess && (
                                                    <Alert variant='success'>
                                                        Review submitted successfully
                                                    </Alert>
                                                )}
                                                {reviewLoading && <Loader />}
                                                {reviewError && (
                                                    <Alert variant='danger'>{reviewError}</Alert>
                                                )}
                                                {user ? (
                                                    <Form onSubmit={submitHandler}>
                                                        <Form.Group controlId='rating'>
                                                            <Form.Label>Rating</Form.Label>
<Form.Control
                                                                as='select'
                                                                value={rating}
                                                                onChange={(e) => setRating(e.target.value)}
                                                            >
                                                                <option value=''>Select...</option>
                                                                <option value='1'>1 - Poor</option>
                                                                <option value='2'>2 - Fair</option>
                                                                <option value='3'>3 - Good</option>
                                                                <option value='4'>4 - Very Good</option>
                                                                <option value='5'>5 - Excellent</option>
                                                            </Form.Control>
                                                        </Form.Group>
                                                        <Form.Group controlId='comment'>
                                                            <Form.Label>Comment</Form.Label>
                                                            <Form.Control
                                                                as='textarea'
                                                                // rows=3
                                                                value={comment}
                                                                onChange={(e) => setComment(e.target.value)}
                                                            ></Form.Control>
                                                        </Form.Group>
                                                        <Button
                                                            disabled={reviewLoading}
                                                            type='submit'
                                                            variant='primary'
                                                        >
                                                            Submit
                                                        </Button>
                                                    </Form>
                                                ) : (
                                                    <Alert>
                                                        Please <Link to='/login'>sign in</Link> to write a review{' '}
                                                    </Alert>
                                                )}
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Col>
                                </Row>
                            </>
                        )
            }
        </div>
    );
};

export default ProductScreen;
