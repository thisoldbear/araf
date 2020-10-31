export enum RouteCategories {
  Clwb,
  OK100,
  OK200,
  Adventure,
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
  name: string;
  distance: number;
  climbing: number;
  descending: number;
  gpx: string;
  gpxUrl: string;
  categories: Array<RouteCategories>;
  keys: Array<RouteKeys>;
}

export interface PathParams {
  [key: string]: string;
}

export interface Paths {
  [key: string]: PathParams;
}
