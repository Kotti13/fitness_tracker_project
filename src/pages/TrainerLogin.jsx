import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const TrainerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/trainer/dashboard');
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
    }
  };

  return (
    <div className="min-vh-100 bg-dark d-flex flex-column justify-content-center py-5">
      <Container className="max-width-400">
        <div className="text-center mb-4">
          <Link to="/" className="text-decoration-none">
            <Dumbbell className="text-danger mb-2" size={40} />
            <h1 className="h3 text-light">FitTrack Pro</h1>
          </Link>
          <h2 className="h4 mb-3 text-light">Trainer Sign In</h2>
          <p className="text-muted">
            Or{' '}
            <Link to="/trainer/signup" className="text-danger">
              register as a trainer
            </Link>
          </p>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit} className="bg-dark p-4 rounded shadow border border-secondary">
          <Form.Group className="mb-3">
            <Form.Label className="text-light">Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-dark text-light border-secondary"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-light">Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-dark text-light border-secondary"
            />
          </Form.Group>

          <Form.Group className="mb-3 d-flex justify-content-between align-items-center">
            <Form.Check type="checkbox" label="Remember me" className="text-light" />
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

export default TrainerLogin;