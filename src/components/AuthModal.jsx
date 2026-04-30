import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { notifyLogin, notifyRegistration } from '../services/api';
import { toast } from 'react-toastify';
import './AuthModal.css';

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.phone) {
      toast.error('Phone number is required for WhatsApp notifications');
      return;
    }
    
    setLoading(true);
    try {
      if (isLogin) {
        // Mock Login
        login({ id: 1, name: formData.name || 'User', email: formData.email, role: 'user', token: 'mock-token' });
        await notifyLogin(formData.phone, formData.name || 'User');
        toast.success('Successfully logged in! New login WhatsApp alert triggered.');
      } else {
        // Mock Register
        login({ id: 1, name: formData.name || 'User', email: formData.email, role: 'user', token: 'mock-token' });
        await notifyRegistration(formData.phone, formData.name || 'User');
        toast.success('Successfully registered! Registration WhatsApp alert triggered.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Registered successfully, but failed to send WhatsApp notification (Backend offline).');
    } finally {
      setLoading(false);
      onClose(); // Ensure modal closes even if notification fails
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="auth-header">
          <h3>{isLogin ? 'Login to Phoenix' : 'Register for Phoenix'}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group text-start mb-2">
              <label className="phoenix-label">Full Name</label>
              <input type="text" name="name" className="phoenix-input" required={!isLogin} value={formData.name} onChange={handleChange} placeholder="John Doe" />
            </div>
          )}
          <div className="form-group text-start mb-2">
            <label className="phoenix-label">Phone Number (for WhatsApp)</label>
            <input type="tel" name="phone" className="phoenix-input" required value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" />
          </div>
          <div className="form-group text-start mb-3">
            <label className="phoenix-label">Email</label>
            <input type="email" name="email" className="phoenix-input" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
          </div>
          <button type="submit" className="btn-phoenix w-100" disabled={loading} style={{padding: '10px'}}>
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
          </button>
          <div className="auth-toggle mt-3">
            <span className="text-muted" style={{cursor: 'pointer'}} onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
