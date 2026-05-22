import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";

import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import EventDetails from "../pages/EventDetails";
import CreateEvent from "../pages/CreateEvent";
import Events from "../pages/Events";

import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/events" element={<Events />} />
          {/* 🔒 protected route */}
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateEvent />
              </ProtectedRoute>
            }
          />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}