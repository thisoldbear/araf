import React from "react";
import styles from "../../styles/Home.module.css";

interface RouteCardProps {
  name: String;
  distance: Number;
}

export const RouteCard: React.FC<RouteCardProps> = ({ id, name, distance }) => (
  <div className={styles.card}>
    <p>{name}</p>
    <p>{distance}km</p>
  </div>
);
