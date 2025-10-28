import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Ticket, TicketState, TicketFormData, Analytics } from '../types';

interface TicketContextType extends TicketState {
  addTicket: (ticketData: TicketFormData) => Promise<boolean>;
  updateTicket: (id: string, ticketData: Partial<TicketFormData>) => Promise<boolean>;
  deleteTicket: (id: string) => Promise<boolean>;
  updateTicketStatus: (id: string, status: Ticket['status']) => Promise<boolean>;
  setFilters: (filters: Partial<TicketState['filters']>) => void;
  getAnalytics: () => Analytics;
  getFilteredTickets: () => Ticket[];
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

type TicketAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_TICKETS'; payload: Ticket[] }
  | { type: 'ADD_TICKET'; payload: Ticket }
  | { type: 'UPDATE_TICKET'; payload: Ticket }
  | { type: 'DELETE_TICKET'; payload: string }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_FILTERS'; payload: Partial<TicketState['filters']> };

const ticketReducer = (state: TicketState, action: TicketAction): TicketState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_TICKETS':
      return { ...state, tickets: action.payload, isLoading: false, error: null };
    case 'ADD_TICKET':
      return { ...state, tickets: [...state.tickets, action.payload] };
    case 'UPDATE_TICKET':
      return {
        ...state,
        tickets: state.tickets.map(ticket =>
          ticket.id === action.payload.id ? action.payload : ticket
        ),
      };
    case 'DELETE_TICKET':
      return {
        ...state,
        tickets: state.tickets.filter(ticket => ticket.id !== action.payload),
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    default:
      return state;
  }
};

const initialState: TicketState = {
  tickets: [],
  isLoading: false,
  error: null,
  filters: {
    status: '',
    priority: '',
    assignee: '',
  },
};

// Mock data for demonstration
const mockTickets: Ticket[] = [
  {
    id: '1',
    title: 'Website Login Issue',
    description: 'Users are unable to log in to the website. Getting 500 error.',
    status: 'open',
    priority: 'high',
    assignee: 'John Doe',
    createdBy: 'admin',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    dueDate: '2024-01-20T17:00:00Z',
    tags: ['bug', 'authentication'],
  },
  {
    id: '2',
    title: 'Feature Request: Dark Mode',
    description: 'Add dark mode toggle to the application interface.',
    status: 'in-progress',
    priority: 'medium',
    assignee: 'Jane Smith',
    createdBy: 'user',
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-16T09:15:00Z',
    dueDate: '2024-01-25T17:00:00Z',
    tags: ['feature', 'ui'],
  },
  {
    id: '3',
    title: 'Database Performance',
    description: 'Database queries are running slowly on the reports page.',
    status: 'resolved',
    priority: 'high',
    assignee: 'Mike Johnson',
    createdBy: 'admin',
    createdAt: '2024-01-10T08:45:00Z',
    updatedAt: '2024-01-16T16:30:00Z',
    dueDate: '2024-01-18T17:00:00Z',
    tags: ['performance', 'database'],
  },
  {
    id: '4',
    title: 'Mobile Responsiveness',
    description: 'Fix mobile layout issues on the dashboard page.',
    status: 'closed',
    priority: 'medium',
    assignee: 'Sarah Wilson',
    createdBy: 'user',
    createdAt: '2024-01-08T11:15:00Z',
    updatedAt: '2024-01-12T14:20:00Z',
    dueDate: '2024-01-15T17:00:00Z',
    tags: ['mobile', 'responsive'],
  },
];

