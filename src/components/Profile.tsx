import { PostDocument } from "../../models/post"

type ProfileProps = {
    name: string,
    desc: string,
    handleEdit: () => void
    handleDelete: () => void
    data: PostDocument[]
}

export default function Profile({name, desc, handleEdit, handleDelete, data }: ProfileProps) {
  return (
    <div></div>
  )
}