import { PostDocument } from "../../models/post"
import PromptCard from "./PromptCard"

type ProfileProps = {
    name: string,
    desc: string,
    handleEdit: (post: PostDocument) => void
    handleDelete: (post: PostDocument) => void
    data: PostDocument[]
}

export default function Profile({name, desc, handleEdit, handleDelete, data }: ProfileProps) {
  return (
    <section className="w-full">
        <h1 className="head_text text-left"><span className="blue_gradient">{name} Perfil</span></h1>
        <p className="desc text-left">{desc}</p>
        <div className="mt-10 prompt_layout">
            {data.map((item) => (
                <PromptCard
                key={item._id}
                data={item}
                handleEdit={() => handleEdit && handleEdit(item)}
                handleDelete={() => handleDelete && handleDelete(item)}
                handleTagClick={ () => {} }
                />
            ))}
        </div>
    </section>
  )
}