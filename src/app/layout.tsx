import type { Metadata, Viewport } from "next"
import {
  Nunito,
  Nunito_Sans,
  Noto_Sans_Devanagari,
  Noto_Sans_Kannada,
  Noto_Sans_Telugu,
  Noto_Sans_Bengali,
} from "next/font/google"
import "./globals.css"

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-body-var",
  display: "swap",
})

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  display: "swap",
})

const notoKannada = Noto_Sans_Kannada({
  subsets: ["kannada"],
  variable: "--font-kannada",
  display: "swap",
})

const notoTelugu = Noto_Sans_Telugu({
  subsets: ["telugu"],
  variable: "--font-telugu",
  display: "swap",
})

const notoBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-bengali",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Referral Raja — Bounce Daily",
  description: "Refer friends, climb the leaderboard, win big prizes!",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#E53935",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${nunitoSans.variable} ${notoDevanagari.variable} ${notoKannada.variable} ${notoTelugu.variable} ${notoBengali.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
