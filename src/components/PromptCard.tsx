import React from 'react'

type PromptProps = {
  data: { 
    prompt: string
    tag: string
    _id: string
  }
  handleTagClick: () => void  
}

export default function PromptCard({ data, handleTagClick }: PromptProps) {
  return (
    <div>PromptCardList</div>
  )
}