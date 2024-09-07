import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, push, ref, remove, set } from "firebase/database";
import { auth, database } from "../Firebase/Firebase";

const initialState = {
  loading: false,
  error: null,
  data: [],
};
export const FetchAddress = createAsyncThunk(
  "address/fetchAdress",
  async (uid, { rejectWithValue }) => {
    try {
      const addressRef = ref(database, `userAdresses/${uid}`);
      const snapShot = await get(addressRef);
      if (snapShot.exists()) {
        return Object.entries(snapShot.val()).map(([key, address]) => ({
          key,
          ...address,
        }));
      } else {
        return [];
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const AddAddress = createAsyncThunk(
  "address/addAdress",
  async (newAddress, { rejectWithValue }) => {
    try {
      const addressRef = ref(database, `userAdresses/${auth.currentUser.uid}`);
      const newAdressRef = await push(addressRef, newAddress);
      return { key: newAdressRef.key, ...newAddress };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const DeleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (key, { rejectWithValue }) => {
    try{
        const DeleteAddressRef = ref(database, `userAdresses/${auth.currentUser.uid}/${key}`);
        await remove(DeleteAddressRef);
        return key;

    }catch(error){
        return rejectWithValue(error.message);
    }
  }
);
export const UpdateAddress=createAsyncThunk('address/updateAddress',async(updatedAddress,{rejectWithValue})=>{
    try{
        const UpdateAddressRef = ref(database, `userAdresses/${auth.currentUser.uid}/${updatedAddress.key}`);
        await set(UpdateAddressRef,updatedAddress);
        return updatedAddress;
    }catch(error){
        return rejectWithValue(error.message);
    }
});
const AddressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(FetchAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(FetchAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(AddAddress.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(DeleteAddress.fulfilled,(state,action)=>{
        state.data=state.data.filter(address=>address.key!==action.payload);
      })
      .addCase(UpdateAddress.fulfilled,(state,action)=>{
        const index=state.data.findIndex(address=>address.key===action.payload.key);
        if(index!==-1){
            state.data[index]=action.payload;
        }
      })
  },
});
export default AddressSlice.reducer;
