import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Spinner from "react-bootstrap/Spinner";
const Dashboard = lazy(() => import('../pages/UserDashboard'));
const LoginPage = lazy(() => import('../pages/Login'));
const UserDetails = lazy(() => import('../pages/UserDetails'));

export default function Routers() {

    return (
        <>
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" replace />} />
                        <Route path="/home-page/:userId" element={<Dashboard />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/user/:id/books" element={<UserDetails />} />
                    </Routes>
                </Suspense>
            </Router>
        </>
    );
}
