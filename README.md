# S-Kite Website

A modern, responsive website for the S-Kite mobile app - Smart Kite Assistant for kitesurfers and windsurfers.

## 🚀 Features

- **Modern Design**: Clean, minimal aesthetic inspired by epcai.co.uk
- **Dark/Light Mode**: Toggle between themes with system preference detection
- **Responsive**: Mobile-first design that works on all devices
- **Smooth Animations**: Framer Motion for delightful user interactions
- **SEO Optimized**: Meta tags, OpenGraph, and proper semantic HTML
- **TypeScript**: Full type safety throughout the application

## 📱 Pages

1. **Home** - Landing page with hero section, features overview, and call-to-action
2. **Features** - Detailed feature showcase with testimonials
3. **Pricing** - Three-tier credit system with Stripe integration
4. **Dashboard** - User dashboard with credit management and profile
5. **Signup/Login** - Firebase authentication with cross-platform sync

## 🛠 Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons
- **Firebase** - Authentication, Firestore database, and Cloud Functions
- **Stripe** - Payment processing and subscription management

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Skite-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   # Switch to test environment for development
   ./switch-env.sh test
   
   # Edit .env file with your actual keys
   nano .env
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
# Switch to live environment for production
./switch-env.sh live

# Edit .env file with your live keys
nano .env

# Build the application
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 🔧 Environment Management

This project uses a dynamic environment system for managing Stripe keys and Firebase configuration. See `ENVIRONMENT_SETUP.md` for detailed instructions.

### Quick Environment Commands:
```bash
./switch-env.sh test    # Switch to test environment
./switch-env.sh live    # Switch to live environment  
./switch-env.sh current # Check current environment
./switch-env.sh validate # Validate configuration
```

## 📁 Project Structure

```
Skite-web/
├── src/                    # React application
│   ├── components/         # Reusable components
│   ├── pages/             # Page components
│   ├── services/          # Firebase and Stripe services
│   └── contexts/          # React contexts (Auth, Theme)
├── functions/             # Firebase Cloud Functions
│   └── src/               # Stripe payment processing
├── .env.test              # Test environment template
├── .env.live              # Live environment template
├── switch-env.sh          # Environment switching script
├── create-stripe-products.js # Stripe product creation utility
└── ENVIRONMENT_SETUP.md   # Environment configuration guide
```

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (`#0ea5e9` to `#0284c7`)
- **Gray**: Neutral grays for text and backgrounds
- **Success**: Green for positive actions
- **Warning**: Yellow for alerts
- **Error**: Red for errors

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components
- **Buttons**: Primary and secondary variants with hover effects
- **Cards**: Consistent card design with shadows and borders
- **Navigation**: Sticky header with mobile menu

## 🔧 Customization

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add the route in `src/App.tsx`
3. Update navigation in `src/components/Header.tsx`

### Styling

The project uses Tailwind CSS with custom components defined in `src/index.css`. You can:

- Modify colors in `tailwind.config.js`
- Add new utility classes in `src/index.css`
- Create new component classes using `@apply`

### Theme Customization

The theme system is handled by `ThemeProvider.tsx`. You can:

- Add new theme variables
- Modify the theme toggle behavior
- Add system preference detection

## 🔌 Firebase Integration (Future)

The website is designed to integrate with Firebase for:

- **Authentication**: User sign-up/login
- **Firestore**: User data and subscription management
- **Stripe**: Payment processing

### Setup Steps (when ready)

1. Create a Firebase project
2. Add Firebase config to environment variables
3. Implement authentication in components
4. Add Firestore for user data
5. Integrate Stripe for payments

## 📦 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Deploy with one click

### Netlify

1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure build settings if needed

### Other Platforms

The built files in the `dist` directory can be deployed to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

Built with ❤️ for the S-Kite mobile app 