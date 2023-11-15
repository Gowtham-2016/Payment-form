import React from "react";
import "./App.css";
import SnackbarProvider from "./components/SnackbarComponent/SnackbarProvider";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Payment from "./pages/Payment";
import Login from "./pages/Login";

const App: React.FC = () => {
  return (
    <SnackbarProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Payment />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </SnackbarProvider>
  );
};

export default App;
