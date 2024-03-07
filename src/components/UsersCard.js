import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UserComponent = ({ email, image, updatedAt, username, id }) => {
    const navigate = useNavigate();
    const navigateDetails = useCallback(() => {
        navigate(`/user/${id}/books`, { state: { email, image, username } });
    }, [id, email, image, username]); // Include email, image, and username in the dependency array

    return (
        <Row className='border' onClick={navigateDetails} style={{ cursor: 'pointer' }}>
            <Col md={4}>
                <img src={image} alt="User" />
            </Col>
            <Col>
                <h2>User Details</h2>
                <div>
                    <p>Username: {username}</p>
                    <p>Email: {email}</p>
                    <p>Last Updated: {updatedAt}</p>
                </div>
            </Col>
        </Row>
    );
};

UserComponent.propTypes = {
    email: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    id: PropTypes.string
};

export default UserComponent;
