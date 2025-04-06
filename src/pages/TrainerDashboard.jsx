import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Users, Calendar, TrendingUp, Bell } from 'lucide-react';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import LeadsList from '../components/LeadsList';
import AppointmentCalendar from '../components/AppointmentCalendar';

const TrainerDashboard = () => {
  const [stats, setStats] = useState({
    totalLeads: 0,
    activeClients: 0,
    upcomingSessions: 0,
    conversionRate: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      if (!auth.currentUser) return;
      
      try {
        const leadsRef = collection(db, 'leads');
        const leadsQuery = query(leadsRef, where('trainerId', '==', auth.currentUser.uid));
        const leadsSnapshot = await getDocs(leadsQuery);
        
        const clientsRef = collection(db, 'clients');
        const clientsQuery = query(clientsRef, where('trainerId', '==', auth.currentUser.uid));
        const clientsSnapshot = await getDocs(clientsQuery);

        setStats({
          totalLeads: leadsSnapshot.size,
          activeClients: clientsSnapshot.size,
          upcomingSessions: 5, // This would be calculated from appointments
          conversionRate: ((clientsSnapshot.size / leadsSnapshot.size) * 100).toFixed(1)
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="bg-light min-vh-100">
      <Container fluid className="py-4">
        <Row className="g-4">
          <Col md={3}>
            <Card className="shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-primary bg-opacity-10 p-3 rounded">
                    <Users className="text-primary" size={24} />
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-1">Total Leads</h6>
                    <h3 className="mb-0">{stats.totalLeads}</h3>
                  </div>
                </div>
                <div className="progress" style={{ height: '4px' }}>
                  <div className="progress-bar" style={{ width: '70%' }}></div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={3}>
            <Card className="shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-success bg-opacity-10 p-3 rounded">
                    <Users className="text-success" size={24} />
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-1">Active Clients</h6>
                    <h3 className="mb-0">{stats.activeClients}</h3>
                  </div>
                </div>
                <div className="progress" style={{ height: '4px' }}>
                  <div className="progress-bar bg-success" style={{ width: '60%' }}></div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-warning bg-opacity-10 p-3 rounded">
                    <Calendar className="text-warning" size={24} />
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-1">Upcoming Sessions</h6>
                    <h3 className="mb-0">{stats.upcomingSessions}</h3>
                  </div>
                </div>
                <div className="progress" style={{ height: '4px' }}>
                  <div className="progress-bar bg-warning" style={{ width: '50%' }}></div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-info bg-opacity-10 p-3 rounded">
                    <TrendingUp className="text-info" size={24} />
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-1">Conversion Rate</h6>
                    <h3 className="mb-0">{stats.conversionRate}%</h3>
                  </div>
                </div>
                <div className="progress" style={{ height: '4px' }}>
                  <div className="progress-bar bg-info" style={{ width: `${stats.conversionRate}%` }}></div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md={8}>
            <Card className="shadow-sm">
              <Card.Header className="bg-white">
                <h5 className="mb-0">Recent Leads</h5>
              </Card.Header>
              <Card.Body>
                <LeadsList />
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Header className="bg-white">
                <h5 className="mb-0">Upcoming Appointments</h5>
              </Card.Header>
              <Card.Body>
                <AppointmentCalendar />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TrainerDashboard;