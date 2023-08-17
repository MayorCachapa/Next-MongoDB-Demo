"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@/components/Profile";
import { PostDocument } from "../../../models/post";

export default function MyProfile() {
  // Set the Router
  const router = useRouter();
  // Set the session data:
  const { data: session } = useSession();

  // Set the posts state to update the component and create posts
  const [posts, setPosts] = useState([]);

  // Fetch the posts for the user:
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();

        setPosts(data);
      } catch (error) {
        console.log(error);
        throw error;
      }
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post: PostDocument) => {
    router.push(`/update-post?id=${post._id}`)
  };

  const handleDelete = (post: PostDocument) => {
    
  };

  return (
    <Profile
      name="Mi"
      desc="Bienvenido a tu perfil, donde puedes ver, editar y borrar publicaciones hechas por ti!"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}
