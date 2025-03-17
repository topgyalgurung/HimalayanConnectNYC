"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function UserAvatar() {
  const { data: session } = useSession();
  const userImage = session?.user?.image || "https://i.pravatar.cc/300";

  if (!session?.user) return null;

  return (
    <div>
      <Image
        src={userImage}
        alt="User Avatar"
        width={40}
        height={40}
        className="rounded-full"
      />
    </div>
  );
}
