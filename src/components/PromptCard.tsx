import { useState } from "react"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import { PostDocument } from "../../models/post"
import Image from "next/image"
import { CopyImg, TickImg } from "../../public/assets/exporter"

type PromptProps = {
  data: PostDocument;
  handleTagClick: (tagClicked: string) => void
  handleDelete?: () => void
  handleEdit?: () => void  
}

export default function PromptCard({ data, handleTagClick, handleDelete, handleEdit }: PromptProps) {
  const { data: session } = useSession();
  // State for pathName to check if the use is in their profile or in the main feed
  const pathName = usePathname();
  // To set the copied status, we useState with an empty string at first.
  const [copied, setCopied] = useState('')
  // A function is defined to set copied to the prompt value, changing the icon displayed
  const handleCopyClick = () => {
    setCopied(data.prompt);
    // navigator is used to write the data inside the clipboard 
    navigator.clipboard.writeText(data.prompt);
    // Finally, a timer is set to return the icons back to default state
    setTimeout(() => setCopied(''), 3000);
  }

  // useRouter to redirect to the userProfile:
  const router = useRouter();

  const handleProfileClick = () => {
    if (data.creator._id === session?.user.id) return router.push('/profile')

    router.push(`/profile/${data.creator.id}/?name=${data.creator.username}`)
  };

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
        <button className="copy_btn" onClick={handleCopyClick}>
          <Image src={ copied === data.prompt ? TickImg : CopyImg } alt="" width={12} height={12}/>
        </button>
      </div>
      <p className="my-4 font-satoshi text-sm text-slate-700">{data.prompt}</p>
      <p className="font-inter text-sm blue_gradient cursor-pointer" onClick={() => handleTagClick && handleTagClick(data.tag)}>{data.tag}</p>
      {session?.user.id === data.creator._id && pathName === '/profile' && (
        <div className="flex-center gap-4 mt-5 border-t border-slate-100 pt-3">
          <p className="font-inter outline_btn_card cursor-pointer" onClick={handleEdit}>Editar</p>
          <p className="font-inter slate_btn_card cursor-pointer" onClick={handleDelete}>Borrar</p>
        </div>
      )}
    </div>
  )
}