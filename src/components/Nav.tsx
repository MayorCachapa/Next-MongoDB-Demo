'use client'
import Link from "next/link"
import Image from "next/image"
import { Logo, Profile } from "../../public/assets/exporter"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders, LiteralUnion, ClientSafeProvider } from 'next-auth/react'
import { BuiltInProviderType } from "next-auth/providers/index"

type Props = {}
type ProvidersType = Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null

export default function Nav({}: Props) {
    // const session = useSession();
    const user = true;
    const [providers, setProviders] = useState<ProvidersType>(null);
    
    useEffect(() => {
        (async () => {
            const response = await getProviders();
            setProviders(response);
        })();
    }, [])

    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href='/' className="flex gap-2 pt-3 flex-center">
                <Image 
                src={Logo}
                alt="Logo"
                width={150}
                height={120}
                className="object-contain"
                />
            </Link>
            <div className="sm:flex hidden">
                { user !== null ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-prompt" className="slate_btn">
                            Crear Post
                        </Link>
                        <button type="button" onClick={() => void signOut()} className="outline_btn">Cerrar Sesión</button>
                        <Link href="/profile">
                            <Image 
                            src={Profile}
                            width={37}
                            height={37}
                            className="rounded-full" 
                            alt="No picture provided" 
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers && Object.values(providers).map((provider) => (
                            <button className="slate_btn" type="button" key={provider.name} onClick={() => void signIn(provider.id)}>
                                Abrir Sesión
                            </button>
                        ))}
                    </>
                ) }
            </div>
        </nav>
      )
}