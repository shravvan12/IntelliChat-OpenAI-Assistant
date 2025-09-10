import Header from "./components/Header.tsx";
import {Routes , Route} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import { useAuth } from "./context/AuthContext.tsx";
function App() {
  const auth = useAuth();
  return (
    
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {auth?.isLoggedIn && auth.user && (<Route path="/chat" element={<Chat/>}/>)}
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
}
export default App;