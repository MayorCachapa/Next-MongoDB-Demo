import Nav from '@/components/Nav'
import './globals.css'
import type { Metadata } from 'next'
import Provider from '@/components/Provider'

export const metadata: Metadata = {
  title: 'PromptHisteria',
  description: 'Demo of Next with MongoDB'
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {

  return (
    <html lang="es">
        <body>
          {/* The provider component allows access to the session instance throughout the application */}
          <Provider >
                <div className='main'>
                    <div className='gradient' />
                </div>
                <main className='app'>
                  <Nav />
                    {children}
                </main>
          </Provider>
        </body>
    </html>
  )
}
