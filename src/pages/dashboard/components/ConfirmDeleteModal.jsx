import React from 'react';
import { X } from 'lucide-react';
import { MdDeleteSweep } from 'react-icons/md';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, addressType, isDeleting }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="bg-white text-black shadow-xl w-full max-w-md z-10 relative">
        <div className="flex justify-between items-center p-4 border-b-2 border-secondary">
          <h3 className="text-lg text-secondary font-bold flex items-center gap-2"><MdDeleteSweep size={25}/>Confirm Deletion</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <p className="mb-4">
            Are you sure you want to delete this {addressType === 'shipping' ? 'shipping' : 'billing'} address? 
            This action cannot be undone.
          </p>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isDeleting}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:bg-red-300 cursor-pointer"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;