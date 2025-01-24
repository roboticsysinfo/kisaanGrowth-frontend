import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../utils/api';

const FarmerRegister = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [aadharCard, setAadharCard] = useState('');
    const [uploadAadharCard, setUploadAadharCard] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('phoneNumber', phoneNumber);
        formData.append('address', address);
        formData.append('aadharCard', aadharCard);
        formData.append('uploadAadharCard', uploadAadharCard);  // Add the file here

        setLoading(true);

        try {
            const response = await api.post('/farmer/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',  // Set the correct content type
                },
            });
            toast.success(response.data.message);
            navigate('/farmer/login'); // Redirect to login page after successful registration
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };



    return (
        <Container className="mt-5 pt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="text-center mb-4">Farmer Register</h2>
                    <Form onSubmit={handleRegister} encType="multipart/form-data">
                        <Form.Group className="my-5" controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="my-5" controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="my-5" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="my-5" controlId="formPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="my-5" controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="my-5" controlId="formAadharCard">
                            <Form.Label>Aadhar Card Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Aadhar Card Number"
                                value={aadharCard}
                                onChange={(e) => setAadharCard(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="my-5" controlId="formuploadAadharCard">
                            <Form.Label>Upload Aadhar Card</Form.Label>
                            <Form.Control
                                type="file"
                                placeholder="Upload Aadhar Card"
                                id="uploadAadharCard"
                                onChange={(e) => setUploadAadharCard(e.target.files[0])}  // Capture the file here
                                required
                            />
                        </Form.Group>


                        <Button variant="primary" type="submit" block disabled={loading}>
                            {loading ? 'Registering...' : 'Register'}
                        </Button>

                        <div className="my-5">
                            <Link to="/farmer/login">Already have an account? Login</Link>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default FarmerRegister;
