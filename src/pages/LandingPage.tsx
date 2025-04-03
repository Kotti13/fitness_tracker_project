import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Users, Brain, Trophy } from 'lucide-react';
import { Container, Nav, Navbar, Button, Row, Col } from 'react-bootstrap';

const LandingPage = () => {
  return (
    <div className="min-vh-100 bg-dark">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <Dumbbell className="me-2" />
            FitTrack Pro
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/user/login">User Login</Nav.Link>
            <Button as={Link} to="/trainer/login" variant="danger">
              Trainer Login
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <Container className="py-5 text-center text-light">
        <h1 className="display-4 mb-4">Transform Your Fitness Journey</h1>
        <p className="lead mb-5">
          Connect with expert trainers, track your progress, and achieve your fitness goals with our comprehensive platform.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Button as={Link} to="/user/signup" variant="danger" size="lg">
            Join as User
          </Button>
          <Button as={Link} to="/trainer/signup" variant="outline-light" size="lg">
            Join as Trainer
          </Button>
        </div>
      </Container>

      <Container className="py-5">
        <Row>
          <Col md={4} className="text-center mb-4">
            <div className="bg-secondary p-4 rounded mb-3 d-inline-block">
              <Users size={48} className="text-danger" />
            </div>
            <h3 className="text-light">Expert Trainers</h3>
            <p className="text-light-50">Connect with certified fitness professionals for personalized guidance.</p>
          </Col>
          <Col md={4} className="text-center mb-4">
            <div className="bg-secondary p-4 rounded mb-3 d-inline-block">
              <Brain size={48} className="text-danger" />
            </div>
            <h3 className="text-light">Smart Analytics</h3>
            <p className="text-light-50">Track your progress with intelligent insights and recommendations.</p>
          </Col>
          <Col md={4} className="text-center mb-4">
            <div className="bg-secondary p-4 rounded mb-3 d-inline-block">
              <Trophy size={48} className="text-danger" />
            </div>
            <h3 className="text-light">Goal Achievement</h3>
            <p className="text-light-50">Set and accomplish your fitness goals with structured planning.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;