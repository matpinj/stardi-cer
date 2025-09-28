# Multiple CSS Design System - Usage Guide

## Overview
Your pottery website now has a flexible design system with multiple CSS themes that you can easily switch between and modify.

## Available Themes

### Option 1: Classic Clean
- **File**: `css/themes/option1.css`
- **Style**: Your original minimalist design
- **Features**: Clean lines, neutral colors, subtle typography
- **Colors**: Whites, grays, and earth tones

### Option 2: Bold Modern (Squarespace Inspired)
- **File**: `css/themes/option2.css`
- **Style**: Bold, modern design inspired by Squarespace Altaloma
- **Features**: 
  - Large, bold typography with Georgia serif font
  - Rich gradients and textures
  - Enhanced shadows and hover effects
  - Warm color palette with #8B4513 (saddle brown) as primary
  - Rounded corners and modern card designs
  - Enhanced visual hierarchy

### Option 3: Minimalist
- **File**: `css/themes/option3.css`
- **Style**: Ultra-clean, Apple-inspired minimalist design
- **Features**:
  - System fonts for modern look
  - Subtle shadows and clean spacing
  - Smooth transitions and hover effects
  - Monochrome color scheme

## How to Switch Themes

### For Users (Live Switching)
1. Look for the "Design Options" panel in the bottom-left corner
2. Click on any theme option:
   - **Classic Clean**: Original design
   - **Bold Modern**: Squarespace-inspired bold design
   - **Minimalist**: Clean, modern minimalist
3. The theme will switch with a smooth loading animation
4. Your choice is saved and will persist when you reload the page

### For Developers (Manual)
1. **Change Default Theme**: Edit `index.html` and modify the `href` in this line:
   ```html
   <link id="theme-css" rel="stylesheet" href="css/themes/option1.css">
   ```
   
2. **Create New Theme**: 
   - Copy an existing theme file from `css/themes/`
   - Modify colors, fonts, and styles as needed
   - Add it to the theme switcher in `index.html`

## Customizing Themes

### Modifying Existing Themes
Each theme file is completely independent, so you can:
- Change colors by finding and replacing color codes
- Modify fonts by changing `font-family` properties
- Adjust spacing by modifying padding and margin values
- Update animations by changing transition properties

### Key Customization Areas

#### Colors
- **Option 1**: `#2C2C2C`, `#A67C5A`, `#FEFEFE`
- **Option 2**: `#8B4513`, `#D4B896`, `#FEFDF8`
- **Option 3**: `#1a1a1a`, `#666`, `#ffffff`

#### Typography
- **Option 1**: Arial, sans-serif
- **Option 2**: Georgia, serif (for bold look)
- **Option 3**: System fonts (-apple-system, etc.)

#### Effects
- **Option 1**: Subtle transitions, minimal shadows
- **Option 2**: Bold gradients, heavy shadows, texture overlays
- **Option 3**: Clean shadows, smooth transitions

## File Structure
```
css/
├── style.css              # Theme switcher styles only
└── themes/
    ├── option1.css        # Classic Clean theme
    ├── option2.css        # Bold Modern theme
    └── option3.css        # Minimalist theme
```

## Adding New Themes

1. **Create CSS File**: Copy `css/themes/option1.css` as a starting point
2. **Modify Styles**: Customize colors, fonts, and effects
3. **Add to Switcher**: 
   - Add button in HTML:
     ```html
     <button class="theme-option" onclick="switchTheme('option4')">Your Theme Name</button>
     ```
   - The JavaScript will automatically handle the switching

## Features

### User Experience
- **Persistent Choice**: Selected theme is saved in localStorage
- **Smooth Transitions**: Loading animation during theme switches
- **Responsive**: All themes work on mobile and desktop
- **Live Preview**: Instant theme switching without page reload

### Developer Features
- **Independent Files**: Each theme is completely separate
- **Easy Customization**: Standard CSS with clear structure
- **Modular System**: Add unlimited themes without affecting existing ones
- **Backward Compatible**: Original functionality remains unchanged

## Tips for Customization

1. **Test on Mobile**: Always check responsive design on mobile devices
2. **Color Consistency**: Use CSS custom properties for easy color management
3. **Performance**: Keep CSS efficient to maintain fast theme switching
4. **Accessibility**: Ensure sufficient color contrast in all themes

## Technical Details

The theme system works by:
1. Loading a default theme on page load
2. Using JavaScript to dynamically switch the CSS file link
3. Providing visual feedback during transitions
4. Storing user preference in browser localStorage

This system gives you complete flexibility while keeping each design option clean and maintainable.