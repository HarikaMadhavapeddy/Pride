import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RootPage from "./pages/RootPage";
import Cart from "./pages/Cart";
import Error from "./pages/Error";
import ProductPage from "./pages/ProductPage";
import WelcomePage from "./pages/Welcomepage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgetPwd from "./pages/ForgetPwd";
import { useEffect } from "react";
import { auth } from "./Firebase/Firebase";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "./Redux/AuthSlice";
import PublicRoute from "./Routes/PublicRoute";
import Orders from "./pages/Orders";
import PrivateRoute from "./Routes/PrivateRoute";
import Profile from "./pages/Profile";
import { FetchAddress } from "./Redux/AddressSlice";
import ManageAddress from "./pages/ManageAddress";
import Address from "./pages/Address";
import Payment from "./pages/Payment";
import ManageCards from "./pages/ManageCards";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <Error />,
    id: "products-data",
    children: [
      {
        index: true,
        element: <WelcomePage />,
      }, //index:true value is same as path:'/', when child component should be rendered in default position
      //loader property loads the data when the page is rendered and not when the child element is rendered
      { path: "cart", element: <Cart /> },
      { path: "products", element: <HomePage /> },
      //useLoaderdata() method can be used to retrive loader data within that object.
      //useRouteLoaderdata() method can be used to retrieve loader data from parent object.
      { path: "products/:productId", element: <ProductPage /> },
      {
        path: "login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "signup",
        element: (
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        ),
      },
      { path: "forgetPwd", element: <ForgetPwd /> },
      {
        path: "orders",
        element: (
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "manageAddress",
        element: (
          <PrivateRoute>
            <ManageAddress />
          </PrivateRoute>
        ),
      },
      {
        path: "address",
        element: (
          <PrivateRoute>
            <Address />
          </PrivateRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "manage",
        element: (
          <PrivateRoute>
            <ManageCards />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

function App() {
  const dispatch=useDispatch();
  console.log('Harika');
  useEffect(() => {
    console.log(auth);
    const subscription = auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        dispatch(
          setUser({ uid: user.uid, email: user.email, name: user.displayName })
        );
        dispatch(FetchAddress(user.uid));
      } else {
        dispatch(clearUser());
      }
    });

    return subscription;
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
