import React from "react";
import Link from "next/link";
import { RouteCategories } from "../../types";

import styles from "./RouteCard.module.css";

export interface RouteCardProps {
  url: string;
  name: string;
  distance: number;
  category: RouteCategories;
  thumbnail: string;
}

export const RouteCard: React.FC<RouteCardProps> = ({
  url,
  name,
  distance,
  category,
  thumbnail,
}) => (
  <div className={styles.card}>
    <Link href={url}>
      <a className={styles.link}>
        <img src={thumbnail} className={styles.thumbnail} />
        <div className={styles.inner}>
          <h3>{name}</h3>
          <p>{distance}km</p>
          <small className={styles.label}>{RouteCategories[category]}</small>
        </div>
      </a>
    </Link>
  </div>
);
