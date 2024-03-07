import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
const BookComponent = ({ title, ISBN, author, description, showButton, onClick }) => {



    return (
        <Card className='mt-2'>
            <Card.Body>
                {showButton && <Button onClick={onClick}>Add Collection +</Button>}
                <Card.Title>Title: {title}</Card.Title>
                <Card.Text>ISBN: {ISBN}</Card.Text>
                <Card.Text>Author: {author}</Card.Text>
                <Card.Text>Description: {description}</Card.Text>
            </Card.Body>
        </Card>
    );
};

BookComponent.propTypes = {
    title: PropTypes.string.isRequired,
    ISBN: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    showButton: PropTypes.bool, // New prop to indicate whether the button should be shown
    onClick: PropTypes.func
};

export default BookComponent;
