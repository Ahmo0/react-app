import React, { useState } from 'react';
import { WaveBackground, CircleBackground } from './WaveBackground';
import { LoginForm } from './auth/LoginForm';
import { RegisterForm } from './auth/RegisterForm';
import { 
  Ticket, 
  BarChart3, 
  Shield, 
  Zap, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Star,
  TrendingUp
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const features = [
    {
      icon: <Ticket size={32} />,
      title: 'Smart Ticket Management',
      description: 'Organize and track all your support tickets in one place with intelligent categorization and prioritization.'
    },
    {
      icon: <BarChart3 size={32} />,
      title: 'Advanced Analytics',
      description: 'Get insights into your support performance with detailed analytics and reporting dashboards.'
    },
    {
      icon: <Shield size={32} />,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with 99.9% uptime guarantee and data encryption at rest and in transit.'
    },
    {
      icon: <Zap size={32} />,
      title: 'Lightning Fast',
      description: 'Built for speed with modern architecture and optimized performance for handling thousands of tickets.'
    },
    {
      icon: <Users size={32} />,
      title: 'Team Collaboration',
      description: 'Work together seamlessly with real-time updates, comments, and assignment management.'
    },
    {
      icon: <CheckCircle size={32} />,
      title: 'Automated Workflows',
      description: 'Streamline your processes with automated ticket routing, status updates, and notifications.'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Tickets Resolved' },
    { number: '99.9%', label: 'Uptime' },
    { number: '50+', label: 'Happy Customers' },
    { number: '24/7', label: 'Support' }
  ];

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <CircleBackground />
      
      {/* Header */}
      <header style={{ 
        position: 'relative', 
        zIndex: 10, 
        padding: '24px 0',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border)'
      }}>
        <div className="container" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
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
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => setAuthMode('login')}
              className={`btn ${authMode === 'login' ? 'btn-primary' : 'btn-outline'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`btn ${authMode === 'register' ? 'btn-primary' : 'btn-outline'}`}
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ 
        position: 'relative', 
        zIndex: 5, 
        padding: '80px 0 120px',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05))'
      }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 400px', 
            gap: '80px', 
            alignItems: 'center',
            minHeight: '500px'
          }}>
            {/* Left Content */}
            <div>
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px',
                padding: '8px 16px',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                borderRadius: '9999px',
                color: 'var(--primary)',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '24px'
              }}>
                <Star size={16} />
                Trusted by 50+ companies worldwide
              </div>
              
              <h1 style={{ 
                fontSize: '56px', 
                fontWeight: '700', 
                lineHeight: '1.1',
                color: 'var(--text-primary)',
                marginBottom: '24px',
                background: 'linear-gradient(135deg, var(--text-primary), var(--primary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Manage Tickets Like a Pro!
              </h1>
              
              <p style={{ 
                fontSize: '20px', 
                color: 'var(--text-secondary)', 
                marginBottom: '32px',
                lineHeight: '1.6'
              }}>
                The most powerful and intuitive ticket management system. 
                Streamline your support workflow, boost team productivity, 
                and deliver exceptional customer experiences.
              </p>
              
              <div style={{ display: 'flex', gap: '16px', marginBottom: '48px' }}>
                <button className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '16px' }}>
                  Get Started for Free
                  <ArrowRight size={20} style={{ marginLeft: '8px' }} />
                </button>
                <button className="btn btn-outline" style={{ padding: '16px 32px', fontSize: '16px' }}>
                  Watch Demo
                </button>
              </div>
              
              {/* Stats */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(4, 1fr)', 
                gap: '32px',
                padding: '32px',
                backgroundColor: 'var(--surface)',
                borderRadius: '16px',
                boxShadow: 'var(--shadow)'
              }}>
                {stats.map((stat, index) => (
                  <div key={index} style={{ textAlign: 'center' }}>
                    <div style={{ 
                      fontSize: '32px', 
                      fontWeight: '700', 
                      color: 'var(--primary)',
                      marginBottom: '4px'
                    }}>
                      {stat.number}
                    </div>
                    <div style={{ 
                      fontSize: '14px', 
                      color: 'var(--text-secondary)',
                      fontWeight: '500'
                    }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Content - Auth Form */}
            <div style={{ position: 'relative', zIndex: 10 }}>
              {authMode === 'login' ? (
                <LoginForm onSwitchToRegister={() => setAuthMode('register')} />
              ) : (
                <RegisterForm onSwitchToLogin={() => setAuthMode('login')} />
              )}
            </div>
          </div>
        </div>
        
        <WaveBackground />
      </section>

      {/* Features Section */}
      <section style={{ 
        padding: '120px 0', 
        backgroundColor: 'var(--surface)',
        position: 'relative',
        zIndex: 5
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ 
              fontSize: '48px', 
              fontWeight: '700', 
              color: 'var(--text-primary)',
              marginBottom: '24px'
            }}>
              Everything You Need
            </h2>
            <p style={{ 
              fontSize: '20px', 
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Powerful features designed to streamline your ticket management 
              and boost your team's productivity.
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '32px' 
          }}>
            {features.map((feature, index) => (
              <div key={index} className="card" style={{ 
                textAlign: 'center',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow)';
              }}>
                <div style={{ 
                  color: 'var(--primary)', 
                  marginBottom: '24px',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{ 
                  fontSize: '24px', 
                  fontWeight: '600', 
                  color: 'var(--text-primary)',
                  marginBottom: '16px'
                }}>
                  {feature.title}
                </h3>
                <p style={{ 
                  color: 'var(--text-secondary)', 
                  lineHeight: '1.6',
                  fontSize: '16px'
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: '120px 0', 
        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
        zIndex: 5
      }}>
        <div className="container">
          <h2 style={{ 
            fontSize: '48px', 
            fontWeight: '700', 
            marginBottom: '24px'
          }}>
            Ready to Get Started?
          </h2>
          <p style={{ 
            fontSize: '20px', 
            marginBottom: '48px',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto 48px'
          }}>
            Join thousands of teams already using Ticket Manager to streamline 
            their support operations and deliver better customer experiences.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button 
              className="btn" 
              style={{ 
                backgroundColor: 'white', 
                color: 'var(--primary)',
                padding: '16px 32px',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              Start Free Trial
              <TrendingUp size={20} style={{ marginLeft: '8px' }} />
            </button>
            <button 
              className="btn" 
              style={{ 
                backgroundColor: 'transparent', 
                color: 'white',
                border: '2px solid white',
                padding: '16px 32px',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        padding: '48px 0', 
        backgroundColor: 'var(--text-primary)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '24px'
          }}>
            <div style={{ 
              width: '32px', 
              height: '32px', 
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '14px'
            }}>
              TM
            </div>
            <span style={{ fontSize: '20px', fontWeight: '600' }}>Ticket Manager</span>
          </div>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>
            © 2025 Ticket Manager. Built with React, Vue, and Twig. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
