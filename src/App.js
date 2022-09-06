import { Routes, Route } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Account from "./components/Account";
import { AuthContextProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./components/ForgotPasswordPage"
import Verification from "./components/Verification";
import Categories from "./components/Categories";

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
