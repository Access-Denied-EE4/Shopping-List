import { Routes, Route,BrowserRouter } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Account from "./components/Account";
import { AuthContextProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./components/ForgotPasswordPage"
import Verification from "./components/Verification";
import Categories from "./components/Categories";
import NavBar from "./components/NavBar";
import Meat from "./components/Items/Meat";
import Dairy from "./components/Items/Dairy";
import Drink from "./components/Items/Drink";
import ReadyMade from "./components/Items/Ready";
import Veg from "./components/Items/Veg";
import Sweet from "./components/Items/Sweet";
import Toilet from "./components/Items/Toilet";
import ShoppingList from "./components/ShoppingList";

function App() {
  return (

    <div>

      <AuthContextProvider>
        {/* all routes to be used*/}
        <Routes>
          {/*individual routes */}
          <Route path= '/' element={<Signin/>}/>
          <Route path= '/signup' element={<Signup/>}/>
          <Route path = '/forgot-password' element={<ForgotPassword />}/>
          <Route path='/verification' element={<Verification/>}/>
          <Route path='/categories' element={<Categories/>}/>
          <Route path='/meat' element={<Meat/>}/>
          <Route path='/dairy' element={<Dairy/>}/>
          <Route path='/drink' element={<Drink/>}/>
          <Route path='/ready' element={<ReadyMade/>}/>
          <Route path='/veg' element={<Veg/>}/>
          <Route path='/sweet' element={<Sweet/>}/>
          <Route path='/toilet' element={<Toilet/>}/>
          <Route path='/cart' element={<ShoppingList/>}/>

          {/*protected route*/}
          <Route path= '/account' element={<ProtectedRoute>
            <Account/>
          </ProtectedRoute>}/>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

 function AppTesting() {
  return (
    <BrowserRouter>
    <App />
   </BrowserRouter>
  );
}

export default AppTesting;
