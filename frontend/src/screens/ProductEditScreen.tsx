
import React, { useEffect, useState } from 'react'
import { Alert, Button, Container, Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { listDetailProduct, ProductEditAction } from '../actions/productAction'
import Loader from '../components/Loader'
import { ProductDetail, ProductEdit } from '../constants'
import { State } from '../reducers'

type Props = {}

const ProductEditScreen = (props: Props) => {
    const { id } = useParams()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState(0)
    const [countInStock, setCountInStock] = useState(0)
    const [image, setImage] = useState('')

    const dispatch = useDispatch()
    const { product, error: productError, loading: productLoading } = useSelector((state: State) => state.productDetail)

    // const { user: userDetail, loading: loadingDetail, error: errorDetail } = useSelector((state: State) => state.userDetail)
    const { user } = useSelector((state: State) => state.userSignIn)
    const { success: successEdit } = useSelector((state: State) => state.productEdit)
    const navigate = useNavigate()


    useEffect(() => {

        if (!user) {
            navigate('/signIn')
        } else if (!user.isAdmin) {
            navigate('/')
        }
        if (successEdit) {
            dispatch({ type: ProductDetail.RESET })
            dispatch({ type: ProductEdit.RESET })
            navigate('/admin/products')
        } else {

            if (id && (!product.name || product._id !== id)) {
                dispatch(listDetailProduct(id))
            } else {
                console.log(`loaded ${product}`)
                setName(product.name)
                setPrice(Number(product.price))
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(Number(product.countInStock))
                setDescription(product.description)
            }
        }


    }, [user, navigate, dispatch, product, successEdit])

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault()
        if (id)
            dispatch(ProductEditAction(
                id,
                name,
                price,
                description,
                // image,
                brand,
                category,
                countInStock,
            ))
    }


    return (
        <>
            <Link to='/admin/products' className='btn btn-light my-3'>
                Go Back
            </Link>
            <Container>
                <Row className={'justify-content-md-center'}>
                    <Col md={8} xs={12}>


                        <h1>Edit Product</h1>
                        {/* {loadingUpdate && <Loader />} */}
                        {/* {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>} */}
                        {productLoading ? (
                            <Loader />
                        ) : productError ? (
                            <Alert variant='danger'>{productError}</Alert>
                        ) : (
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='name'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type='name'
                                        placeholder='Enter name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='price'>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type='number'
                                        placeholder='Enter price'
                                        value={price}
                                        onChange={(e) => setPrice(Number(e.target.value))}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='formFile'>
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control
                                        type='file'
                                        placeholder='Enter image url'
                                        defaultValue={image}
                                        // value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                    ></Form.Control>
                                    {/* <Form.File
                                        id='image-file'
                                        label='Choose File'
                                        custom
                                        // onChange={uploadFileHandler}
                                    ></Form.File> */}
                                    {/* {uploading && <Loader />} */}
                                </Form.Group>

                                <Form.Group controlId='brand'>
                                    <Form.Label>Brand</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter brand'
                                        value={brand}
                                        onChange={(e) => setBrand(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='countInStock'>
                                    <Form.Label>Count In Stock</Form.Label>
                                    <Form.Control
                                        type='number'
                                        placeholder='Enter countInStock'
                                        value={countInStock}
                                        onChange={(e) => setCountInStock(Number(e.target.value))}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='category'>
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter category'
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='description'>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter description'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Button type='submit' variant='primary'>
                                    Update
                                </Button>
                            </Form>
                        )}

                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ProductEditScreen