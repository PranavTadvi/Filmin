import { Route, Routes } from "react-router-dom";
import Cards from "./components/Cards";
import Header from "./components/Header";
import AddMovie from "./components/AddMovie";
import Details from "./components/Details";
import { createContext, useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";

const AppState = createContext();
function App() {
  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");
  return (
    <AppState.Provider value={(login, userName, setLogin, setUserName)}>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Cards />} />
          <Route path="/addmovie" element={<AddMovie />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </>
    </AppState.Provider>
  );
}

export default App;
export { AppState };
