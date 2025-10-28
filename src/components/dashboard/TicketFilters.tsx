import React from 'react';
import { useTickets } from '../../contexts/TicketContext';
import { X, Filter } from 'lucide-react';

export const TicketFilters: React.FC = () => {
  const { filters, setFilters } = useTickets();

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters({ [key]: value });
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      priority: '',
      assignee: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="card">
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          color: 'var(--text-primary)',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Filter size={20} />
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="btn btn-outline"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              fontSize: '12px',
              padding: '4px 8px'
            }}
          >
            <X size={14} />
            Clear All
          </button>
        )}
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '16px' 
      }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" style={{ fontSize: '14px', marginBottom: '8px' }}>
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="form-input"
            style={{ fontSize: '14px' }}
          >
            <option value="">All Statuses</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" style={{ fontSize: '14px', marginBottom: '8px' }}>
            Priority
          </label>
          <select
            value={filters.priority}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className="form-input"
            style={{ fontSize: '14px' }}
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" style={{ fontSize: '14px', marginBottom: '8px' }}>
            Assignee
          </label>
          <select
            value={filters.assignee}
            onChange={(e) => handleFilterChange('assignee', e.target.value)}
            className="form-input"
            style={{ fontSize: '14px' }}
          >
            <option value="">All Assignees</option>
            <option value="John Doe">Ahmo Hamza</option>
            <option value="Jane Smith">Huzzy Boy</option>
            <option value="Mike Johnson">Khalee Wilson</option>
            <option value="Sarah Wilson">Nafisat Hamza</option>
            <option value="Unassigned">Unassigned</option>
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <div style={{ 
          marginTop: '16px', 
          padding: '12px', 
          backgroundColor: 'var(--background)', 
          borderRadius: '8px',
          border: '1px solid var(--border)'
        }}>
          <div style={{ 
            fontSize: '12px', 
            color: 'var(--text-secondary)', 
            marginBottom: '8px',
            fontWeight: '500'
          }}>
            Active Filters:
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {filters.status && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 8px',
                backgroundColor: 'var(--primary)',
                color: 'white',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                Status: {filters.status}
                <button
                  onClick={() => handleFilterChange('status', '')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'white',
                    padding: '0',
                    marginLeft: '4px'
                  }}
                >
                  <X size={12} />
                </button>
              </span>
            )}
            
            {filters.priority && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 8px',
                backgroundColor: 'var(--secondary)',
                color: 'white',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                Priority: {filters.priority}
                <button
                  onClick={() => handleFilterChange('priority', '')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'white',
                    padding: '0',
                    marginLeft: '4px'
                  }}
                >
                  <X size={12} />
                </button>
              </span>
            )}
            
            {filters.assignee && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 8px',
                backgroundColor: 'var(--success)',
                color: 'white',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                Assignee: {filters.assignee}
                <button
                  onClick={() => handleFilterChange('assignee', '')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'white',
                    padding: '0',
                    marginLeft: '4px'
                  }}
                >
                  <X size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
