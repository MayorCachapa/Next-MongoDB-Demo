'use client'
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Form from "@/components/Form"

type Props = {}

export default function CreatePrompt({}: Props) {
    // Search the router to push to the Edit page
    const router = useRouter();
    // Submitting is set to manage the load state between creating/editing posts
    const [submitting, setSubmitting] = useState(false);
    // We establish an empty post initially
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    })
    // with useSearchParams we find the id key passed to the URL
    const searchParams = useSearchParams();
    // Using get, we fetch the value of ID and save it in a const
    const postId = searchParams.get('id')

    console.log(postId)

    useEffect(() => {
        // call our Endpoint in the API to fetch the post instance
        const getPost = async () => {
            const response = await fetch(`/api/post/${postId}`)
            const data = await response.json()
            // Set post by passing the prompt and tag to the setPost state
            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }

        getPost();
    }, [postId])

    const updatePost = async (e: React.FormEvent) => {
      e.preventDefault();
      // setSubmitting is set to true to trigger the loading effect later on
      setSubmitting(true);
      // A request is made to the API endpoint prompt/new
      try {
        // Call the endpoint with a method 'PATCH'
        const response = await fetch(`/api/post/${postId}`, {
          method: 'PATCH',
          // Pass the body entered in the form and assign the JSON object the respecting key-value pairs
          body: JSON.stringify({
            prompt: post.prompt,
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
    type="Actualizar"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={updatePost}
    
    />
  )
}