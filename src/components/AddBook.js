import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const AddBookForm = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [ISBN, setIsbn] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title: title, ISBN: ISBN, author: author, description: description });
        setTitle('');
        setAuthor('');
        setDescription('');
        setIsbn('');
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="author">
                <Form.Label>Author</Form.Label>
                <Form.Control type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="ISBN">
                <Form.Label>ISBN</Form.Label>
                <Form.Control type="text" value={ISBN} onChange={(e) => setIsbn(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">Add Book</Button>
        </Form>
    );
};

export default AddBookForm;
