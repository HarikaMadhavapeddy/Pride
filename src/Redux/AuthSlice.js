import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase";

const initialState = {
  user: null,
  loading: true,
  error: null,
};
export const userSignUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password, name }, { rejectWithValue }) => {
    console.log(email, password, name);
    try {
      const signUpResponse = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = signUpResponse.user;
      await updateProfile(user, { displayName: name });
      //return { id: user.uid, name: user.displayName, email: user.email };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const LoginResponse = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return {
        id: LoginResponse.user.uid,
        name: LoginResponse.user.displayName,
        email: LoginResponse.user.email,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const userLogout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
/*export const userForgetPwd = createAsyncThunk(
  "auth/forgetPwd",
  async (email, { rejectWithValue }) => {
    try {
      console.log(email);
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);*/
export const ForgotPassword = createAsyncThunk(
  "user/resetpassword",
  async (email, { rejectWithValue }) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const userDelete = createAsyncThunk(
  "auth/userDelete",
  async (_, { rejectWithValue }) => {
    try {
      //console.log(id);
      await deleteUser(auth.currentUser);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading=false;
    },
    clearUser: (state) => {
      state.user = null;
      state.loading=false;
    },
  },
  extraReducers: (builder) => {
    builder
      /*.addCase(userSignUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(userSignUp.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(userSignUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })*/
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(userLogout.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(userDelete.pending, (state) => {
        state.loading = true;
      })
      .addCase(userDelete.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(userDelete.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default authSlice.reducer;
export const { setUser, clearUser } = authSlice.actions;
