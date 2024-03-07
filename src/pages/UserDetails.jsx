import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';
import ApiService from '../services/index';
import BookComponent from '../components/BookCard';

function UserDetails() {
    const location = useLocation();
    const [userBooks, setUserBooks] = useState([]);
    const params = useParams();

    const fetchUserBooks = () => {
        ApiService.GetUserBooks({ userId: params.id }).then((res) => {
            const data = res.data.userBooks;
            setUserBooks(data);
        });
    };

    useEffect(() => {
        fetchUserBooks();
    }, []);

    return (
        <Container className='m-auto mt-4'>
            <Row>
                <Col>
                    <img src={location?.state?.image} alt="User" />
                </Col>
                <Col md={4}>
                    <h2>User Details</h2>
                    <div>
                        <p>Username: {location?.state?.username}</p>
                        <p>Email: {location?.state?.email}</p>
                    </div>
                </Col>
            </Row>
            <hr />
            <section className='mt-4'>
                {userBooks.length > 0 ? (
                    userBooks.map((book, index) => (
                        <BookComponent
                            key={index} // Provide a unique key for each book component
                            title={book.bookId.title}
                            ISBN={book.bookId.ISBN}
                            author={book.bookId.author}
                            description={book.bookId.description}

                        />
                    ))
                ) : <p>No books available</p>}
            </section>
        </Container>
    );
}

export default UserDetails;