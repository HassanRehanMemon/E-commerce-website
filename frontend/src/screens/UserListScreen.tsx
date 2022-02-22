import React, { useEffect } from 'react'
import { Alert, Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { userDeleteAction, userListAction } from '../actions/userAction'
import Loader from '../components/Loader'
import { State } from '../reducers'

type Props = {}

const UserListScreen = (props: Props) => {

    const dispatch = useDispatch()
    const { users, loading, error } = useSelector((state: State) => state.userList)
    const { user } = useSelector((state: State) => state.userSignIn)
    const { success: successDelete } = useSelector((state: State) => state.userDelete)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/signIn')
        } else if (!user.isAdmin) {
            navigate('/')
        }
        dispatch(userListAction())
    }, [dispatch, navigate, user, successDelete])


    const deleteHandler = (id: string) => {
        dispatch(userDeleteAction(id))
    }

    return (
        <>

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
                                    <th>EMAIL</th>
                                    <th>ADMIN</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user: any) => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {user.isAdmin ? (
                                                <i className='fas fa-check' style={{ color: 'green' }}></i>
                                            ) : (
                                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                            )}
                                        </td>

                                        <td>
                                            <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>
                                            <Button
                                                variant='danger'
                                                className='btn-sm'
                                                onClick={() => deleteHandler(user._id)}
                                            >
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </Table>
            }
        </>
    )
}

export default UserListScreen