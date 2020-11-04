import React from "react";
import Link from "next/link";
import { useUser } from "../../utils/auth/useUser";
import styles from "./Header.module.css";

export interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const { user, logout } = useUser();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div>
          <Link href="/">
            <a>Home</a>
          </Link>
        </div>
        <div>
          {user?.email && (
            <Link href="/user">
              <a>My Account &#10141;</a>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
