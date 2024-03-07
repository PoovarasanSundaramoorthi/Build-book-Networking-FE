import React, { useEffect, useState } from 'react';
import AddBookForm from '../components/AddBook';
import { Button, Container, Form, Tab, Tabs } from 'react-bootstrap';
import ApiService from '../services/index';
import BookComponent from '../components/BookCard';
import UserComponent from '../components/UsersCard';
import { useParams } from 'react-router-dom';

function UserDashboard() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookSearch, setBookSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [userBooks, setUserBooks] = useState([]);
  const params = useParams();

  const handleAddBook = async (formData) => {
    try {
      // Send form data to the backend API endpoint
      const response = await ApiService.AddBook(formData,); // Await the result of the API call
      if (response.status === 200) { // Assuming the server returns status 201 for successful creation
        // You can perform further actions here, such as displaying a success message to the user
      } else {
        console.error('Failed to add book:', response.statusText);
        // Handle error response from the server
      }
    } catch (error) {
      console.error('Error adding book:', error.message);
      // Handle network errors or other exceptions
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await ApiService.GetAllBooks(bookSearch);
      const data = response.data.user;
      setBooks(data);
      // Process the response as needed
    } catch (error) {
      console.error('Error fetching books:', error);
      // Handle errors
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await ApiService.GetAllUsers(userSearch);
      const data = response.data.user;
      setUsers(data);
      // Process the response as needed
    } catch (error) {
      console.error('Error fetching books:', error);
      // Handle errors
    }
  };

  const fetchUserBooks = () => {
    ApiService.GetUserBooks({ userId: params.userId }).then((res) => {
      const data = res.data.userBooks;
      setUserBooks(data);
    });
  };

  useEffect(() => {
    fetchBooks();
    fetchUsers();
    fetchUserBooks();
  }, []);

  const AddBook = (bookId) => {
    ApiService.AddUserBooks({ bookId: bookId, userId: params.userId });
  };

  return (
    <Container className='m-auto'>
      <Tabs
        defaultActiveKey="profile"
        id="fill-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey="home" title="Book List">
          <Form>
            <Form.Control
              title='search'
              value={bookSearch}
              onChange={(e) => setBookSearch(e.target.value)} // Update bookSearch state on change
              placeholder="Search for books"
            />
            <Button className='mt-2' variant="warning" onClick={fetchBooks}>Search Books</Button>
          </Form>
          {books.length > 0 ? (
            books.map((book, index) => (
              <BookComponent
                key={index} // Provide a unique key for each book component
                title={book.title}
                ISBN={book.ISBN}
                author={book.author}
                description={book.description}
                showButton={true}
                onClick={() => AddBook(book.id)}
              />
            ))
          ) : (
            <p>No books available</p>
          )}
        </Tab>
        <Tab eventKey="profile" title="Add Book">
          <Form>
            <Form.Control title='search' onChange={setBookSearch} />
          </Form>
          <AddBookForm onSubmit={handleAddBook} />
        </Tab>
        <Tab eventKey="longer-tab" title="Search Users">
          <Form>
            <Form.Control
              title='search'
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)} // Update userSearch state on change
              placeholder="Search for users"
            />
            <Button className='mt-2' variant="warning" onClick={fetchUsers}>Search Users</Button>
          </Form>

          {users.length > 0 ? (
            users.map((user, index) => (
              <UserComponent key={index} email={user.email} image={user.image} updatedAt={user.updatedAt} username={user.username} id={user.id} />
            ))
          ) : (
            <p>No Users Found</p>
          )}
        </Tab>
        <Tab eventKey="my-tab" title="My Books">
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
        </Tab>
      </Tabs>

    </Container >
  );
}

export default UserDashboard;