# 🎉 Hangout Planner

A modern, glassmorphic web application for planning your perfect hangout moments. Built with React, Vite, Tailwind CSS, and Framer Motion.

## ✨ Features

### 🎨 Design
- **Glassmorphic UI**: Beautiful frosted glass effect with semi-transparent elements
- **Deep Purple/Blue Gradient**: Vibrant gradient background with animated blobs
- **Glowing Cards**: Interactive cards with shadow glow effects
- **Responsive Design**: Fully mobile-friendly interface

### 📱 Functionality
- **Plan a Hangout**: Click the main button to open an animated modal
- **Add Hangout Details**:
  - Place Name (required)
  - Time Range (From/To times)
  - Form validation with error messages
- **Hangout Cards**: Display all planned hangouts with:
  - Location information
  - Time duration
  - Delete button for removing hangouts
  - Interactive hover effects
- **Stats Dashboard**: Shows:
  - Total planned hangouts
  - Weekly hangouts
  - Hours together

### 🎭 Animations
- Smooth modal entrance/exit with spring physics
- Card animations on mount
- Hover effects with elevation changes
- Gradient border animations
- Pulsing background gradient elements
- Framer Motion for all interactive elements

### 🎯 UI Components
- **Header**: Branded navigation with action button
- **Stats Cards**: Dashboard metrics with gradient icons
- **Hangout Grid**: Responsive grid layout (1 col mobile, 2 col tablet, 3 col desktop)
- **Modal Dialog**: Animated form for creating new hangouts
- **Empty State**: Friendly message when no hangouts are planned

## 🚀 Technologies

- **React 19**: Latest React with hooks
- **Vite**: Lightning-fast build tool
- **Tailwind CSS 4**: Utility-first CSS framework
- **Framer Motion**: Production-ready animation library
- **Lucide React**: Beautiful, consistent icon set
- **TypeScript**: Type-safe development

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm preview
```

## 🎨 Customization

### Colors
The app uses a purple/blue theme. To customize:
- Edit gradient colors in `src/App.tsx` background elements
- Modify Tailwind color utilities in components
- Update glassmorphism styles in `src/index.css`

### Add More Fields
To extend the hangout form:
1. Update the modal state in `PlanHangoutModal.tsx`
2. Add new input fields
3. Update the `onSubmit` function in `App.tsx`

## 📱 Mobile Responsiveness

The app is fully responsive with:
- Mobile-first design approach
- Responsive grid layouts
- Touch-friendly button sizes
- Adaptive typography
- Optimized spacing for all screen sizes

## 🎪 Features in Detail

### Animated Modal
- Spring physics animation
- Form validation with error messages
- Time format conversion (24h to 12h)
- Smooth entrance and exit

### Interactive Cards
- Hover elevation effect
- Gradient overlays on hover
- Smooth transitions
- Delete with confirmation

### Stats Dashboard
- Real-time count updates
- Gradient icon backgrounds
- Hover animations
- Responsive layout

## 📝 License

This project is open source and available under the MIT License.

---

**Start planning your hangouts now! 🎊**
