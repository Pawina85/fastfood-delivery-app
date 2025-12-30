# 🍔 FastFood Delivery App

A modern, responsive food delivery website built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features Built

### 1. **Reusable Components** (`/components`)
- ✅ **Button** - 3 variants (primary, secondary, outline) and 3 sizes
- ✅ **Card** - Reusable card with hover effects
- ✅ **Input** - Input fields with icon support
- ✅ **Header** - Responsive navigation with mobile menu
- ✅ **Hero** - Eye-catching hero section with search
- ✅ **Categories** - Interactive category filters
- ✅ **RestaurantGrid** - Restaurant cards with ratings
- ✅ **Footer** - Complete footer with links and social media

### 2. **Responsive Design**
- 📱 Mobile-first approach
- 💻 Tablet and desktop layouts
- 🎯 Breakpoints: sm (640px), md (768px), lg (1024px)

### 3. **Clean & Modern UI**
- 🎨 Orange (#f97316) accent color
- 🌟 Smooth animations and transitions
- 💫 Hover effects on interactive elements
- 📐 Consistent spacing and typography

## 🚀 Getting Started

### Step 1: Install Dependencies (if not done)
\`\`\`bash
npm install
\`\`\`

### Step 2: Run Development Server
\`\`\`bash
npm run dev
\`\`\`

### Step 3: Open Your Browser
Navigate to: http://localhost:3000

## 📁 Project Structure

\`\`\`
fast-food/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main page (imports all components)
├── components/
│   ├── Button.tsx           # Reusable button component
│   ├── Card.tsx             # Card wrapper component
│   ├── Input.tsx            # Input field component
│   ├── Header.tsx           # Navigation header
│   ├── Hero.tsx             # Hero section with search
│   ├── Categories.tsx       # Category filter buttons
│   ├── RestaurantGrid.tsx   # Restaurant cards grid
│   └── Footer.tsx           # Footer section
└── public/                  # Static assets
\`\`\`

## 🎯 What's Next? (Step by Step)

### Phase 1: Add More Features ⭐
1. **Cart Functionality**
   - Create a Cart component
   - Add state management (Context API or Zustand)
   - Build cart page with checkout

2. **Restaurant Details Page**
   - Create \`app/restaurant/[id]/page.tsx\`
   - Show menu items, reviews, and details

3. **Search & Filters**
   - Make category filters functional
   - Add search by restaurant name
   - Filter by rating, delivery time, cuisine

### Phase 2: Backend Integration 🔌
1. **API Routes**
   - Create \`app/api/restaurants/route.ts\`
   - Create \`app/api/orders/route.ts\`

2. **Database**
   - Set up Prisma or MongoDB
   - Create restaurant, menu, and order models

3. **Authentication**
   - Add NextAuth.js
   - User sign up/login
   - Order history

### Phase 3: Advanced Features 🚀
1. **Real-time Tracking**
   - WebSocket for order tracking
   - Map integration (Google Maps)

2. **Payment Integration**
   - Stripe or PayPal
   - Secure checkout

3. **Reviews & Ratings**
   - User can rate restaurants
   - Comment system

### Phase 4: Polish & Deploy 🎨
1. **Testing**
   - Unit tests with Jest
   - E2E tests with Playwright

2. **Performance**
   - Image optimization
   - Lazy loading
   - SEO optimization

3. **Deploy**
   - Deploy to Vercel
   - Set up domain

## 🛠️ Customization Tips

### Change Colors
Edit orange theme in components:
- Replace \`orange-500\` with your color
- Update \`#f97316\` in globals.css

### Add New Restaurants
Edit \`components/RestaurantGrid.tsx\`:
\`\`\`typescript
const restaurants = [
  {
    id: 7,
    name: "Your Restaurant",
    cuisine: "Your Cuisine",
    rating: 4.9,
    deliveryTime: "20-30 min",
    minOrder: "$15",
    image: "🍕"
  }
];
\`\`\`

### Modify Categories
Edit \`components/Categories.tsx\`:
\`\`\`typescript
const categories = [
  { id: 'new', name: 'New Category', icon: '🎯' }
];
\`\`\`

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: > 1024px (lg)

## 🎨 Design System

### Colors
- Primary: Orange (#f97316)
- Background: White (#ffffff)
- Text: Gray-900 (#111827)
- Accent: Orange-600 (#ea580c)

### Typography
- Font Family: Geist Sans
- Headings: Bold (700)
- Body: Regular (400)
- Buttons: Semibold (600)

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)

## 🤝 Need Help?

Start with these simple improvements:
1. Run the app and see it working
2. Change some text or colors
3. Add a new restaurant to the grid
4. Create a new page (e.g., About page)

Good luck building your delivery app! 🚀
