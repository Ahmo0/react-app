import { FormErrors, TicketFormData } from '../types';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  // At least 6 characters, 1 letter, 1 number
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;
  return passwordRegex.test(password);
};

export const validateTicketForm = (data: TicketFormData): FormErrors => {
  const errors: FormErrors = {};

  // Title validation
  if (!data.title.trim()) {
    errors.title = 'Title is required';
  } else if (data.title.trim().length < 5) {
    errors.title = 'Title must be at least 5 characters long';
  } else if (data.title.trim().length > 100) {
    errors.title = 'Title must be less than 100 characters';
  }

  // Description validation
  if (!data.description.trim()) {
    errors.description = 'Description is required';
  } else if (data.description.trim().length < 10) {
    errors.description = 'Description must be at least 10 characters long';
  } else if (data.description.trim().length > 1000) {
    errors.description = 'Description must be less than 1000 characters';
  }

  // Priority validation
  if (!data.priority) {
    errors.priority = 'Priority is required';
  } else if (!['low', 'medium', 'high'].includes(data.priority)) {
    errors.priority = 'Invalid priority level';
  }

  // Due date validation
  if (data.dueDate) {
    const dueDate = new Date(data.dueDate);
    const now = new Date();
    
    if (dueDate <= now) {
      errors.dueDate = 'Due date must be in the future';
    }
  }

  // Tags validation
  if (data.tags && data.tags.length > 5) {
    errors.tags = 'Maximum 5 tags allowed';
  }

  return errors;
};

export const validateLoginForm = (email: string, password: string): FormErrors => {
  const errors: FormErrors = {};

  if (!email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters long';
  }

  return errors;
};

export const validateRegisterForm = (name: string, email: string, password: string, confirmPassword: string): FormErrors => {
  const errors: FormErrors = {};

  if (!name.trim()) {
    errors.name = 'Name is required';
  } else if (name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }

  if (!email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (!validatePassword(password)) {
    errors.password = 'Password must be at least 6 characters with at least one letter and one number';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatDateOnly = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const isOverdue = (dueDate: string): boolean => {
  const due = new Date(dueDate);
  const now = new Date();
  return due < now;
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'open':
      return 'status-open';
    case 'in-progress':
      return 'status-in-progress';
    case 'resolved':
      return 'status-resolved';
    case 'closed':
      return 'status-closed';
    default:
      return 'status-open';
  }
};

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'high':
      return 'priority-high';
    case 'medium':
      return 'priority-medium';
    case 'low':
      return 'priority-low';
    default:
      return 'priority-medium';
  }
};
