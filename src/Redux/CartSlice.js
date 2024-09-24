import { createSlice } from "@reduxjs/toolkit";
import { json } from "react-router-dom";

const localStorageState=JSON.parse(localStorage.getItem('Pride_cart'));
console.log(typeof(localStorageState));

const initialState = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
};

const CartSlice = createSlice({
  name: "cart",
  initialState:localStorageState? localStorageState:initialState,
  reducers: {
    addItem: (state, action) => {
      const ExistingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (ExistingItem) {
        const UpdatedItem = state.items.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else return item;
        });
        state.items = UpdatedItem;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalPrice += action.payload.price;
      state.totalQuantity += 1;
      console.log(state.totalPrice,state.totalQuantity);
      const storage={
        items: state.items,
        totalPrice: state.totalPrice,
        totalQuantity: state.totalQuantity
      };
      localStorage.setItem('Pride_cart',JSON.stringify(storage));
    },
    deleteItem: (state, action) => {
      const UpdatedItem = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      state.items = UpdatedItem;
      state.totalPrice -= action.payload.quantity * action.payload.price;
      state.totalQuantity -= action.payload.quantity;
      const storage={
        items: state.items,
        totalPrice: state.totalPrice,
        totalQuantity: state.totalQuantity
      };
      localStorage.setItem('Pride_cart',JSON.stringify(storage));
    },
    plusItem: (state, action) => {
      const UpdatedItem = state.items.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: item.quantity + 1 };
        } else return item;
      });
      state.items = UpdatedItem;
      state.totalPrice += action.payload.price;
      state.totalQuantity += 1;
      const storage={
        items: state.items,
        totalPrice: state.totalPrice,
        totalQuantity: state.totalQuantity
      };
      localStorage.setItem('Pride_cart',JSON.stringify(storage));
    },
    minusItem: (state,action) => {
      if (action.payload.quantity===1) {
        const UpdatedItem = state.items.filter((item) => item.id!==action.payload.id);
        state.items = UpdatedItem;
      } else {
        const ExistingItem=state.items.map(item=>{
          if(item.id===action.payload.id){
            return {...item,quantity:item.quantity-1};
          }
          else return item;
        });
        state.items=ExistingItem;
      }
      state.totalPrice -= action.payload.price;
      state.totalQuantity -= 1;
      const storage={
        items: state.items,
        totalPrice: state.totalPrice,
        totalQuantity: state.totalQuantity
      };
      localStorage.setItem('Pride_cart',JSON.stringify(storage));
    },
    clearCart:(state)=>{
      state.item=[];
      state.totalPrice=0;
      state.totalQuantity=0;
      const storage={
        items: state.items,
        totalPrice: state.totalPrice,
        totalQuantity: state.totalQuantity
      };
      localStorage.setItem('Pride_cart',JSON.stringify(storage));
    }
  },
});
export default CartSlice.reducer;
export const { addItem, deleteItem, plusItem, minusItem, clearCart } = CartSlice.actions;
