import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import ListPage from "./components/ListPage";
import DetailPage from "./components/DetailPage";
import UpdatePage from "./components/UpdatePage";

export default function App() {
  return (
    <div className="bg-light min-vh-100">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/list">
            HW 5-2 React CRUD
          </Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/list">
              List
            </Link>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Navigate to="/list" replace />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/update/:id" element={<UpdatePage />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </main>
    </div>
  );
}
