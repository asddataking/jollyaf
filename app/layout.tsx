import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jolly AF - Comedy Santa for Adult Holiday Parties | Metro Detroit',
  description: 'Jolly AF — comedy Santa for adult holiday parties, bars, and office events in Metro Detroit. Limited December bookings. Lock your date at BookJollyAF.com.',
  openGraph: {
    title: 'Jolly AF - The Santa Your Mom Warned You About',
    description: 'Comedy Santa for bars, house parties, and office shenanigans. December bookings only.',
    url: 'https://bookjollyaf.com',
    siteName: 'Jolly AF',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jolly AF - Comedy Santa for Adult Holiday Parties',
    description: 'Comedy Santa for bars, house parties, and office shenanigans. December bookings only.',
  },
  robots: {
    index: true,
    follow: true,
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
