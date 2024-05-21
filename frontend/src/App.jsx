import { Route } from "react-router-dom/cjs/react-router-dom.min"
import HomePage from "./pages/HomePage"
import ChatPage from "./pages/ChatPage"

function App() {


  return (
    <>
    
      <Route path='/' component={HomePage} exact/>
      <Route path='/chats' component={ChatPage} />
  
      
    </>
  )
}

export default App
