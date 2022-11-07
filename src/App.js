import { Routes, Route } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Account from "./components/Account";
import Welcome from "./components/Welcome";
import { AuthContextProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./components/ForgotPasswordPage"
import Verification from "./components/Verification";
import Categories from "./components/Categories";
import Meat from "./components/Items/Meat";
import Dairy from "./components/Items/Dairy";
import Drink from "./components/Items/Drink";
import ReadyMade from "./components/Items/Ready";
import Veg from "./components/Items/Veg";
import Sweet from "./components/Items/Sweet";
import Toilet from "./components/Items/Toilet";
import ShoppingList from "./components/ShoppingList";
import HomeCart from "./components/HomeCart";


function App() {
  return (

    <div>

      <AuthContextProvider>
        {/* all routes to be used*/}
        <Routes>
          {/*individual routes */}
          <Route path= '/' element={<Welcome/>}/>
          <Route path= '/signin' element={<Signin/>}/>
          <Route path= '/signup' element={<Signup/>}/>
          <Route path = '/forgot-password' element={<ForgotPassword />}/>
          <Route path='/verification' element={<Verification/>}/>
          <Route path='/categories' element={<ProtectedRoute>
            <Categories/>
          </ProtectedRoute>}/>
          <Route path='/meat' element={<ProtectedRoute>
            <Meat/>
          </ProtectedRoute>}/>
          <Route path='/dairy' element={<ProtectedRoute>
            <Dairy/>
          </ProtectedRoute>}/>
          <Route path='/drink' element={<ProtectedRoute>
            <Drink/>
          </ProtectedRoute>}/>
          <Route path='/ready' element={<ProtectedRoute>
            <ReadyMade/>
          </ProtectedRoute>}/>
          <Route path='/veg' element={<ProtectedRoute>
            <Veg/>
          </ProtectedRoute>}/>
          <Route path='/sweet' element={<ProtectedRoute>
            <Sweet/>
          </ProtectedRoute>}/>
          <Route path='/toilet' element={<ProtectedRoute>
            <Toilet/>
          </ProtectedRoute>}/>
          <Route path='/cart' element={<ProtectedRoute>
            <ShoppingList/>
          </ProtectedRoute>}/>
          <Route path='/home_cart' element={<ProtectedRoute>
              <HomeCart/>
          </ProtectedRoute>}/>


          {/*protected route*/}
          <Route path= '/account' element={<ProtectedRoute>
            <Account/>
          </ProtectedRoute>}/>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
