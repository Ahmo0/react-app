import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTickets } from '../../contexts/TicketContext';
import { AnalyticsCards } from './AnalyticsCards';
import { TicketList } from './TicketList';
import { TicketForm } from './TicketForm';
import { TicketFilters } from './TicketFilters';
import { 
  LogOut, 
  Plus, 
  Filter, 
  Search,
  Bell,
  User,
  Menu,
  X
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { getAnalytics, getFilteredTickets } = useTickets();
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const analytics = getAnalytics();
  const filteredTickets = getFilteredTickets().filter(ticket =>
    ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    logout();
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      {/* Header */}
      <header style={{ 
        backgroundColor: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        padding: '16px 0',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '18px'
              }}>
                TM
              </div>
              <h1 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: 'var(--text-primary)',
                margin: 0
              }}>
                Ticket Manager
              </h1>
            </div>

            {/* Search Bar */}
            <div style={{ 
              position: 'relative', 
              flex: '1', 
              maxWidth: '400px', 
              margin: '0 24px' 
            }}>
              <Search 
                size={20} 
                style={{ 
                  position: 'absolute', 
                  left: '12px', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: 'var(--text-secondary)' 
                }} 
              />
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '44px' }}
              />
            </div>

            {/* Desktop Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={() => setShowTicketForm(true)}
                className="btn btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Plus size={20} />
                New Ticket
              </button>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`btn ${showFilters ? 'btn-primary' : 'btn-outline'}`}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Filter size={20} />
                Filters
              </button>

              <button className="btn btn-outline" style={{ padding: '8px' }}>
                <Bell size={20} />
              </button>

              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                padding: '8px 12px',
                backgroundColor: 'var(--background)',
                borderRadius: '8px',
                border: '1px solid var(--border)'
              }}>
                <User size={20} color="var(--text-secondary)" />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>
                    {user?.name}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {user?.role}
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="btn btn-outline"
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="btn btn-outline"
              style={{ 
                display: 'none', 
                padding: '8px',
                '@media (max-width: 768px)': { display: 'flex' }
              }}
            >
              {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div style={{ 
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: 'var(--surface)',
              borderBottom: '1px solid var(--border)',
              padding: '16px',
              display: 'none',
              '@media (max-width: 768px)': { display: 'block' }
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  onClick={() => setShowTicketForm(true)}
                  className="btn btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}
                >
                  <Plus size={20} />
                  New Ticket
                </button>
                
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`btn ${showFilters ? 'btn-primary' : 'btn-outline'}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}
                >
                  <Filter size={20} />
                  Filters
                </button>

                <button
                  onClick={handleLogout}
                  className="btn btn-outline"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '32px 0' }}>
        <div className="container">
          {/* Analytics Cards */}
          <AnalyticsCards analytics={analytics} />

          {/* Filters */}
          {showFilters && (
            <div style={{ marginBottom: '32px' }}>
              <TicketFilters />
            </div>
          )}

          {/* Ticket List */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">
                Tickets ({filteredTickets.length})
              </h2>
            </div>
            <TicketList tickets={filteredTickets} />
          </div>
        </div>
      </main>

      {/* Ticket Form Modal */}
      {showTicketForm && (
        <TicketForm
          onClose={() => setShowTicketForm(false)}
          onSuccess={() => setShowTicketForm(false)}
        />
      )}
    </div>
  );
};
