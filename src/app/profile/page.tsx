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

  const handleDelete = async (post: PostDocument) => {
    // Pass a confirm message, with the method confirm (built in the browser API)
    const confirmed = confirm("¿Estás seguro que quieres borrar tu publicación? Este efecto es permanente y no puede ser revertido")
    // If the user confirms the decision
    if (confirmed) {
      try {
        // Call the endpoint with method DELETE, passing the targeted post._id
        await fetch(`api/post/${post._id}`, {
          method: "DELETE"
        })

      } catch (error) {
        console.log(error)
        throw(error)
      }
    }
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
