import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
    }
  };

  return (
    <div className="min-vh-100 bg-light d-flex flex-column justify-content-center py-5">
      <Container className="max-width-400">
        <div className="text-center mb-4">
          <Link to="/" className="text-decoration-none">
            <Dumbbell className="text-danger mb-2" size={40} />
            <h1 className="h3 text-dark">FitTrack Pro</h1>
          </Link>
          <h2 className="h4 mb-3">Sign in to your account</h2>
          <p className="text-muted">
            Or{' '}
            <Link to="/user/signup" className="text-danger">
              create a new account
            </Link>
          </p>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 d-flex justify-content-between align-items-center">
            <Form.Check type="checkbox" label="Remember me" />
            <Link to="#" className="text-danger">Forgot password?</Link>
          </Form.Group>

          <Button variant="danger" type="submit" className="w-100">
            Sign in
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default UserLogin;