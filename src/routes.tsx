import {useRoutes} from "react-router-dom";
import {DashboardLayoutComponent} from "./components";

export const Router = () => {
    return useRoutes([{path: "/", element: <DashboardLayoutComponent />}]);
};
