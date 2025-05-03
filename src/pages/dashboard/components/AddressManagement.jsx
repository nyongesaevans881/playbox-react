import React, { useState } from 'react';
import { MapPin, CreditCard, ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import AddressModal from './AddressModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { addAddress, updateAddress, deleteAddress } from './addressService';
import toast from 'react-hot-toast';

const AddressManagement = ({ 
  expandedSection,
  toggleSection,
  userData,
  setUserData,
}) => {
  const [expandedAddressId, setExpandedAddressId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addressType, setAddressType] = useState(null); // 'shipping' or 'billing'
  const [currentAddress, setCurrentAddress] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleAddressDetails = (addressId) => {
    setExpandedAddressId(expandedAddressId === addressId ? null : addressId);
  };

  const openModal = (type, address = null) => {
    setAddressType(type);
    setCurrentAddress(address);
    setIsEditing(!!address);
    setModalOpen(true);
  };

  const handleSaveAddress = async (type, data, addressId = null) => {
    try {
      let result;
      
      if (isEditing) {
        // Update existing address
        result = await updateAddress(type, addressId, data, userData.email);
        toast.success(`${type === 'shipping' ? 'Shipping' : 'Billing'} address updated successfully!`);
      } else {
        // Add new address
        result = await addAddress(type, data, userData.email);
        toast.success(`${type === 'shipping' ? 'Shipping' : 'Billing'} address added successfully!`);
      }
      
      // Update user data in state with the new addresses
      setUserData(prevData => ({
        ...prevData,
        [type === 'shipping' ? 'shippingAddresses' : 'billingAddresses']: result[type === 'shipping' ? 'shippingAddresses' : 'billingAddresses']
      }));
      
      setModalOpen(false);
    } catch (error) {
      toast.error(`Failed to ${isEditing ? 'update' : 'add'} address: ${error.message}`);
    }
  };

  const openDeleteModal = (type, address) => {
    setAddressType(type);
    setCurrentAddress(address);
    setDeleteModalOpen(true);
  };
  
  const handleDeleteAddress = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteAddress(addressType, currentAddress._id, userData.email);
      
      // Update user data in state
      setUserData(prevData => ({
        ...prevData,
        [addressType === 'shipping' ? 'shippingAddresses' : 'billingAddresses']: 
          result[addressType === 'shipping' ? 'shippingAddresses' : 'billingAddresses']
      }));
      
      setExpandedAddressId(null);
      setDeleteModalOpen(false);
      toast.success(`${addressType === 'shipping' ? 'Shipping' : 'Billing'} address deleted successfully!`);
    } catch (error) {
      toast.error(`Failed to delete address: ${error.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {/* Shipping Addresses */}
      <div className="bg-white overflow-hidden shadow-lg border-2 border-secondary mt-6">
        <div
          className="bg-secondary px-4 py-3 flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('shipping')}
        >
          <div className="flex items-center gap-2">
            <MapPin size={20} />
            <h4 className="font-bold">Shipping Addresses</h4>
          </div>
          {expandedSection === 'shipping' ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </div>

        {expandedSection === 'shipping' && (
          <div className="p-4">
            <div className="max-h-64 overflow-y-auto">
              {userData.shippingAddresses && userData.shippingAddresses.length > 0 ? (
                userData.shippingAddresses.map((address) => (
                  <div key={address._id} className="mb-3 last:mb-0">
                    <div
                      className="p-3 text-black flex justify-between items-center cursor-pointer border border-gray-300 mr-2"
                      onClick={() => toggleAddressDetails(address._id)}
                    >
                      <div>
                        <p className="font-medium">{address.firstName} {address.lastName}</p>
                        <p className="text-sm text-gray-400">{address.city}</p>
                      </div>
                      {expandedAddressId === address._id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </div>

                    {expandedAddressId === address._id && (
                      <div className="p-3 bg-opacity-50 mt-px mr-2 border border-secondary bg-secondary flex justify-between">
                        <div>
                          <p className="text-sm">Address: {address.address}</p>
                          {address.apartment && <p className="text-sm">Apartment: {address.apartment}</p>}
                          <p className="text-sm">City & Postal: {address.city}, {address.postalCode}</p>
                          <p className="text-sm">Phone Number: {address.phone}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <MdDeleteOutline
                            size={30}
                            className="bg-gray-100/20 p-1 rounded-full cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              openDeleteModal('shipping', address);
                            }}
                          />
                          <MdOutlineModeEdit
                            size={30}
                            className="bg-gray-100/20 p-1 rounded-full cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              openModal('shipping', address);
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No shipping addresses found.</p>
              )}
            </div>
            <button
              className="mt-3 flex items-center gap-2 text-[#0690f3] hover:text-blue-400 transition-colors"
              onClick={() => openModal('shipping')}
            >
              <Plus size={16} />
              <span className="text-sm">Add New Address</span>
            </button>
          </div>
        )}
      </div>

      {/* Billing Addresses */}
      <div className="bg-white overflow-hidden shadow-lg border border-secondary mt-6">
        <div
          className="bg-secondary px-4 py-3 flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('billing')}
        >
          <div className="flex items-center gap-2">
            <CreditCard size={20} />
            <h6 className="font-bold">Billing Addresses</h6>
          </div>
          {expandedSection === 'billing' ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </div>

        {expandedSection === 'billing' && (
          <div className="p-4">
            <div className="max-h-64 overflow-y-auto">
              {userData.billingAddresses && userData.billingAddresses.length > 0 ? (
                userData.billingAddresses.map((address) => (
                  <div key={address._id} className="mb-3 last:mb-0">
                    <div
                      className="p-3 text-black flex justify-between items-center cursor-pointer border border-gray-300 mr-2"
                      onClick={() => toggleAddressDetails(`billing-${address._id}`)}
                    >
                      <div>
                        <p className="font-medium">{address.firstName} {address.lastName}</p>
                        <p className="text-sm text-gray-400">{address.city}</p>
                      </div>
                      {expandedAddressId === `billing-${address._id}` ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </div>

                    {expandedAddressId === `billing-${address._id}` && (
                      <div className="p-3 bg-opacity-50 mt-px mr-2 border border-secondary bg-secondary flex justify-between">
                        <div>
                          <p className="text-sm">Address: {address.address}</p>
                          {address.apartment && <p className="text-sm">Apartment: {address.apartment}</p>}
                          <p className="text-sm">{address.city}, {address.postalCode}</p>
                          <p className="text-sm">Phone Number: {address.phone}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <MdDeleteOutline
                            size={30}
                            className="bg-gray-100/20 p-1 rounded-full cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              openDeleteModal('billing', address);
                            }}
                          />
                          <MdOutlineModeEdit
                            size={30}
                            className="bg-gray-100/20 p-1 rounded-full cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              openModal('billing', address);
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No billing addresses found.</p>
              )}
            </div>
            <button
              className="mt-3 flex items-center gap-2 text-[#0690f3] hover:text-blue-400 transition-colors"
              onClick={() => openModal('billing')}
            >
              <Plus size={16} />
              <span className="text-sm">Add New Address</span>
            </button>
          </div>
        )}
      </div>

      {/* Address Modal for Add/Edit */}
      <AddressModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        addressType={addressType}
        addressData={currentAddress}
        onSave={handleSaveAddress}
        isEdit={isEditing}
      />
      
      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteAddress}
        addressType={addressType}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default AddressManagement;