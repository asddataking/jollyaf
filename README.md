# Jolly AF - Comedy Santa Website

A Next.js website for Jolly AF, a comedy Santa service for adult holiday parties, bars, and office events in Metro Detroit.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🎨 Customization

### Colors
Update the color scheme in `tailwind.config.ts`:
- `deep-red`: #B1002E (primary brand color)
- `evergreen`: #166534 (secondary color)
- `off-white`: #FFF8F0 (background)
- `gold`: #D4AF37 (accent color)

### Content
Main content is in `app/page.tsx`. Key sections to customize:
- Hero headline and subtext
- About section bio
- Package descriptions and pricing
- FAQ content
- Contact information

### Fonts
Current fonts (defined in `app/globals.css`):
- **Body**: Inter (clean, modern)
- **Headlines**: Bebas Neue (bold, display)

To change fonts, update the Google Fonts import and font-family declarations.

## 📅 Booking Form Integration

### Current Setup
The booking form submits to `/api/book` which logs data to console.

### Replace with GoHighLevel (GHL)
1. Get your GHL calendar embed code
2. Replace the form section in `app/page.tsx` (around line 400)
3. Look for this comment: `{/* TODO: Replace form with GHL calendar embed */}`
4. Replace the entire form with your GHL embed code

Example:
```tsx
{/* Replace this entire form section with GHL embed */}
<div dangerouslySetInnerHTML={{ __html: yourGHLCalendarEmbedCode }} />
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Manual Vercel Deploy
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

### Other Platforms
The site is a standard Next.js app and can be deployed to:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📁 Project Structure

```
jolly-af/
├── app/
│   ├── api/book/route.ts    # Booking form API
│   ├── globals.css          # Global styles & fonts
│   ├── layout.tsx           # Root layout with SEO
│   └── page.tsx             # Main page content
├── package.json
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json
└── README.md
```

## 🔧 Features

- ✅ Responsive design (mobile-first)
- ✅ SEO optimized (meta tags, Open Graph, JSON-LD)
- ✅ Accessibility compliant
- ✅ Smooth scrolling navigation
- ✅ Framer Motion animations
- ✅ Form validation and submission
- ✅ TypeScript for type safety
- ✅ TailwindCSS for styling

## 📱 Mobile Optimization

- Touch-friendly buttons and navigation
- Optimized images and animations
- Fast loading on mobile networks
- Responsive typography

## 🎯 Future Enhancements

- [ ] Add actual image gallery
- [ ] Integrate GoHighLevel calendar
- [ ] Add email notifications
- [ ] Database integration
- [ ] Admin dashboard for bookings
- [ ] Payment processing
- [ ] Customer testimonials
- [ ] Blog/news section

## 📞 Support

For questions about this website:
- Email: bookings@bookjollyaf.com
- Domain: BookJollyAF.com

## 📄 License

© 2024 Jolly AF. All rights reserved.
