# 🍔 FastFood Delivery App

A modern, responsive food delivery website built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**.

![FastFood App](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue?logo=tailwind-css)

## 🚀 Live Demo

Visit the app: [http://localhost:3000](http://localhost:3000)

## ✨ Features

- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- 🎨 **Modern UI** - Clean design with orange theme and smooth animations
- 🔍 **Search & Filter** - Find restaurants by category (Pizza, Burgers, Sushi, etc.)
- 🛒 **Shopping Cart** - Cart icon with item counter
- 📊 **Restaurant Cards** - Display ratings, delivery time, and minimum order
- 🔤 **TypeScript** - Fully typed for better development experience
- ⚡ **Fast Performance** - Built with Next.js 16 and Turbopack

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Geist Sans & Geist Mono
- **Icons**: Heroicons (SVG)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/fastfood-delivery-app.git
   cd fastfood-delivery-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── Button.tsx           # Reusable button component
│   ├── Card.tsx             # Card wrapper component
│   ├── Input.tsx            # Input field component
│   ├── Header.tsx           # Navigation header
│   ├── Hero.tsx             # Hero section with search
│   ├── Categories.tsx       # Category filter buttons
│   ├── RestaurantGrid.tsx   # Restaurant cards grid
│   └── Footer.tsx           # Footer section
├── public/                  # Static assets
└── README.md
```

## 🎨 Components

### Button
Reusable button with 3 variants and 3 sizes:
```tsx
<Button variant="primary" size="lg">Order Now</Button>
<Button variant="secondary" size="md">Learn More</Button>
<Button variant="outline" size="sm">Cancel</Button>
```

### Restaurant Card
Displays restaurant info with ratings and delivery details:
- Restaurant name and cuisine type
- Star rating with green badge
- Delivery time and minimum order
- Order button with hover effects

### Categories
Interactive category filters:
- All, Pizza, Burgers, Sushi, Desserts, Drinks
- Active state with orange highlighting
- Smooth animations

## 🎯 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Deploy with one click!

### Deploy to Netlify

1. Build the project: `npm run build`
2. Upload the `out` folder to Netlify

## 🛣️ Roadmap

### Phase 1: Core Features ✅
- [x] Responsive design
- [x] Restaurant grid
- [x] Category filters
- [x] Search functionality
- [x] Shopping cart UI

### Phase 2: Interactivity 🚧
- [ ] Functional category filtering
- [ ] Cart state management
- [ ] Restaurant detail pages
- [ ] Checkout process

### Phase 3: Backend 🔄
- [ ] API routes
- [ ] Database integration
- [ ] User authentication
- [ ] Order management

### Phase 4: Advanced 🚀
- [ ] Real-time order tracking
- [ ] Payment integration
- [ ] Reviews and ratings
- [ ] Push notifications

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Your Name**
- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Heroicons](https://heroicons.com/) for the beautiful icons
- [Vercel](https://vercel.com/) for easy deployment

---

⭐ **Star this repository if you found it helpful!**
