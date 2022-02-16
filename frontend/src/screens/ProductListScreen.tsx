import React, { useEffect } from 'react'
import { Alert, Button, Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { createProductAction, deleteProductAction, listProducts } from '../actions/productAction'
import Loader from '../components/Loader'
import { State } from '../reducers'
import { product } from '../interfaces'
import { ProductCreate } from '../constants'

type Props = {}

const ProductListScreen = (props: Props) => {

    const dispatch = useDispatch()
    const { products, error, loading } = useSelector((state: State) => state.productList)

    const { product, success: successCreated } = useSelector((state: State) => state.createProduct)
    const { user } = useSelector((state: State) => state.userSignIn)
    const { success: successDelete } = useSelector((state: State) => state.delteProduct)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/signIn')
        } else if (!user.isAdmin) {
            navigate('/')
        }
        
        if (successCreated){
            navigate(`/admin/product/${product._id}/edit`)
            dispatch({type: ProductCreate.RESET})
        }
        dispatch(listProducts())
    }, [dispatch, navigate, user, successDelete, successCreated])


    const deleteHandler = (id: string) => {
        dispatch(deleteProductAction(id))
    }
    const createProductHandler = () => {
        dispatch(createProductAction())

    }

    return (
        <Container>

            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col>
            </Row>

            {
                loading
                    ? <Loader />
                    : error !== ""
                        ? <Alert variant={'danger'}>{error}</Alert>
                        :
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th>CATEGORY</th>
                                    <th>BRAND</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products && products.map((product: product) => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>

                                        <td>
                                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>
                                            <Button
                                                variant='danger'
                                                className='btn-sm'
                                                onClick={() => deleteHandler(product._id)}
                                            >
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </Table>
            }
        </Container>
    )
}

export default ProductListScreen