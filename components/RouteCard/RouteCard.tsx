import React from "react";
import styles from "../../styles/Home.module.css";
import { RouteCategories } from "../../types";

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
    <p>{name}</p>
    <p>{distance}km</p>
    <p>{RouteCategories[category]}</p>
  </div>
);
