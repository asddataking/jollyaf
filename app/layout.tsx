import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jolly AF - Comedy Santa for Adult Holiday Parties | Metro Detroit',
  description: 'Jolly AF — comedy Santa for adult holiday parties, bars, and office events in Metro Detroit. Limited December bookings. Lock your date at BookJollyAF.com.',
  keywords: ['comedy santa', 'adult holiday parties', 'metro detroit', 'christmas entertainment', 'office parties', 'bar events', 'holiday comedy', 'santa claus', 'christmas party entertainment'],
  authors: [{ name: 'Jolly AF' }],
  creator: 'Jolly AF',
  publisher: 'Jolly AF',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://bookjollyaf.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Jolly AF - The Santa Your Mom Warned You About',
    description: 'Comedy Santa for bars, house parties, and office shenanigans. December bookings only.',
    url: 'https://bookjollyaf.com',
    siteName: 'Jolly AF',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        width: 1200,
        height: 630,
        alt: 'Professional Santa Claus - Jolly AF',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jolly AF - Comedy Santa for Adult Holiday Parties',
    description: 'Comedy Santa for bars, house parties, and office shenanigans. December bookings only.',
    images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Jolly AF",
              "description": "Comedy Santa for adult holiday parties, bars, and office events",
              "url": "https://bookjollyaf.com",
              "telephone": "+1-XXX-XXX-XXXX",
              "email": "bookings@bookjollyaf.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Metro Detroit",
                "addressRegion": "MI",
                "addressCountry": "US"
              },
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": 42.3314,
                  "longitude": -83.0458
                },
                "geoRadius": "50"
              }
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
