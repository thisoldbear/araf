import React from "react";
import styles from "../../styles/Home.module.css";
import { RouteCategories } from "../../types";

export interface RouteCardProps {
  name: String;
  distance: Number;
  categories: Array<RouteCategories>;
}

export const RouteCard: React.FC<RouteCardProps> = ({
  name,
  distance,
  categories,
}) => (
  <div className={styles.card}>
    <p>{name}</p>
    <p>{distance}km</p>
    <p>{categories.map((cat) => RouteCategories[cat])}</p>
  </div>
);
