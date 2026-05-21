import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';

export default function VehicleFormModal({ vehicle, onClose, onSave }) {
  const isEditing = !!vehicle;
  
  const [formData, setFormData] = useState({
    plateNumber: '',
    type: 'Truck',
    driver: '',
    driverPhone: '',
    fuelCapacity: 300,
    status: 'idle',
    location: 'Depot Utama',
  });

  useEffect(() => {
    if (vehicle) {
      setFormData({
        plateNumber: vehicle.plateNumber || '',
        type: vehicle.type || 'Truck',
        driver: vehicle.driver || '',
        driverPhone: vehicle.driverPhone || '',
        fuelCapacity: vehicle.fuelCapacity || 300,
        status: vehicle.status || 'idle',
        location: vehicle.location || 'Depot Utama',
      });
    }
  }, [vehicle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'fuelCapacity' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const inputClass = "w-full rounded-md border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none";
  const labelClass = "mb-1 block text-sm font-medium text-[var(--text-secondary)]";

  return (
    <Modal isOpen={true} onClose={onClose} title={isEditing ? 'Edit Vehicle' : 'Add New Vehicle'} size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {isEditing && (
          <div>
            <label className={labelClass}>Vehicle ID</label>
            <input type="text" value={vehicle.id} disabled className={`${inputClass} opacity-50`} />
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Plate Number *</label>
            <input required type="text" name="plateNumber" value={formData.plateNumber} onChange={handleChange} className={inputClass} placeholder="B 1234 XYZ" />
          </div>
          <div>
            <label className={labelClass}>Vehicle Type *</label>
            <select name="type" value={formData.type} onChange={handleChange} className={inputClass}>
              <option value="Truck">Truck</option>
              <option value="Van">Van</option>
              <option value="Pickup">Pickup</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Driver Name</label>
            <input type="text" name="driver" value={formData.driver} onChange={handleChange} className={inputClass} placeholder="John Doe" />
          </div>
          <div>
            <label className={labelClass}>Driver Phone</label>
            <input type="text" name="driverPhone" value={formData.driverPhone} onChange={handleChange} className={inputClass} placeholder="+62..." />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Fuel Capacity (Liters) *</label>
            <input required type="number" min="10" name="fuelCapacity" value={formData.fuelCapacity} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Status *</label>
            <select name="status" value={formData.status} onChange={handleChange} className={inputClass}>
              <option value="idle">Idle</option>
              <option value="moving">Moving</option>
              <option value="offline">Offline</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className={labelClass}>Current Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} className={inputClass} placeholder="Main Depot" />
        </div>

        <div className="mt-6 flex justify-end gap-3 border-t border-[var(--border)] pt-4">
          <button type="button" onClick={onClose} className="rounded-md border border-[var(--border)] bg-transparent px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]">
            Cancel
          </button>
          <button type="submit" className="rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            {isEditing ? 'Save Changes' : 'Add Vehicle'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
