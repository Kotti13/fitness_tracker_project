import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const TrainerSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialization: '',
    experience: '',
    certification: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      navigate('/trainer/dashboard');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-vh-100 bg-dark d-flex flex-column justify-content-center py-5">
      <Container className="max-width-400">
        <div className="text-center mb-4">
          <Link to="/" className="text-decoration-none">
            <Dumbbell className="text-danger mb-2" size={40} />
            <h1 className="h3 text-light">FitTrack Pro</h1>
          </Link>
          <h2 className="h4 mb-3 text-light">Register as a Trainer</h2>
          <p className="text-muted">
            Already have an account?{' '}
            <Link to="/trainer/login" className="text-danger">
              Sign in
            </Link>
          </p>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit} className="bg-dark p-4 rounded shadow border border-secondary">
          <Form.Group className="mb-3">
            <Form.Label className="text-light">Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-dark text-light border-secondary"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-light">Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-dark text-light border-secondary"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-light">Specialization</Form.Label>
            <Form.Select
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
              className="bg-dark text-light border-secondary"
            >
              <option value="">Select Specialization</option>
              <option value="weightlifting">Weightlifting</option>
              <option value="yoga">Yoga</option>
              <option value="cardio">Cardio</option>
              <option value="nutrition">Nutrition</option>
              <option value="crossfit">CrossFit</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-light">Years of Experience</Form.Label>
            <Form.Control
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              min="0"
              className="bg-dark text-light border-secondary"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-light">Certification Number</Form.Label>
            <Form.Control
              type="text"
              name="certification"
              value={formData.certification}
              onChange={handleChange}
              required
              className="bg-dark text-light border-secondary"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-light">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="bg-dark text-light border-secondary"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-light">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="bg-dark text-light border-secondary"
            />
          </Form.Group>

          <Button variant="danger" type="submit" className="w-100">
            Register
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default TrainerSignup;