'use client'
import { useState } from "react"
import { useSession } from "next-auth/react"
import router, { useRouter } from "next/router"
import Form from "@/components/Form"

type Props = {}

export default function CreatePrompt({}: Props) {
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    })

    const createPost = async (e: React.FormEvent) => {
      e.preventDefault();
      // setSubmitting is set to true to trigger the loading effect later on
      setSubmitting(true);
      // A request is made to the API endpoint prompt/new
      try {
        const response = await fetch('/api/post/new', {
          method: 'POST',
          body: JSON.stringify({
            prompt: post.prompt,
            userId: session?.user.id,
            tag: post.tag
          })
        })
        
        if (response.ok) {
          router.push('/')
        }

      } catch (error) {
        console.log(error)
        throw(error)
        
      } finally {
        setSubmitting(false);

      }

    }

  return (
    <Form 
    type="Crear"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={createPost}
    
    />
  )
}