
import React, { useEffect } from 'react'
import { Alert, Button, Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../components/Loader'
import { State } from '../reducers'
import { orderListAsAdminAction } from '../actions/orderAction'

type Props = {}

const OrderListScreen = (props: Props) => {

    const dispatch = useDispatch()
    const { orders, error, loading } = useSelector((state: State) => state.orderListAsAdmin)

    const { user } = useSelector((state: State) => state.userSignIn)

    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/signIn')
        } else if (!user.isAdmin) {
            navigate('/')
        }

        dispatch(orderListAsAdminAction())
    }, [dispatch, navigate, user])


    // const deleteHandler = (id: string) => {
    //     dispatch(deleteProductAction(id))
    // }
    // const createProductHandler = () => {
    //     dispatch(createProductAction())

    // }

    return (
        <Container>

            <Row className='align-items-center'>
                <Col>
                    <h1>Orders</h1>
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
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders?.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.totalPrice.toFixed(2)}</td>
                                        <td>
                                            {order.isPaid ? (
                                                order.paidAt.substring(0, 10)
                                            ) : (
                                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                            )}
                                        </td>
                                        <td>
                                            {order.isDelivered ? (
                                                order.deliveredAt.substring(0, 10)
                                            ) : (
                                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                            )}
                                        </td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button className='btn-sm' variant='light'>
                                                    Details
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
            }
        </Container>
    )
}

export default OrderListScreen