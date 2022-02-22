import React, { useEffect, useState } from 'react'
import { Alert, Button, Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { userEditAction, userEditDetailAction } from '../actions/userAction'
import Loader from '../components/Loader'
import { UserEdit } from '../constants'
import { State } from '../reducers'

type Props = {}

const UserEditScreen = (props: Props) => {
    const { id } = useParams()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()
    const { user: userDetail, loading: loadingDetail, error: errorDetail } = useSelector((state: State) => state.userDetail)
    const { user } = useSelector((state: State) => state.userSignIn)
    const { success } = useSelector((state: State) => state.userEdit)
    const navigate = useNavigate()


    useEffect(() => {

        if (!user) {
            navigate('/signIn')
        } else if (!user.isAdmin) {
            navigate('/')
        }
        if (success) {
            dispatch({ type: UserEdit.RESET })
            navigate('/admin/users')
        } else {

            if (id && (!userDetail.name || userDetail._id !== id)) {
                dispatch(userEditDetailAction(id))
            } else {
                setName(userDetail.name)
                setEmail(userDetail.email)
                setIsAdmin(userDetail.isAdmin)

            }
        }


    }, [user, navigate, dispatch, userDetail, id, success])

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(userEditAction(userDetail._id, name, email, isAdmin))
    }


    return (
        <>
            <Link to='/admin/users' className='btn btn-light my-3'>
                Go Back
            </Link>
            <>
                <Row className={'justify-content-md-center'}>
                    <Col md={8} xs={12}>


                        <h1>Edit User</h1>
                        {/* {loadingUpdate && <Loader />} */}
                        {/* {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>} */}
                        {loadingDetail ? (
                            <Loader />
                        ) : errorDetail ? (
                            <Alert variant='danger'>{errorDetail}</Alert>
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

                                <Form.Group controlId='email'>
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type='email'
                                        placeholder='Enter email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='isadmin'>
                                    <Form.Check
                                        type='checkbox'
                                        label='Is Admin'
                                        checked={isAdmin}
                                        onChange={(e) => setIsAdmin(e.target.checked)}
                                    ></Form.Check>
                                </Form.Group>

                                <Button type='submit' variant='primary'>
                                    Update
                                </Button>
                            </Form>
                        )}

                    </Col>
                </Row>
            </>
        </>
    )
}

export default UserEditScreen