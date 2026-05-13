import type { Metadata } from 'next'
import { Inter, Public_Sans, Space_Mono, Lato } from 'next/font/google'
import './globals.css'
import ToastProvider from '@/components/providers/ToastProvider'

const inter = Inter({ subsets: ['latin'] })
const publicSans = Public_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-public-sans'
})
const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
})
const lato = Lato({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.knacksters.co'),
  title: {
    default: 'Knacksters — Deploy Vetted Experts in Hours, Not Weeks',
    template: '%s | Knacksters',
  },
  description: 'Deploy pre-vetted professionals in hours — not weeks. On-demand expert access across AI, cybersecurity, development, design, marketing, and healthcare. Start with 50 free hours.',
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: '/logo.svg',
  },
  openGraph: {
    type: 'website',
    siteName: 'Knacksters',
    title: 'Knacksters — Deploy Vetted Experts in Hours, Not Weeks',
    description: 'Deploy pre-vetted professionals in hours — not weeks. On-demand expert access across AI, cybersecurity, development, design, marketing, and healthcare. Start with 50 free hours.',
    url: 'https://www.knacksters.co',
    images: [{ url: '/hero-bg.png', width: 1200, height: 630, alt: 'Knacksters - On-Demand Expert Platform' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Knacksters — Deploy Vetted Experts in Hours, Not Weeks',
    description: 'Deploy pre-vetted professionals in hours — not weeks. Start with 50 free hours. No contracts.',
    images: ['/hero-bg.png'],
    site: '@knackstersco',
    creator: '@knackstersco',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${publicSans.variable} ${spaceMono.variable} ${lato.variable} antialiased`}>
        {children}
        <ToastProvider />
      </body>
    </html>
  )
}
