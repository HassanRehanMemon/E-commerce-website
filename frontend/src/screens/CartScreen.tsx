import React, { useEffect } from 'react';
import { Row, Col, ListGroup, Image, Form, Button, Alert, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { cartAddItemAction, cartRemoveItemAction } from '../actions/cartAction';
import { State } from '../reducers';

type Props = {};

const CartScreen = (props: Props) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { search } = useLocation()
  const qty = search.split('=')[1]
  const dispatch = useDispatch();
  const { cartItems  } = useSelector((state: State) => state.cart)
  console.log(cartItems, id, qty);

  useEffect(() => {
    if (id) {
      dispatch(cartAddItemAction(id, Number(qty)))
    }

  }, [dispatch, id, qty])

  const removeFromCartHandler = (product: string) => {
    dispatch(cartRemoveItemAction(product))

  }
  
  const checkoutHandler = () => {
    navigate('/signIn?redirect=/shipping') 
  }

  return (
      <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Alert>
            Your cart is empty <Link to='/'>Go Back</Link>
          </ Alert>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product_id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product_id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price.toFixed(2)}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          cartAddItemAction(item.product_id, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product_id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant={'flush'}>
            <ListGroup.Item className={'justify-content-center text-center'}>
              <h2>
                SUB-TOTAL
              </h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items: </Col>
                <Col>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Price: </Col>
                <Col>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            
            <Button
            type={'button'}
            className={'btn btn-block'}
            disabled = {cartItems.length === 0}
            onClick={checkoutHandler}
            >
              Chekout
            </Button>

          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
};

export default CartScreen;
