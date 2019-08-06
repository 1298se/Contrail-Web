enum ResourceRoutes {
    files, favourites, shared, trash,
}

export interface IRouteMatchParams {
    route: keyof typeof ResourceRoutes;
}
