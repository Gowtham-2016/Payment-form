import * as React from "react";
import "./App.css";
import SnackbarProvider from "./components/SnackbarComponent/SnackbarProvider";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Payment } from "./pages/Payment";
import Login from "./pages/Login";

export default function App() {

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
}
