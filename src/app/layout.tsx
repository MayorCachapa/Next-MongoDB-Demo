import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PromptHisteria',
  description: 'Demo of Next with MongoDB'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body>
            <div className='main'>
                <div className='gradient' />
            </div>
            <main className='app'>
                {children}
            </main>
        </body>
    </html>
  )
}
