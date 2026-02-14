import { BrowserRouter,Routes,Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SignUp from "./components/sign-up";
import SignIn from "./components/sign-in";
import Dashboard from "./components/dashboard";
import SendMoney from "./components/send";

function App(){

  return (
    <>
      <BrowserRouter>
        <Routes>
           <Route path="/sign-up" element={<SignUp />} />
           <Route path="/sign-in" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/send" element={<SendMoney />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
