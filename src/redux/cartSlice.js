import { createSlice } from "@reduxjs/toolkit";
import { selectAllProducts } from "./productSlice";

// Load cart and wishlist from local storage if they exist
const loadFromLocalStorage = (key, fallback) => {
  if (typeof window !== "undefined") {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : fallback;
  }
  return fallback;
};

const initialState = {
  cart: loadFromLocalStorage("cart", []),
  wishlist: loadFromLocalStorage("wishlist", []),
  isCartOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },

    addToCart: (state, action) => {
      const { category, productId, color } = action.payload;
      const existingItem = state.cart.find(
        (item) =>
          item.category === category &&
          item.productId === productId &&
          item.color === color
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ category, productId, color, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    removeFromCart: (state, action) => {
      const { productId, color } = action.payload;
      state.cart = state.cart.filter(
        (item) => !(item.productId === productId && item.color === color)
      );
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    incrementQuantity: (state, action) => {
      const { productId, color } = action.payload;
      const item = state.cart.find(
        (product) => product.productId === productId && product.color === color
      );

      if (item) {
        item.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },

    decrementQuantity: (state, action) => {
      const { productId, color } = action.payload;
      const item = state.cart.find(
        (product) => product.productId === productId && product.color === color
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },

    addToWishlist: (state, action) => {
      const productId = action.payload;
      if (!state.wishlist.includes(productId)) {
        state.wishlist.push(productId);
        localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
      }
    },

    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.wishlist = state.wishlist.filter((id) => id !== productId);
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },

    hydrateCartFromLocalStorage: (state) => {
      if (typeof window !== "undefined") {
        const cart = localStorage.getItem("cart");
        const wishlist = localStorage.getItem("wishlist");
        state.cart = cart ? JSON.parse(cart) : [];
        state.wishlist = wishlist ? JSON.parse(wishlist) : [];
      }
    },

    clearCart: (state) => {
      state.cart = [];
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

// Compute cart total price using product data
export const selectCartTotal = (state) => {
  const allProducts = selectAllProducts(state); // Get all products from product slice

  return state.cart.cart.reduce((total, cartItem) => {
    const product = allProducts.find((p) => p.productID === cartItem.productId);
    return product ? total + product.nowPrice * cartItem.quantity : total;
  }, 0);
};

export const selectCartLength = (state) =>
  state.cart.cart.reduce((totalItems, item) => totalItems + item.quantity, 0);

export const selectWishlistLength = (state) => state.cart.wishlist.length;

export const {
  toggleCart,
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  addToWishlist,
  removeFromWishlist,
  hydrateCartFromLocalStorage,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
