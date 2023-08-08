'use client'
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

type Props = {}

export default function Nav({}: Props) {
  return (
    <div>Nav</div>
  )
}