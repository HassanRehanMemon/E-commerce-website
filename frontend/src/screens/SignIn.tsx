import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

type Props = {};


const SignIn = (props: Props) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const signInSubmitHandler = (e : React.FormEvent) => {
    e.preventDefault()
    console.log(email, password);

  }

  return (
    <Container>
      <Row className={'justify-content-md-center'}>
        <Col xs={12} md={8}>
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
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
