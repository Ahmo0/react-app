import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'var(--background)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}>
      <div style={{
        width: '60px',
        height: '60px',
        border: '4px solid var(--border)',
        borderTop: '4px solid var(--primary)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '24px'
      }} />
      <div style={{
        fontSize: '18px',
        fontWeight: '500',
        color: 'var(--text-primary)',
        marginBottom: '8px'
      }}>
        Loading...
      </div>
      <div style={{
        fontSize: '14px',
        color: 'var(--text-secondary)'
      }}>
        Please wait while we prepare your dashboard
      </div>
    </div>
  );
};
