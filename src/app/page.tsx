import Feed from "@/components/Feed"

type Props = {}

export default function Home({}: Props) {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Descubre y Comparte
            <br className="max-md:hidden" />
            <span className="green_gradient">Comandos energizados con IA</span>
        </h1>
        <p className="desc text-center">
            Esta aplicación está diseñada con la intención de crear, compartir y descubrir comandos para IA (inteligencias artificiales). 
            Es un proyecto abierto, para un mundo moderno y mas interactivo.
        </p>
        <Feed />
    </section>
  )
}