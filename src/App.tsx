import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Registration/Register";
import Home from "./pages/Home/Home";
import Game from "./pages/Game/Game";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={ <ProtectedRoute> <Home /> </ProtectedRoute> }/>
      <Route path="/game/:category" element={ <ProtectedRoute> <Game /> </ProtectedRoute>}/>
    </Routes>
  );
}

export default App;