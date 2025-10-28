import React from 'react';
import { Analytics } from '../../types';
import { 
  Ticket, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  TrendingUp,
  Users
} from 'lucide-react';

interface AnalyticsCardsProps {
  analytics: Analytics;
}

export const AnalyticsCards: React.FC<AnalyticsCardsProps> = ({ analytics }) => {
  const cards = [
    {
      title: 'Total Tickets',
      value: analytics.totalTickets,
      icon: <Ticket size={24} />,
      color: 'var(--primary)',
      bgColor: 'rgba(99, 102, 241, 0.1)',
      change: '+12%',
      changeType: 'positive' as const
    },
    {
      title: 'Open Tickets',
      value: analytics.openTickets,
      icon: <Clock size={24} />,
      color: 'var(--warning)',
      bgColor: 'rgba(245, 158, 11, 0.1)',
      change: '+5%',
      changeType: 'negative' as const
    },
    {
      title: 'In Progress',
      value: analytics.inProgressTickets,
      icon: <TrendingUp size={24} />,
      color: 'var(--secondary)',
      bgColor: 'rgba(139, 92, 246, 0.1)',
      change: '+8%',
      changeType: 'positive' as const
    },
    {
      title: 'Resolved',
      value: analytics.resolvedTickets,
      icon: <CheckCircle size={24} />,
      color: 'var(--success)',
      bgColor: 'rgba(16, 185, 129, 0.1)',
      change: '+15%',
      changeType: 'positive' as const
    },
    {
      title: 'Closed',
      value: analytics.closedTickets,
      icon: <XCircle size={24} />,
      color: 'var(--text-secondary)',
      bgColor: 'rgba(100, 116, 139, 0.1)',
      change: '+3%',
      changeType: 'positive' as const
    },
    {
      title: 'High Priority',
      value: analytics.highPriorityTickets,
      icon: <AlertTriangle size={24} />,
      color: 'var(--error)',
      bgColor: 'rgba(239, 68, 68, 0.1)',
      change: '-2%',
      changeType: 'positive' as const
    },
    {
      title: 'Overdue',
      value: analytics.overdueTickets,
      icon: <Clock size={24} />,
      color: 'var(--error)',
      bgColor: 'rgba(239, 68, 68, 0.1)',
      change: analytics.overdueTickets > 0 ? 'Urgent' : 'None',
      changeType: analytics.overdueTickets > 0 ? 'negative' as const : 'positive' as const
    },
    {
      title: 'Team Members',
      value: 8,
      icon: <Users size={24} />,
      color: 'var(--primary)',
      bgColor: 'rgba(99, 102, 241, 0.1)',
      change: '+2',
      changeType: 'positive' as const
    }
  ];

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
      gap: '24px',
      marginBottom: '32px'
    }}>
      {cards.map((card, index) => (
        <div
          key={index}
          className="card"
          style={{
            padding: '24px',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow)';
          }}
        >
          
          <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: card.bgColor,
            opacity: 0.3
          }} />
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            marginBottom: '16px',
            position: 'relative',
            zIndex: 1
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: card.bgColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: card.color
            }}>
              {card.icon}
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 8px',
              borderRadius: '12px',
              backgroundColor: card.changeType === 'positive' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              color: card.changeType === 'positive' ? 'var(--success)' : 'var(--error)',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              {card.changeType === 'positive' ? '↗' : '↘'}
              {card.change}
            </div>
          </div>
          
          <div>
            <div style={{
              fontSize: '32px',
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginBottom: '4px',
              lineHeight: '1'
            }}>
              {card.value}
            </div>
            <div style={{
              fontSize: '14px',
              color: 'var(--text-secondary)',
              fontWeight: '500'
            }}>
              {card.title}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
