import './globals.css'
import { Inter } from 'next/font/google'

export const metadata = {
  title: 'Trello 2.0 Clone',
  description: 'Generated by Romulo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
