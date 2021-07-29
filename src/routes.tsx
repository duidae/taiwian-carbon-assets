import {Navigate, useRoutes} from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import {DashboardApp} from './pages/DashboardApp';

export const Router = () => {
  return useRoutes([
    {path: '/', element: <DashboardLayout />}
  ]);
}
