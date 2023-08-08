'use client'
import Link from "next/link"
import Image from "next/image"
import { Logo } from "../../public/assets/exporter"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

type Props = {}

export default function Nav({}: Props) {
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
    </nav>
  )
}