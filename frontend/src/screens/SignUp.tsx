import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import {  userSignUpAction } from '../actions/userAction';
import Loader from '../components/Loader';
import { State } from '../reducers';

type Props = {};

const SignUp = (props: Props) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const dispatch = useDispatch()
  const { user, loading, error } = useSelector((state: State) => state.userSignUp)
  const navigate = useNavigate()
  const location = useLocation()
  const redirect = location.search.split('=')[1]
  useEffect(() => {

    if (user !== null) {
      navigate(redirect ?? '/')

    }
  }, [user, redirect, navigate])


  console.log('is there any problem');
  const signUpSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === confirmPassword){

      console.log(name, email, password, confirmPassword);
      dispatch(userSignUpAction(name, email, password))
    }
  }

  return (
    <Container>
      <Row className={'justify-content-md-center'}>
        <Col xs={12} md={8}>
          {error !== "" &&
            <Alert variant={'danger'}>{error} </Alert>
          }
          {loading && <Loader />}
          <Form onSubmit={signUpSubmitHandler}>
            <Form.Group className="mb-3" >
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" value={name}
                onChange={(val) => setName(val.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email}
                onChange={(val) => setEmail(val.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password}
                onChange={(val) => setPassword(val.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword}
                onChange={(val) => setConfirmPassword(val.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" >
              Submit
            </Button>
          </Form>
          <Row className='py-3'>
            <Col>
              Have an Account?{' '}
              <Link to={redirect ? `/signIn?redirect=${redirect}` : '/signIn'}>
                Sign In
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};


export default SignUp;
