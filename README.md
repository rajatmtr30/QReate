# 🔗 Qreate

**Qreate** (QR + Create) is a modern, responsive HTML5 JavaScript application that generates QR codes with real-time customization. Features multiple QR code types, live preview, and instant regeneration when customization options change.

**Developed by:** Rajat Sharma
**Hosted Url:** https://rajatmtr30.github.io/QReate

## 🆕 What's New in v2.0

- **Multiple QR Code Types**: URL, Text, Email, and Phone QR codes
- **Real-Time Customization**: Instant QR code updates when changing size, format, or error correction
- **Modern UI**: Redesigned interface inspired by professional QR generators
- **Compact Design**: Optimized header and smaller type selection tiles
- **Enhanced Mobile Experience**: Better responsive design for all devices

## ✨ Features

### **Core Functionality**
- **Multiple QR Types**: URL, Text, Email, and Phone QR codes
- **Real-Time Updates**: Instant QR code regeneration when customization changes
- **Dynamic Input Fields**: Input adapts based on selected QR code type
- **Live Preview**: See your QR code update instantly as you customize

### **Customization Options**
- **Multiple Formats**: PNG, JPG, and SVG formats
- **Customizable Size**: 200px to 500px with real-time updates
- **Error Correction**: Low to High levels with instant preview
- **Modern Interface**: Card-based layout with smooth transitions

### **User Experience**
- **Download & Copy**: Save QR codes or copy to clipboard
- **Print Support**: Print QR codes directly from the browser
- **Example Cards**: Quick-start examples for all QR code types
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **No Signup Required**: Generate QR codes instantly without registration

## 🚀 Quick Start

1. **Clone or Download** this repository
2. **Open `index.html`** in your web browser
3. **Select QR Code Type**: Choose from URL, Text, Email, or Phone
4. **Enter Content**: Add your URL, text, email, or phone number
5. **Customize**: Adjust size, format, and error correction (updates in real-time)
6. **Download, copy, or print** your QR code

## 📱 Supported QR Code Types

### **URL QR Codes**
- **Websites**: `https://example.com`
- **Landing Pages**: Direct users to specific web pages
- **Social Media**: Link to profiles and posts

### **Contact QR Codes**
- **Email**: `mailto:user@example.com`
- **Phone**: `tel:+1234567890`
- **SMS**: `sms:+1234567890`

### **Text QR Codes**
- **Plain Text**: Any text message or information
- **Instructions**: Step-by-step guides
- **WiFi**: `WIFI:T:WPA;S:NetworkName;P:Password;H:false;;`

## 🛠️ Technical Details

### Dependencies
- **qrcode-generator**: JavaScript library for QR code generation
- **HTML5 Canvas**: For rendering QR codes
- **Modern CSS**: For responsive design and animations

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### File Structure
```
qreate/
├── index.html          # Main HTML file
├── script.js           # JavaScript functionality
├── styles.css          # CSS styling
└── README.md           # Project documentation
```

## 🎯 How It Works

### **QR Code Generation Process**
1. **Type Selection**: User selects QR code type (URL, Text, Email, Phone)
2. **Input Validation**: JavaScript validates the input based on selected type
3. **QR Generation**: qrcode-generator library creates the QR code
4. **Canvas Rendering**: QR code is drawn on HTML5 Canvas
5. **Live Display**: Generated QR code is shown with real-time updates
6. **Customization**: Size, format, and error correction update instantly
7. **Actions**: User can download, copy, or print the QR code

### **Real-Time Features**
- **Instant Updates**: QR code regenerates when customization options change
- **Dynamic Input**: Input field adapts to selected QR code type
- **Live Preview**: See changes immediately without regenerating
- **Smooth Transitions**: Loading states and error handling for all operations

## 📋 Usage Examples

### **Basic Usage**
```javascript
// Select QR code type and enter content
// 1. Click on URL, Text, Email, or Phone tab
// 2. Enter your content in the input field
// 3. Click "Generate QR Code" button
// 4. Customize size, format, and error correction
// 5. Download, copy, or print your QR code
```

### **Real-Time Customization**
```javascript
// QR code updates automatically when you change:
// - Size (200px to 500px)
// - Format (PNG, JPG, SVG)
// - Error Correction (Low to High)
// No need to regenerate - changes appear instantly!
```

### **Programmatic Usage**
```javascript
// The QRCodeGenerator class can be extended for custom implementations
const generator = new QRCodeGenerator();
await generator.generateQRCode();
await generator.regenerateQRCode(); // For real-time updates
```

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --success-color: #28a745;
    --info-color: #007bff;
}
```

### Adding New URL Types
Extend the `getUrlType()` method in `script.js`:
```javascript
getUrlType(url) {
    if (url.startsWith('your-custom-prefix:')) {
        return 'Custom Type';
    }
    // ... existing code
}
```

## 🔧 Configuration Options

### QR Code Settings
- **Size**: 200x200, 300x300, 400x400, 500x500 pixels
- **Error Correction**: Low (7%), Medium (15%), Quartile (25%), High (30%)
- **Format**: PNG, JPG

### Default Settings
```javascript
const defaultOptions = {
    size: 300,
    errorCorrectionLevel: 'M',
    format: 'png'
};
```

## 📱 Mobile Support

The application is fully responsive and works on:
- **Smartphones**: iOS Safari, Android Chrome
- **Tablets**: iPad, Android tablets
- **Desktop**: All modern browsers

## 🚨 Troubleshooting

### Common Issues

1. **QR Code Not Generating**
   - Check if the URL is valid
   - Ensure the qrcode-generator library is loaded
   - Check browser console for errors

2. **Download Not Working**
   - Ensure pop-ups are allowed
   - Check if the browser supports the download attribute

3. **Copy to Clipboard Fails**
   - Ensure the site is served over HTTPS
   - Check browser permissions for clipboard access

### Browser Console Errors
```javascript
// Check if QRCode library is loaded
console.log(typeof qrcode); // Should return 'function'

// Check if QRCodeGenerator is initialized
console.log(window.qrGenerator); // Should return the generator instance
```

## 🔒 Security Considerations

- **CORS**: No external requests are made, so CORS is not an issue
- **XSS Protection**: All user input is properly escaped
- **Content Security**: Only generates QR codes, no external content loading

## 📈 Performance

- **Lightweight**: Total bundle size < 50KB
- **Fast Generation**: QR codes generate in < 100ms
- **Memory Efficient**: Uses Canvas API for optimal performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **qrcode-generator**: For the excellent QR code generation library
- **Cloudflare**: For reliable CDN hosting
- **Modern CSS**: For responsive design inspiration
- **Developer**: Rajat Sharma - Creator of Qreate

## 📞 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Open an issue on GitHub
3. Review the browser console for error messages

## 🔄 Version History

- **v1.0.0**: Initial release with basic QR code generation
- **v1.1.0**: Added multiple formats and error correction levels
- **v1.2.0**: Added download, copy, and print functionality
- **v1.3.0**: Improved mobile responsiveness and UI
- **v2.0.0**: **Major Update** - Multiple QR types, real-time customization, modern UI redesign

---

**Made with ❤️ by Rajat Sharma for the developer community**

**Qreate v2.0** - Where QR codes come to life with real-time magic! 🔗✨

### **Key Improvements in v2.0:**
- 🎯 **Multiple QR Types**: URL, Text, Email, Phone
- ⚡ **Real-Time Updates**: Instant customization feedback
- 🎨 **Modern UI**: Professional design inspired by leading QR generators
- 📱 **Better Mobile**: Optimized for all devices
- 🚀 **Enhanced UX**: Smoother interactions and faster generation

