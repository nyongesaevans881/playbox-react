import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { GiDeliveryDrone } from 'react-icons/gi';
import { TbTruckDelivery } from 'react-icons/tb';
import { FaRegMoneyBillAlt } from 'react-icons/fa';

const AddressModal = ({ 
  isOpen, 
  onClose, 
  addressType, 
  addressData = null, 
  onSave,
  isEdit = false
}) => {
  const initialState = {
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    postalCode: '',
    phone: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // If we're editing, populate the form with the address data
    if (isEdit && addressData) {
      setFormData({
        firstName: addressData.firstName || '',
        lastName: addressData.lastName || '',
        address: addressData.address || '',
        apartment: addressData.apartment || '',
        city: addressData.city || '',
        postalCode: addressData.postalCode || '',
        phone: addressData.phone || '',
      });
    } else {
      // Reset form when opening for a new address
      setFormData(initialState);
    }
    
    // Reset errors when modal opens/closes
    setErrors({});
  }, [isOpen, addressData, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.apartment.trim()) newErrors.apartment = 'Apartment is required';
    
    // Basic phone validation
    if (formData.phone && !/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    // Basic postal code validation (can be adjusted based on country format)
    if (formData.postalCode && !/^[A-Za-z0-9\s]{3,10}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Please enter a valid postal code';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setSubmitting(true);
    
    try {
      await onSave(addressType, formData, isEdit ? addressData._id : null);
      onClose(); // Close the modal after successful save
    } catch (error) {
      console.error('Error saving address:', error);
      setErrors({ submit: 'Failed to save address. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="shadow-xl w-full max-w-xl z-10 relative bg-[rgba(28,31,38,0.5)] backdrop-blur-[20px] text-white p-8 border border-[#f0f0f0]">
        <div className="flex justify-between items-center p-4 border-b-2 border-secondary">
          <h3 className="text-xl flex items-center gap-4 font-extrabold text-secondary">
          {addressType === "shipping" ? <TbTruckDelivery size={25} /> : <FaRegMoneyBillAlt size={25}/>} {isEdit ? 'Edit' : 'Add New'} {addressType === 'shipping' ? 'Shipping' : 'Billing'} Address
          </h3>
          <button
            onClick={onClose}
            className="hover:text-secondary focus:outline-none cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border  ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border  ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full px-3 py-2 border  ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Apartment (optional)</label>
            <input
              type="text"
              name="apartment"
              value={formData.apartment}
              onChange={handleChange}
              className={`w-full px-3 py-2 border  ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.apartment && <p className="text-red-500 text-xs mt-1">{errors.apartment}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`w-full px-3 py-2 border  ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className={`w-full px-3 py-2 border  ${errors.postalCode ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-3 py-2 border  ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
          
          {errors.submit && <p className="text-red-500 text-sm mb-4">{errors.submit}</p>}
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100  hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600  hover:bg-blue-700 disabled:bg-blue-300"
            >
              {submitting ? 'Saving...' : isEdit ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;