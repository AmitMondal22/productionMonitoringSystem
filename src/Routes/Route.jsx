import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login/Login";
import Layout from "../../components/common/Layout";
import Dashboard from "../pages/Dashboard";
import Graphview from "../pages/GraphView/Graphview";
import Hourlyassembly from "../pages/Hourlyassembly/Hourlyassembly";
import PlanActual from "../pages/Planactual/Planactual";
import Equipmentefficencysummery from "../pages/Equipmentefficencysummery/Equipmentefficencysummery";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route - redirect to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Login route - standalone without layout */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard route with layout wrapper */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
         <Route
          path="/planactual"
          element={
            <Layout>
              <PlanActual/>
            </Layout>
          }
        />

        <Route
          path="/graphview"
          element={
            <Layout>
              <Graphview/>
            </Layout>
          }
        />
         <Route
          path="/hourlyassembly"
          element={
            <Layout>
              <Hourlyassembly/>
            </Layout>
          }
        />


         <Route
          path="/equipmentefficencysummery"
          element={
            <Layout>
              <Equipmentefficencysummery/>
            </Layout>
          }
        />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
