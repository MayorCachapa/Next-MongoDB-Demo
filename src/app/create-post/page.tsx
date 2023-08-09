'use client'
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Form from "@/components/Form"

type Props = {}

export default function CreatePrompt({}: Props) {
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    })

    const createPost = async (e: React.FormEvent) => {

    }

  return (
    <Form 
    type="Crea"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={createPost}
    
    />
  )
}