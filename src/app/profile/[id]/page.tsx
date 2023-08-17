"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@/components/Profile";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export default function UserProfile({ params }: Params) {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`)
      const data = await response.json()

      setUserPosts(data);
    }

    if (params?.id) fetchPosts();
  }, [params?.id])
  
  return (
  <Profile 
    name={userName || "error"}
    desc={`Welcome to ${userName}'s profile page.`}
    data={userPosts}
  />
  );
}
