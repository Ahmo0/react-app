import React, { useState } from 'react';
import { Ticket } from '../../types';
import { useTickets } from '../../contexts/TicketContext';
import { formatDate, getStatusColor, getPriorityColor, isOverdue } from '../../utils/validation';
import { 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  Clock,
  User,
  Calendar,
  Tag,
  X
} from 'lucide-react';

interface TicketListProps {
  tickets: Ticket[];
}

export const TicketList: React.FC<TicketListProps> = ({ tickets }) => {
  const { updateTicketStatus, deleteTicket } = useTickets();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showActions, setShowActions] = useState<string | null>(null);

  const handleStatusChange = async (ticketId: string, newStatus: Ticket['status']) => {
    await updateTicketStatus(ticketId, newStatus);
    setShowActions(null);
  };

  const handleDelete = async (ticketId: string) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      await deleteTicket(ticketId);
      setShowActions(null);
    }
  };

  const getStatusOptions = (currentStatus: Ticket['status']) => {
    const allStatuses: Ticket['status'][] = ['open', 'in-progress', 'resolved', 'closed'];
    return allStatuses.filter(status => status !== currentStatus);
  };

  if (tickets.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '48px 24px',
        color: 'var(--text-secondary)'
      }}>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          margin: '0 auto 24px',
          backgroundColor: 'var(--background)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Clock size={32} color="var(--text-secondary)" />
        </div>
        <h3 style={{ 
          fontSize: '20px', 
          fontWeight: '600', 
          marginBottom: '8px',
          color: 'var(--text-primary)'
        }}>
          No tickets found
        </h3>
        <p>Try adjusting your filters or create a new ticket to get started.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="table" style={{ marginTop: 0 }}>
        <thead>
          <tr>
            <th>Ticket</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Assignee</th>
            <th>Created</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id} style={{ position: 'relative' }}>
              <td>
                <div>
                  <div style={{ 
                    fontWeight: '600', 
                    color: 'var(--text-primary)',
                    marginBottom: '4px',
                    fontSize: '14px'
                  }}>
                    {ticket.title}
                  </div>
                  <div style={{ 
                    color: 'var(--text-secondary)', 
                    fontSize: '12px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    maxWidth: '300px'
                  }}>
                    {ticket.description}
                  </div>
                  {ticket.tags.length > 0 && (
                    <div style={{ 
                      display: 'flex', 
                      gap: '4px', 
                      marginTop: '8px',
                      flexWrap: 'wrap'
                    }}>
                      {ticket.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '2px 6px',
                            backgroundColor: 'var(--background)',
                            color: 'var(--text-secondary)',
                            borderRadius: '4px',
                            fontSize: '10px',
                            fontWeight: '500'
                          }}
                        >
                          <Tag size={10} />
                          {tag}
                        </span>
                      ))}
                      {ticket.tags.length > 3 && (
                        <span style={{
                          padding: '2px 6px',
                          backgroundColor: 'var(--background)',
                          color: 'var(--text-secondary)',
                          borderRadius: '4px',
                          fontSize: '10px',
                          fontWeight: '500'
                        }}>
                          +{ticket.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </td>
              
              <td>
                <div style={{ position: 'relative' }}>
                  <span className={`status-badge ${getStatusColor(ticket.status)}`}>
                    {ticket.status.replace('-', ' ').toUpperCase()}
                  </span>
                  {showActions === ticket.id && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      backgroundColor: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      boxShadow: 'var(--shadow-lg)',
                      zIndex: 10,
                      marginTop: '4px'
                    }}>
                      {getStatusOptions(ticket.status).map((status) => (
                        <button
                          key={status}
                          onClick={() => handleStatusChange(ticket.id, status)}
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: 'none',
                            background: 'none',
                            textAlign: 'left',
                            fontSize: '12px',
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                            borderBottom: '1px solid var(--border)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--background)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                        >
                          {status.replace('-', ' ').toUpperCase()}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </td>
              
              <td>
                <span className={`status-badge ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority.toUpperCase()}
                </span>
              </td>
              
              <td>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  fontSize: '14px'
                }}>
                  <User size={16} color="var(--text-secondary)" />
                  {ticket.assignee || 'Unassigned'}
                </div>
              </td>
              
              <td>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  fontSize: '12px',
                  color: 'var(--text-secondary)'
                }}>
                  <Calendar size={14} />
                  {formatDate(ticket.createdAt)}
                </div>
              </td>
              
              <td>
                {ticket.dueDate ? (
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    fontSize: '12px',
                    color: isOverdue(ticket.dueDate) ? 'var(--error)' : 'var(--text-secondary)'
                  }}>
                    <Calendar size={14} />
                    {formatDate(ticket.dueDate)}
                    {isOverdue(ticket.dueDate) && (
                      <span style={{
                        padding: '2px 4px',
                        backgroundColor: 'var(--error)',
                        color: 'white',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: '500'
                      }}>
                        OVERDUE
                      </span>
                    )}
                  </div>
                ) : (
                  <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
                    No due date
                  </span>
                )}
              </td>
              
              <td>
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setShowActions(showActions === ticket.id ? null : ticket.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                      borderRadius: '4px',
                      color: 'var(--text-secondary)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--background)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <MoreVertical size={16} />
                  </button>
                  
                  {showActions === ticket.id && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      backgroundColor: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      boxShadow: 'var(--shadow-lg)',
                      zIndex: 10,
                      marginTop: '4px',
                      minWidth: '120px'
                    }}>
                      <button
                        onClick={() => {
                          setSelectedTicket(ticket);
                          setShowActions(null);
                        }}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: 'none',
                          background: 'none',
                          textAlign: 'left',
                          fontSize: '12px',
                          color: 'var(--text-primary)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          borderBottom: '1px solid var(--border)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--background)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <Eye size={14} />
                        View Details
                      </button>
                      
                      <button
                        onClick={() => {
                          // Handle edit - would open edit modal
                          setShowActions(null);
                        }}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: 'none',
                          background: 'none',
                          textAlign: 'left',
                          fontSize: '12px',
                          color: 'var(--text-primary)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          borderBottom: '1px solid var(--border)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--background)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <Edit size={14} />
                        Edit
                      </button>
                      
                      <button
                        onClick={() => handleDelete(ticket.id)}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: 'none',
                          background: 'none',
                          textAlign: 'left',
                          fontSize: '12px',
                          color: 'var(--error)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </div>

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <div className="modal-overlay" onClick={() => setSelectedTicket(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ margin: 0 }}>Ticket Details</h3>
              <button
                onClick={() => setSelectedTicket(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  color: 'var(--text-secondary)'
                }}
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ marginBottom: '8px', color: 'var(--text-primary)' }}>
                  {selectedTicket.title}
                </h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {selectedTicket.description}
                </p>
              </div>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: '16px',
                marginBottom: '24px'
              }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '500' }}>
                    Status
                  </label>
                  <div style={{ marginTop: '4px' }}>
                    <span className={`status-badge ${getStatusColor(selectedTicket.status)}`}>
                      {selectedTicket.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '500' }}>
                    Priority
                  </label>
                  <div style={{ marginTop: '4px' }}>
                    <span className={`status-badge ${getPriorityColor(selectedTicket.priority)}`}>
                      {selectedTicket.priority.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '500' }}>
                    Assignee
                  </label>
                  <div style={{ marginTop: '4px', color: 'var(--text-primary)' }}>
                    {selectedTicket.assignee || 'Unassigned'}
                  </div>
                </div>
                
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '500' }}>
                    Due Date
                  </label>
                  <div style={{ marginTop: '4px', color: 'var(--text-primary)' }}>
                    {selectedTicket.dueDate ? formatDate(selectedTicket.dueDate) : 'No due date'}
                  </div>
                </div>
              </div>
              
              {selectedTicket.tags.length > 0 && (
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '500' }}>
                    Tags
                  </label>
                  <div style={{ 
                    display: 'flex', 
                    gap: '8px', 
                    marginTop: '8px',
                    flexWrap: 'wrap'
                  }}>
                    {selectedTicket.tags.map((tag, index) => (
                      <span
                        key={index}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: 'var(--background)',
                          color: 'var(--text-secondary)',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
