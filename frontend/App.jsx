import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./src/pages/Home";
import AnimalList from "./src/pages/AnimalList";
import AnimalProfile from "./src/pages/AnimalProfile";
import AdminDashboard from "./src/pages/AdminDashboard";
import AdoptionRequests from "./src/pages/AdoptionRequests";
import AdoptionTracking from "./src/pages/AdoptionTracking";
import Login from "./src/pages/Login";
import AnimalForm from "./src/pages/AnimalForm";
import { Navbar } from "./src/components/Navbar";
import { Footer } from "./src/components/Footer";
import ProtectedRoute from "./src/components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/animals" element={<AnimalList />} />
        <Route path="/animal/:id" element={<AnimalProfile />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/animal-form" element={<AnimalForm />} />
          <Route path="/admin/adoption-requests" element={<AdoptionRequests />} />
          <Route path="/admin/adoption-tracking" element={<AdoptionTracking />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;