import React, { useEffect } from 'react'
import { Alert, Button, Col, Table, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { orderListAction } from '../actions/orderAction'
import Loader from '../components/Loader'
import { State } from '../reducers'

type Props = {}

const ProfileScreen = (props: Props) => {
    const dispatch = useDispatch()
    const { orders, loading: orderLoading, error: orderError } = useSelector((state: State) => state.orderList)
    const { user } = useSelector((state: State) => state.userSignIn)
    console.log(orders);

    useEffect(() => {
        if (!orders)
            dispatch(orderListAction(user.token))

    }, [])


    return (
        <>
            <Row>
                <Col md={3}>
                    Under Construction
                </Col>
                <Col md={9}>
                    {
                        orderLoading ? <Loader />
                            : orderError !== "" ? <Alert>{orderError}</Alert>
                                :

                                orders?.length === 0 ?
                                    "empty" :
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

                </Col>
            </Row>
        </>
    )
}

export default ProfileScreen