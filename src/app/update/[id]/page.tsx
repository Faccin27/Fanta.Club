"use client";

import UpdateAnun from "@/components/updateAnun";
import { checkLoginStatus, User } from "@/utils/auth";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Checking() {
  const [id, setId] = useState<number>();
  const [usere, setUsere] = useState<User | null>(null);
  const path = usePathname();

  useEffect(() => {
    const fetchUserDatra = async () => {
      try {
        const { isLoggedIn, user } = await checkLoginStatus();
        if (isLoggedIn && user && (user.role === "FANTA" || user.role === "Moderator")) {
          setUsere(user);
          setId(user.id);
        } else {
          window.location.href = "/";
        }
      } catch (err) {
        throw new Error(`Internal Server Error to fetch the user`);
      }
    };
    fetchUserDatra();
  }, []);

  useEffect(() => {
    if (!usere?.id) return;
    const handleChangeValue = async () => {
      try {
        await fetch(`http://localhost:3535/users/${usere.id}/up`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            updating: true,
          }),
        });
      } catch (err) {
        throw new Error(`Internal Server Error to change the user "updating"`);
      }
    };
    handleChangeValue();
  }, [usere]);


  const identityty = path.split("/update/")[1];

  console.debug(identityty);

  return <UpdateAnun LogedUser={usere} identity={Number(identityty)} />;
}
