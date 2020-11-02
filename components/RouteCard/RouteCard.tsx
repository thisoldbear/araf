import React from "react";
import { RouteCategories } from "../../types";

import styles from "./RouteCard.module.css";

export interface RouteCardProps {
  name: String;
  distance: Number;
  category: RouteCategories;
}

export const RouteCard: React.FC<RouteCardProps> = ({
  name,
  distance,
  category,
}) => (
  <div className={styles.card}>
    <h3>{name}</h3>
    <p>{distance}km</p>
    <small>{RouteCategories[category]}</small>
  </div>
);
