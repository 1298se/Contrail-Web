import { RouteProps } from "react-router";

export interface IAuthorizedRouteProps extends RouteProps {
    authToken?: string | null;
    authRoute?: string | null;
    component?: any;
}
