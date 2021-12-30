import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload]
    },
    setQty: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);

      let newBasket = [...state.items];

      newBasket[index].quantity = action.payload.quantity;

      state.items = newBasket;
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(basketItem => basketItem.id === action.payload.id);

      let newBasket = [...state.items];

      if(index >= 0) {
        //the item exist and remove it
        newBasket.splice(index, 1); 
      } else {
        console.warn(`Can't remove product (id: ${action.payload.id}) as it's not in the basket`)
      }

      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket, setQty } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) => state.basket.items.reduce((total, item) => total + (item.price * item.quantity), 0);

export default basketSlice.reducer;
