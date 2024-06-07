import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import Login from "./components/Authentication/Login";

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/chats' element={<ChatPage />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  );
}

export default App;
