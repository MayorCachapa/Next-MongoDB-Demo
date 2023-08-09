import React from 'react'

type PostType = {
    prompt: string;
    tag: string;
}

type FormProps = {
    type: string;
    setPost: React.Dispatch<React.SetStateAction<PostType>>;
    post: PostType;
    submitting: boolean;
    handleSubmit: (e: React.FormEvent) => void;
}

export default function Form({ type, setPost, post, submitting, handleSubmit }: FormProps) {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement> ) => {
        setPost({
            ...post,
            prompt: e.target.value,
        })
    }
  return (
    <section className='w-full max-w-full flex-start flex-col'>
        <h1 className='head_text text-left'>
            <span className='blue_gradient'>{type} un Post</span>
        </h1>
        <p className='desc text-left max-w-md'>
            {type} y comparte un comando para IA con el mundo. Deja tu imaginación fluir!
        </p>
        <form onSubmit={handleSubmit} className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
            <label htmlFor="text-area-prompt">Tu comando va aquí. También puedes incluir imágenes!</label>
            <textarea 
            name="text-area-prompt" 
            id="text-area-prompt" 
            cols={30} 
            rows={10} 
            placeholder='Quiero una función que...'
            className='form_textarea'
            onChange={handleChange}
            />
        </form>
    </section>
  )
}