import { Routes, Route } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Account from "./components/Account";
import { AuthContextProvider } from "./contexts/AuthContext";

function App() {
  return (

    <div>
      <h1 className='text-center text-3xl fot-bold'>
      Firebase Auth + Conn
      </h1> 

      <AuthContextProvider>
        {/* all routes to be used*/}
        <Routes>
          {/*individual routes */}
          <Route path= '/' element={<Signin/>}/>
          <Route path= '/signup' element={<Signup/>}/>
          {/*private route*/}
          <Route path= '/account' element={<Account/>}/>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
