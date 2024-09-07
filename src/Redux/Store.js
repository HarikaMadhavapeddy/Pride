import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productsSlice";
import logger from "redux-logger";
import AuthSlice from "./AuthSlice";
import CartSlice from "./CartSlice";
import SearchSlice from "./SearchSlice";
import AddressSlice from "./AddressSlice";

export const Store=configureStore({
    reducer:{
        shoppingProducts:productsSlice,
        shoppingAuth:AuthSlice,
        shoppingCart:CartSlice,
        shoppingSearch:SearchSlice,
        UserAddress:AddressSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
