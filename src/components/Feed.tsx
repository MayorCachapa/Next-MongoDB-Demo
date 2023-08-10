'use client'
import { useState, useEffect } from 'react'
import PromptCard from './PromptCard';

type Props = {}

type Post = {
  prompt: string
    tag: string
    _id: string
}

type PromptListProps = {
  data: Post[]
  handleTagClick: () => void  
}

function PromptCardList({ data, handleTagClick }: PromptListProps) {
  return (
    <div className='mt-16 prompt_layout'>
      { data.map((item) => (
        <PromptCard 
        key={item._id}
        data={item}
        handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

export default function Feed({}: Props) {
  const [searchText, setSearchText] = useState('')

  const [posts, setPosts] = useState([])
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/post');
        const data = await response.json();
        
        setPosts(data)
      } catch (error) {
        console.log(error);
        throw error;
      }
    }

    fetchPosts();
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchText(() => {

    })

  }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
        type="text"
        placeholder='Busca tags o usuarios'
        value={searchText}
        onChange={}
        required
        className='search_input peer'
        />
      </form>
      <PromptCardList 
      data={posts}
      handleTagClick={ () => {} }
      />
    </section>
  )
}