import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap';

export class Shop extends Component {
    render() {
        const {name, picture, email, city} = this.props;
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={picture} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        <p>Contact us at : {email}</p>
                        <p>Or come visit us at : {city}</p>
                </Card.Text>
                    <Button variant="primary">like</Button>
                    <Button variant="danger">dislike</Button>
                </Card.Body>
            </Card>
        )
    }
}

export default Shop
