// Address service for handling API calls related to addresses

const serverURL = import.meta.env.VITE_SERVER_URL;

// Add a new address (shipping or billing)
export const addAddress = async (addressType, addressData, email) => {
  try {
    const response = await fetch(`${serverURL}/playbox_user/address`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        addressType, // 'shipping' or 'billing'
        addressData,
      }),
    });

    const result = await response.json();
    
    if (result.statusCode !== 200) {
      throw new Error(result.message || 'Failed to add address');
    }
    
    return result.data;
  } catch (error) {
    console.error(`Error adding ${addressType} address:`, error);
    throw error;
  }
};

// Update an existing address
export const updateAddress = async (addressType, addressId, addressData, email) => {
  try {
    const response = await fetch(`${serverURL}/playbox_user/address/${addressId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        addressType, // 'shipping' or 'billing'
        addressData,
      }),
    });

    const result = await response.json();
    
    if (result.statusCode !== 200) {
      throw new Error(result.message || 'Failed to update address');
    }
    
    return result.data;
  } catch (error) {
    console.error(`Error updating ${addressType} address:`, error);
    throw error;
  }
};

// Delete an address
export const deleteAddress = async (addressType, addressId, email) => {
  try {
    const response = await fetch(`${serverURL}/playbox_user/address/${addressId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        addressType, // 'shipping' or 'billing'
      }),
    });

    const result = await response.json();
    
    if (result.statusCode !== 200) {
      throw new Error(result.message || 'Failed to delete address');
    }
    
    return result.data;
  } catch (error) {
    console.error(`Error deleting ${addressType} address:`, error);
    throw error;
  }
};