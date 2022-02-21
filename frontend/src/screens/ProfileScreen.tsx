import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Table, Row, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { orderListAction } from '../actions/orderAction'
import Loader from '../components/Loader'
import { State } from '../reducers'

type Props = {}

const ProfileScreen = (props: Props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { orders, loading: orderLoading, error: orderError } = useSelector((state: State) => state.orderList)
    const { user } = useSelector((state: State) => state.userSignIn)
    console.log(orders);

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
        if (!orders)
            dispatch(orderListAction(user.token))

    }, [dispatch, orders, user, user.token, navigate])

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault()
        window.alert('Have not developed update yet ....')
    }


    return (
        <>
            <Row>
                <Col md={3}>
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

                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Enter password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='confirmPassword'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Confirm password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
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