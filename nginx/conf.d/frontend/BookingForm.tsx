import React, { useState } from 'react';

interface BookingData {
  customerName: string;
  phone: string;
  serviceType: string;
  address: string;
  preferredDate: string;
}

export default function BookingForm() {
  const [formData, setFormData] = useState<BookingData>({
    customerName: '',
    phone: '',
    serviceType: 'Regular Servicing',
    address: '',
    preferredDate: '',
  });

  const [status, setStatus] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Submitting booking...');

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Booking created successfully!');
        setFormData({ customerName: '', phone: '', serviceType: 'Regular Servicing', address: '', preferredDate: '' });
      } else {
        setStatus('Failed to create booking. Please try again.');
      }
    } catch (err) {
      setStatus('Error connecting to server.');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Book AC Service</h2>
      {status && <p style={{ color: 'blue' }}>{status}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Full Name:</label>
          <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Phone Number:</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Service Type:</label>
          <select name="serviceType" value={formData.serviceType} onChange={handleChange} style={{ width: '100%', padding: '8px' }}>
            <option value="Regular Servicing">Regular Servicing</option>
            <option value="Deep Chemical Cleaning">Deep Chemical Cleaning</option>
            <option value="Gas Refilling">Gas Refilling</option>
            <option value="AC Repair & Troubleshooting">AC Repair & Troubleshooting</option>
            <option value="Installation / Uninstallation">Installation / Uninstallation</option>
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Service Address:</label>
          <textarea name="address" value={formData.address} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Preferred Date:</label>
          <input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Submit Booking
        </button>
      </form>
    </div>
  );
}
