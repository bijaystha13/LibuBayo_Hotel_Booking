"use client";

import { useContext } from "react";
import { AuthContext } from "@/app/shared/Context/AuthContext";
import Link from "next/link";
import styles from "./NavBar.module.css";
import { FaSignOutAlt } from "react-icons/fa";

export default function AuthButton() {
  const authCtx = useContext(AuthContext);

  if (!authCtx.isLoggedIn) {
    return (
      <Link href="/login" className={styles.signInBtn}>
        Login
      </Link>
    );
  }

  //   return (
  //     <button onClick={authCtx.logout} className={styles.logoutBtn}>
  //       <FaSignOutAlt className={styles.logoutIcon} />
  //       Logout
  //     </button>
  //   );
}
