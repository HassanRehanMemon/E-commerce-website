import React from 'react';
import { Button, Row, Col } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';

const ProductScreen = () => {
    const {id} =  useParams();
    return (
        <div>
            <Link to='/' className="btn btn-light my-3">Go Back</Link>
            <h3>{id}</h3>
        </div>
    );
};

export default ProductScreen;
