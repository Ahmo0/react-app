import React, { useState } from 'react';
import { useTickets } from '../../contexts/TicketContext';
import { validateTicketForm } from '../../utils/validation';
import { TicketFormData } from '../../types';
import { X, AlertCircle } from 'lucide-react';

interface TicketFormProps {
  onClose: () => void;
  onSuccess: () => void;
  ticket?: TicketFormData;
  mode?: 'create' | 'edit';
}

export const TicketForm: React.FC<TicketFormProps> = ({ 
  onClose, 
  onSuccess, 
  ticket,
  mode = 'create' 
}) => {
  const { addTicket, updateTicket } = useTickets();
  const [formData, setFormData] = useState<TicketFormData>({
    title: ticket?.title || '',
    description: ticket?.description || '',
    priority: ticket?.priority || 'medium',
    assignee: ticket?.assignee || '',
    dueDate: ticket?.dueDate || '',
    tags: ticket?.tags || [],
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim()) && formData.tags.length < 5) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateTicketForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      let success = false;
      if (mode === 'create') {
        success = await addTicket(formData);
      } else {
        // For edit mode, we'd need the ticket ID
        // success = await updateTicket(ticketId, formData);
      }
      
      if (success) {
        onSuccess();
      } else {
        setErrors({ general: 'Failed to save ticket. Please try again.' });
      }
    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 style={{ margin: 0 }}>
            {mode === 'create' ? 'Create New Ticket' : 'Edit Ticket'}
          </h3>
          <button
            onClick={onClose}
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

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {errors.general && (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                padding: '12px', 
                backgroundColor: '#fee2e2', 
                color: '#dc2626', 
                borderRadius: '8px', 
                marginBottom: '16px',
                fontSize: '14px'
              }}>
                <AlertCircle size={16} />
                {errors.general}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`form-input ${errors.title ? 'error' : ''}`}
                placeholder="Enter ticket title"
                disabled={isLoading}
              />
              {errors.title && <div className="form-error">{errors.title}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={`form-input ${errors.description ? 'error' : ''}`}
                placeholder="Describe the issue or request"
                rows={4}
                disabled={isLoading}
                style={{ resize: 'vertical', minHeight: '100px' }}
              />
              {errors.description && <div className="form-error">{errors.description}</div>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label htmlFor="priority" className="form-label">
                  Priority *
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className={`form-input ${errors.priority ? 'error' : ''}`}
                  disabled={isLoading}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                {errors.priority && <div className="form-error">{errors.priority}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="assignee" className="form-label">
                  Assignee
                </label>
                <input
                  type="text"
                  id="assignee"
                  name="assignee"
                  value={formData.assignee}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Assign to team member"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="dueDate" className="form-label">
                Due Date
              </label>
              <input
                type="datetime-local"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className={`form-input ${errors.dueDate ? 'error' : ''}`}
                disabled={isLoading}
              />
              {errors.dueDate && <div className="form-error">{errors.dueDate}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Tags
              </label>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="form-input"
                  placeholder="Add a tag"
                  disabled={isLoading || formData.tags.length >= 5}
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="btn btn-outline"
                  disabled={isLoading || !tagInput.trim() || formData.tags.length >= 5}
                >
                  Add
                </button>
              </div>
              {formData.tags.length > 0 && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 8px',
                        backgroundColor: 'var(--background)',
                        color: 'var(--text-primary)',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'var(--text-secondary)',
                          padding: '0',
                          marginLeft: '4px'
                        }}
                        disabled={isLoading}
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              {errors.tags && <div className="form-error">{errors.tags}</div>}
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Maximum 5 tags allowed
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div className="spinner" />
                  {mode === 'create' ? 'Creating...' : 'Saving...'}
                </div>
              ) : (
                mode === 'create' ? 'Create Ticket' : 'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
