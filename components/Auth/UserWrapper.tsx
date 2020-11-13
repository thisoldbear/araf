import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "../../utils/auth/useUser";

interface UserWrapperProps {
  children: React.ReactNode;
}

export const UserWrapper: React.FC<UserWrapperProps> = ({ children }) => {
  const { user } = useUser();
  const [hasUser, setHasUser] = useState(false);

  useEffect(() => {
    if (user) {
      setHasUser(true);
    }
  }, [user]);

  return hasUser ? (
    <>{children}</>
  ) : (
    <Link href={"/auth"}>
      <a
        style={{
          display: "inline-block",
          color: "blue",
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        Sign in
      </a>
    </Link>
  );
};
