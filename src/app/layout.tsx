import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

import Navbar from '@/components/navbar'
import { Providers } from '../components/providers'
import { ThemeProvider } from 'next-themes'

import Script from 'next/script'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen dark:bg-dark-500`}
      >
        <Script
          src="https://umami-production-d2e4.up.railway.app/script.js"
          data-website-id="1a23cd85-0700-4093-8e96-a3205b693cbd"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          value={{ light: 'light', dark: 'dark' }}
        >
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
