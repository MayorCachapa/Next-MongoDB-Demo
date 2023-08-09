'use client'
import Link from "next/link"
import Image from "next/image"
import { Logo, Profile } from "../../public/assets/exporter"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders, LiteralUnion, ClientSafeProvider } from 'next-auth/react'
import { BuiltInProviderType } from "next-auth/providers/index"

type Props = {};
type ProvidersType = Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;

export default function Nav({}: Props) {
    const [toggleDropdown, setToggleDropdown] = useState(false);

    function handleToggleDropdown() {
        setToggleDropdown(false);
    }
    
    const session = useSession();
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
                { user ? (
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
                            alt="Profile Picture" 
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

            {/* Mobile view: */}
            <div className="sm:hidden flex relative">
                { user ? (
                    <div className="flex">
                        <Image 
                        src={Profile}
                        alt="Profile Picture"
                        width={37}
                        height={37}
                        className="rounded-full"
                        // prev used instead because using the opposite value of the current state
                        // (ie, !toggleDropdown) has caused unexpected behavior in the past
                        onClick={() => setToggleDropdown( (prev) => !prev )}
                        />
                        
                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link href="/profile" className="dropdown_link" onClick={() => { handleToggleDropdown()}}>
                                    Mi Perfil
                                </Link>
                                <Link href="/create-prompt" className="dropdown_link" onClick={() => { handleToggleDropdown()}}>
                                    Crear Post
                                </Link>
                                <button
                                type="button"
                                onClick={() => {handleToggleDropdown(); signOut();}}
                                className="mt-5 w-full slate_btn"
                                >
                                    Cerrar Sesión
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers && Object.values(providers).map((provider) => (
                            <button className="slate_btn" type="button" key={provider.name} onClick={() => void signIn(provider.id)}>
                                Abrir Sesión
                            </button>
                        ))}
                    </>
                )}
            </div>
        </nav>
      )
}