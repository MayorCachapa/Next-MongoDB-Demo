import Link from 'next/link';
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
    const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement> ) => {
        setPost({
            ...post,
            prompt: e.target.value,
        })
    }

    const handleChangeTag = (e: React.ChangeEvent<HTMLInputElement> ) => {
        setPost({
            ...post,
            tag: e.target.value,
        })
    }
  return (
    <section className='w-full max-w-full flex-start flex-col'>
        <h1 className='head_text text-left'>
            <span className='blue_gradient'>{type} un Post</span>
        </h1>
        <p className='desc text-left max-w-md'>
            {type} y compartir un comando para IA con el mundo. Deja tu imaginación fluir!
        </p>
        <form onSubmit={handleSubmit} className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
            <label htmlFor="text-area-prompt">Tu comando va aquí.</label>
            <textarea 
            name="text-area-prompt" 
            id="text-area-prompt" 
            cols={30} 
            rows={10} 
            placeholder='Quiero una función que...'
            className='form_textarea'
            onChange={handleChangeText}
            defaultValue={post.prompt}
            />
            <label htmlFor="text-area-tag">Tu etiqueta va aquí.</label>
            <input 
            name="text-area-tag" 
            id="text-area-tag" 
            placeholder='#WebDev #JavaScript #React'
            className='form_input'
            onChange={handleChangeTag}
            defaultValue={post.tag}
            />
            <div className='flex-end mx-3 mb-5 gap-4'>
                <Link href="/" className="text-slate-400 text-sm">
                    Cancel
                </Link>
                <button type="submit" disabled={submitting} className='slate_btn'>
                    {submitting ? `${type}...` : type}
                </button>
            </div>
        </form>
    </section>
  )
}