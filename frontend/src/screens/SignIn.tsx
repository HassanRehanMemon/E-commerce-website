import React, { useEffect, useState } from 'react';
import {  Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { userSignInAction } from '../actions/userAction';
import Loader from '../components/Loader';
import { State } from '../reducers';

type Props = {};


const SignIn = (props: Props) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const { user, loading, error } = useSelector((state: State) => state.userSignIn)
  const navigate = useNavigate()
  const location = useLocation()
  const redirect = location.search.split('=')[1]

  useEffect(() => {

    if (user !== null) {
      console.log(redirect);
      navigate(redirect ?? '/')

    }
  }, [user, redirect, navigate])


  console.log('is there any problem');
  const signInSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(userSignInAction(email, password))
  }

  return (
    <>
      <Row className={'justify-content-md-center'}>
        <Col xs={12} md={8}>
          {error !== "" &&
            <Alert variant={'danger'}>{error} </Alert>
          }
          {loading && <Loader />}
          <Form onSubmit={signInSubmitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email}
                onChange={(val) => setEmail(val.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password}
                onChange={(val) => setPassword(val.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" >
              Submit
            </Button>
          </Form>
          <Row className='py-3'>
            <Col>
              Don't have Account?{' '}
              <Link to={redirect ? `/signUp?redirect=${redirect}` : '/signUp'}>
                Sign Up
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default SignIn;
