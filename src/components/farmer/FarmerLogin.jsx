import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../../utils/api'; // Make sure to adjust the import path of API.js

const FarmerLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // To handle loading state
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post('/farmer/login', { email, password });

            // Save the token and role in localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userRole', 'farmer'); // Store the role as 'farmer'

            // Show success message
            toast.success('Login successful! Redirecting...');

            // Redirect to the farmer dashboard
            navigate('/farmer/farmer-dashboard');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
            toast.error(errorMessage); // Show error message
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="text-center mb-4">Farmer Login</h2>

                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" block disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>

                        <Form.Group>
                            <p>Don't have an account? <Link to="/farmer/register">Register Here</Link></p>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default FarmerLogin;