export const TicketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(ticketReducer, initialState);

  // Load tickets from localStorage on mount
  useEffect(() => {
    const loadTickets = () => {
      try {
        const savedTickets = localStorage.getItem('ticketManagerTickets');
        if (savedTickets) {
          const tickets = JSON.parse(savedTickets);
          dispatch({ type: 'SET_TICKETS', payload: tickets });
        } else {
          // Initialize with mock data
          dispatch({ type: 'SET_TICKETS', payload: mockTickets });
          localStorage.setItem('ticketManagerTickets', JSON.stringify(mockTickets));
        }
      } catch (error) {
        console.error('Error loading tickets:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load tickets' });
      }
    };

    loadTickets();
  }, []);

  const addTicket = async (ticketData: TicketFormData): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newTicket: Ticket = {
        id: Date.now().toString(),
        ...ticketData,
        status: 'open',
        createdBy: 'current-user', // In real app, get from auth context
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      const updatedTickets = [...state.tickets, newTicket];
      dispatch({ type: 'ADD_TICKET', payload: newTicket });
      
      // Save to localStorage
      localStorage.setItem('ticketManagerTickets', JSON.stringify(updatedTickets));
      
      return true;
    } catch (error) {
      console.error('Error adding ticket:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add ticket' });
      return false;
    }
  };

  const updateTicket = async (id: string, ticketData: Partial<TicketFormData>): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedTicket = state.tickets.find(ticket => ticket.id === id);
      if (!updatedTicket) {
        dispatch({ type: 'SET_ERROR', payload: 'Ticket not found' });
        return false;
      }
      
      const newTicket = {
        ...updatedTicket,
        ...ticketData,
        updatedAt: new Date().toISOString(),
      };
      
      dispatch({ type: 'UPDATE_TICKET', payload: newTicket });
      
      // Save to localStorage
      const updatedTickets = state.tickets.map(ticket =>
        ticket.id === id ? newTicket : ticket
      );
      localStorage.setItem('ticketManagerTickets', JSON.stringify(updatedTickets));
      
      return true;
    } catch (error) {
      console.error('Error updating ticket:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update ticket' });
      return false;
    }
  };

  const deleteTicket = async (id: string): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      dispatch({ type: 'DELETE_TICKET', payload: id });
      
      // Save to localStorage
      const updatedTickets = state.tickets.filter(ticket => ticket.id !== id);
      localStorage.setItem('ticketManagerTickets', JSON.stringify(updatedTickets));
      
      return true;
    } catch (error) {
      console.error('Error deleting ticket:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete ticket' });
      return false;
    }
  };

  const updateTicketStatus = async (id: string, status: Ticket['status']): Promise<boolean> => {
    return updateTicket(id, { status });
  };

  const setFilters = (filters: Partial<TicketState['filters']>) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const getFilteredTickets = (): Ticket[] => {
    return state.tickets.filter(ticket => {
      const matchesStatus = !state.filters.status || ticket.status === state.filters.status;
      const matchesPriority = !state.filters.priority || ticket.priority === state.filters.priority;
      const matchesAssignee = !state.filters.assignee || ticket.assignee === state.filters.assignee;
      
      return matchesStatus && matchesPriority && matchesAssignee;
    });
  };

  const getAnalytics = (): Analytics => {
    const tickets = state.tickets;
    const now = new Date();
    
    return {
      totalTickets: tickets.length,
      openTickets: tickets.filter(t => t.status === 'open').length,
      inProgressTickets: tickets.filter(t => t.status === 'in-progress').length,
      resolvedTickets: tickets.filter(t => t.status === 'resolved').length,
      closedTickets: tickets.filter(t => t.status === 'closed').length,
      highPriorityTickets: tickets.filter(t => t.priority === 'high').length,
      overdueTickets: tickets.filter(t => {
        if (!t.dueDate) return false;
        return new Date(t.dueDate) < now && !['resolved', 'closed'].includes(t.status);
      }).length,
    };
  };

  const value: TicketContextType = {
    ...state,
    addTicket,
    updateTicket,
    deleteTicket,
    updateTicketStatus,
    setFilters,
    getAnalytics,
    getFilteredTickets,
  };

  return <TicketContext.Provider value={value}>{children}</TicketContext.Provider>;
};

export const useTickets = (): TicketContextType => {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
};
