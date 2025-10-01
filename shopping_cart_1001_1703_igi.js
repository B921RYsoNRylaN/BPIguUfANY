// 代码生成时间: 2025-10-01 17:03:46
// Import required modules
const { Vercel } = require('next')
const { createStore } = require('redux')
const { Provider, useSelector, useDispatch } = require('react-redux')

// Define the initial state of the cart
const initialState = {
  items: [],
  total: 0
};

// Define the actions that can be dispatched
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const CHECKOUT = 'CHECKOUT'

// Define the reducer function to update the state based on actions
function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM: {
      // Check if item already exists in the cart
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id)
      if (existingItemIndex > -1) {
        // If item exists, increment the quantity
        return {
          ...state,
          items: state.items.map((item, index) =>
            index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
          ),
          total: state.total + action.payload.price
        }
      } else {
        // If item does not exist, add the item to the cart
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
          total: state.total + action.payload.price
        }
      }
    }
    case REMOVE_ITEM: {
      // Find the item index and remove it from the cart
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload)
      if (existingItemIndex > -1) {
        return {
          ...state,
          items: state.items.filter((item, index) => index !== existingItemIndex),
          total: state.total - state.items[existingItemIndex].price * state.items[existingItemIndex].quantity
        }
      } else {
        // Item not found in the cart, return the current state
        return state
      }
    }
    case CHECKOUT: {
      // Reset the cart after checkout
      return {
        ...state,
        items: [],
        total: 0
      }
    }
    default:
      return state
  }
}

// Create the Redux store
const store = createStore(cartReducer)

// Define a custom hook to use the cart state and dispatch actions
function useCart() {
  return {
    items: useSelector(state => state.items),
    total: useSelector(state => state.total),
    addItem: useDispatch()(ADD_ITEM),
    removeItem: useDispatch()(REMOVE_ITEM),
    checkout: useDispatch()(CHECKOUT),
  }
}

// Export the store and the custom hook
module.exports = {
  store,
  useCart,
};