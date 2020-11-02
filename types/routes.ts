export enum RouteCategories {
  CLWB = "Clwb",
  OK100 = "OK100",
  OK200 = "OK200",
  ADVENTURE = "Adventure",
}

export enum RouteKeys {
  Chill,
  MixedSurfaces,
  OffRoad,
  WaterCrossing,
  HikeABike,
  Gates,
  FuelStop,
}

export interface Route {
  id: string;
  name: string;
  distance: number;
  climbing: number;
  descending: number;
  gpx: string;
  gpxUrl: string;
  category: RouteCategories;
  keys: Array<RouteKeys>;
}
