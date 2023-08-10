import { useState } from "react"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import { PostDocument } from "../../models/post"
import Image from "next/image"

type PromptProps = {
  data: PostDocument;
  handleTagClick: () => void  
}

export default function PromptCard({ data, handleTagClick }: PromptProps) {
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image src={data.creator.image} alt={data.creator.username} width={40} height={40} className="rounded-full object-contain" />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-slate-700">{data.creator.username}</h3>
            <h3 className="font-inter text-sm text-slate-500">{data.creator.email}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}