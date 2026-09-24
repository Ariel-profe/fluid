import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import {Navigation} from '@/components/navigation'
import {Footer} from '@/components/footer'

import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Fluid - Soluciones Dinámicas',
  description: 'Tu socio estratégico en productos para control y conducción de fluidos.',
}

export const viewport: Viewport = {
  themeColor: '#0d0d0d',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans antialiased">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
