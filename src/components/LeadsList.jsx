import React, { useState, useEffect } from 'react';
import { Table, Badge, Dropdown } from 'react-bootstrap';
import { MoreVertical, Mail, Phone, Calendar } from 'lucide-react';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { format } from 'date-fns';

const LeadsList = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchLeads = async () => {
      if (!auth.currentUser) return;
      
      try {
        const leadsRef = collection(db, 'leads');
        const q = query(leadsRef, where('trainerId', '==', auth.currentUser.uid));
        const snapshot = await getDocs(q);
        
        const leadsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setLeads(leadsData);
      } catch (error) {
        console.error('Error fetching leads:', error);
      }
    };

    fetchLeads();
  }, []);

  const updateLeadStatus = async (leadId, newStatus) => {
    try {
      const leadRef = doc(db, 'leads', leadId);
      await updateDoc(leadRef, { status: newStatus });
      
      setLeads(leads.map(lead => 
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      ));
    } catch (error) {
      console.error('Error updating lead status:', error);
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      new: 'primary',
      contacted: 'warning',
      qualified: 'info',
      converted: 'success',
      lost: 'danger'
    };
    
    return (
      <Badge bg={statusColors[status] || 'secondary'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Contact</th>
          <th>Interest</th>
          <th>Status</th>
          <th>Added</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {leads.map(lead => (
          <tr key={lead.id}>
            <td>
              <div className="d-flex align-items-center">
                <div className="avatar-initial rounded-circle bg-light text-primary me-2">
                  {lead.name.charAt(0)}
                </div>
                <div>
                  <div className="fw-bold">{lead.name}</div>
                  <div className="small text-muted">{lead.email}</div>
                </div>
              </div>
            </td>
            <td>
              <div className="d-flex gap-2">
                <Mail size={16} className="text-muted" />
                <Phone size={16} className="text-muted" />
              </div>
            </td>
            <td>{lead.interest}</td>
            <td>{getStatusBadge(lead.status)}</td>
            <td>{format(lead.createdAt.toDate(), 'MMM d, yyyy')}</td>
            <td>
              <Dropdown align="end">
                <Dropdown.Toggle variant="light" size="sm" className="border-0">
                  <MoreVertical size={16} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => updateLeadStatus(lead.id, 'contacted')}>
                    Mark as Contacted
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => updateLeadStatus(lead.id, 'qualified')}>
                    Mark as Qualified
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => updateLeadStatus(lead.id, 'converted')}>
                    Mark as Converted
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => updateLeadStatus(lead.id, 'lost')} className="text-danger">
                    Mark as Lost
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default LeadsList;