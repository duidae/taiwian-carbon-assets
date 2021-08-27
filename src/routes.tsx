import {useRoutes} from "react-router-dom";
import DashboardLayout from "./DashboardLayout";

export const Router = () => {
    return useRoutes([{path: "/", element: <DashboardLayout />}]);
};
