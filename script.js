/**
 * Qreate - QR Code Generator
 * 
 * A modern, responsive QR code generator with real-time customization.
 * Features multiple QR code types (URL, Text, Email, Phone), live preview,
 * and instant regeneration when customization options change.
 * 
 * Key Features:
 * - Multiple QR code types with dynamic input fields
 * - Real-time customization (size, format, error correction)
 * - Modern UI inspired by professional QR generators
 * - Mobile-responsive design
 * - Download, copy, and print functionality
 * 
 * @author Rajat Sharma
 * @version 2.0.0
 * @since 2024
 */
class QRCodeGenerator {
    /**
     * Constructor - Initializes the QR code generator
     * Sets up DOM element references and event listeners
     */
    constructor() {
        // DOM element references for input controls
        this.urlInput = document.getElementById('urlInput');
        this.generateBtn = document.getElementById('generateBtn');
        this.sizeSelect = document.getElementById('sizeSelect');
        this.errorLevel = document.getElementById('errorLevel');
        this.formatSelect = document.getElementById('formatSelect');
        
        // DOM element references for display areas
        this.qrContainer = document.getElementById('qrContainer');
        this.qrActions = document.getElementById('qrActions');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.copyBtn = document.getElementById('copyBtn');
        this.printBtn = document.getElementById('printBtn');
        this.qrDetails = document.getElementById('qrDetails');
        
        // Current QR code data storage
        this.currentQRCode = null;
        
        // Initialize event listeners for user interactions
        this.initializeEventListeners();
    }

    /**
     * Initialize Event Listeners
     * Sets up all event listeners for user interactions including:
     * - QR code generation and regeneration
     * - Type selection and input field updates
     * - Real-time customization changes
     * - Action buttons (download, copy, print)
     * - Example card interactions
     */
    initializeEventListeners() {
        // Generate button click event
        this.generateBtn.addEventListener('click', () => this.generateQRCode());
        
        // Enter key press event for URL input
        this.urlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.generateQRCode();
            }
        });
        
        // Action button events
        this.downloadBtn.addEventListener('click', () => this.downloadQRCode());
        this.copyBtn.addEventListener('click', () => this.copyQRCode());
        this.printBtn.addEventListener('click', () => this.printQRCode());
        
        // QR code type tab events - switch between URL, Text, Email, Phone
        document.querySelectorAll('.type-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                document.querySelectorAll('.type-tab').forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Update input placeholder and icon based on type
                this.updateInputForType(tab.getAttribute('data-type'));
            });
        });
        
        // Real-time customization option change events
        // These trigger immediate QR code regeneration when settings change
        this.sizeSelect.addEventListener('change', () => {
            if (this.currentQRCode) {
                this.regenerateQRCode();
            }
        });
        
        this.errorLevel.addEventListener('change', () => {
            if (this.currentQRCode) {
                this.regenerateQRCode();
            }
        });
        
        this.formatSelect.addEventListener('change', () => {
            if (this.currentQRCode) {
                this.regenerateQRCode();
            }
        });
        
        // Example card events - auto-fill URL and generate QR code
        document.querySelectorAll('.example-card').forEach(card => {
            card.addEventListener('click', () => {
                const url = card.getAttribute('data-url');
                this.urlInput.value = url;
                this.generateQRCode();
            });
        });
    }

    /**
     * Generate QR Code
     * Main method that orchestrates the QR code generation process
     * Validates input, generates QR code, and displays results
     */
    async generateQRCode() {
        // Get and validate URL input
        const url = this.urlInput.value.trim();
        
        if (!url) {
            this.showError('Please enter a URL');
            return;
        }

        if (!this.isValidUrl(url) && !this.isValidText(url)) {
            this.showError('Please enter a valid URL or text');
            return;
        }

        try {
            // Show loading state
            this.showLoading(true);
            
            // Get user-selected options
            const size = parseInt(this.sizeSelect.value);
            const errorCorrectionLevel = this.errorLevel.value;
            const format = this.formatSelect.value;
            
            // Generate QR code using the qrcode-generator library
            const qrCodeDataURL = await this.createQRCode(url, size, errorCorrectionLevel, format);
            
            // Display the generated QR code
            this.displayQRCode(qrCodeDataURL, url, size, format);
            
            // Show action buttons for the generated QR code
            this.qrActions.style.display = 'flex';
            
        } catch (error) {
            this.showError(`Error generating QR code: ${error.message}`);
        } finally {
            // Hide loading state
            this.showLoading(false);
        }
    }

    /**
     * Create QR Code
     * Generates a QR code using the qrcode-generator library and HTML5 Canvas
     * 
     * @param {string} text - The text/URL to encode in the QR code
     * @param {number} size - The desired size of the QR code in pixels
     * @param {string} errorCorrectionLevel - Error correction level (L, M, Q, H)
     * @param {string} format - Output format (png, jpg)
     * @returns {Promise<string>} - Data URL of the generated QR code
     */
    createQRCode(text, size, errorCorrectionLevel, format) {
        return new Promise((resolve, reject) => {
            try {
                // Initialize QR code generator with error correction level
                const qr = qrcode(0, errorCorrectionLevel);
                qr.addData(text);
                qr.make();
                
                // Create HTML5 Canvas for rendering
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Calculate cell size based on desired output size
                const cellSize = Math.floor(size / qr.getModuleCount());
                const actualSize = qr.getModuleCount() * cellSize;
                
                // Set canvas dimensions
                canvas.width = actualSize;
                canvas.height = actualSize;
                
                // Fill background with white
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, actualSize, actualSize);
                
                // Draw QR code pattern
                ctx.fillStyle = '#000000';
                for (let row = 0; row < qr.getModuleCount(); row++) {
                    for (let col = 0; col < qr.getModuleCount(); col++) {
                        if (qr.isDark(row, col)) {
                            ctx.fillRect(
                                col * cellSize,
                                row * cellSize,
                                cellSize,
                                cellSize
                            );
                        }
                    }
                }
                
                // Convert canvas to data URL for display/download
                const dataURL = canvas.toDataURL(`image/${format}`, 1.0);
                resolve(dataURL);
                
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Display QR Code
     * Displays the generated QR code in the UI and stores the data for actions
     * 
     * @param {string} dataURL - Data URL of the generated QR code
     * @param {string} originalUrl - Original URL that was encoded
     * @param {number} size - Size of the generated QR code
     * @param {string} format - Format of the generated QR code
     */
    displayQRCode(dataURL, originalUrl, size, format) {
        // Clear previous content from the container
        this.qrContainer.innerHTML = '';
        
        // Create image element for the QR code
        const img = document.createElement('img');
        img.src = dataURL;
        img.alt = 'Generated QR Code';
        img.className = 'generated-qr';
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
        
        // Add the image to the container
        this.qrContainer.appendChild(img);
        
        // Store current QR code data for download/copy actions
        this.currentQRCode = { dataURL, originalUrl, size, format };
        
        // Update the information panel with QR code details
        this.updateQRDetails(originalUrl, size, format);
    }

    /**
     * Update QR Details
     * Updates the information panel with details about the generated QR code
     * 
     * @param {string} url - The original URL
     * @param {number} size - Size of the QR code
     * @param {string} format - Format of the QR code
     */
    updateQRDetails(url, size, format) {
        // Get the type of URL and current timestamp
        const urlType = this.getUrlType(url);
        const timestamp = new Date().toLocaleString();
        
        // Update the details panel with QR code information
        this.qrDetails.innerHTML = `
            <div class="detail-item">
                <strong>URL:</strong> <span class="url-text">${this.escapeHtml(url)}</span>
            </div>
            <div class="detail-item">
                <strong>Type:</strong> ${urlType}
            </div>
            <div class="detail-item">
                <strong>Size:</strong> ${size}x${size} pixels
            </div>
            <div class="detail-item">
                <strong>Format:</strong> ${format.toUpperCase()}
            </div>
            <div class="detail-item">
                <strong>Generated:</strong> ${timestamp}
            </div>
        `;
    }

    /**
     * Get URL Type
     * Determines the type of URL based on its protocol/prefix
     * 
     * @param {string} url - The URL to analyze
     * @returns {string} - The type of URL
     */
    getUrlType(url) {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return 'Website URL';
        } else if (url.startsWith('mailto:')) {
            return 'Email Address';
        } else if (url.startsWith('tel:')) {
            return 'Phone Number';
        } else if (url.startsWith('sms:')) {
            return 'SMS Message';
        } else if (url.startsWith('WIFI:')) {
            return 'WiFi Network';
        } else if (url.startsWith('geo:')) {
            return 'Geographic Location';
        } else {
            return 'Plain Text';
        }
    }

    /**
     * Download QR Code
     * Downloads the current QR code as an image file
     */
    downloadQRCode() {
        // Check if there's a QR code to download
        if (!this.currentQRCode) return;
        
        // Extract data from current QR code
        const { dataURL, originalUrl, format } = this.currentQRCode;
        const filename = this.generateFilename(originalUrl, format);
        
        // Create temporary download link
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    /**
     * Copy QR Code to Clipboard
     * Copies the current QR code image to the user's clipboard
     */
    async copyQRCode() {
        // Check if there's a QR code to copy
        if (!this.currentQRCode) return;
        
        try {
            // Convert data URL to blob for clipboard API
            const response = await fetch(this.currentQRCode.dataURL);
            const blob = await response.blob();
            
            // Copy image to clipboard using modern Clipboard API
            await navigator.clipboard.write([
                new ClipboardItem({
                    [blob.type]: blob
                })
            ]);
            
            // Show success message
            this.showSuccess('QR code copied to clipboard!');
        } catch (error) {
            // Show error if clipboard access fails
            this.showError('Failed to copy QR code to clipboard');
        }
    }

    /**
     * Print QR Code
     * Opens a new window with the QR code for printing
     */
    printQRCode() {
        // Check if there's a QR code to print
        if (!this.currentQRCode) return;
        
        // Open new window for printing
        const printWindow = window.open('', '_blank');
        const { originalUrl } = this.currentQRCode;
        
        // Create print-friendly HTML content
        printWindow.document.write(`
            <html>
                <head>
                    <title>QR Code - ${originalUrl}</title>
                    <style>
                        body { 
                            font-family: Arial, sans-serif; 
                            text-align: center; 
                            padding: 20px;
                        }
                        img { 
                            max-width: 100%; 
                            height: auto; 
                            margin: 20px 0;
                        }
                        .url { 
                            word-break: break-all; 
                            margin: 20px 0;
                            font-size: 14px;
                            color: #666;
                        }
                    </style>
                </head>
                <body>
                    <h2>QR Code</h2>
                    <img src="${this.currentQRCode.dataURL}" alt="QR Code" />
                    <div class="url">URL: ${originalUrl}</div>
                </body>
            </html>
        `);
        
        // Close document and trigger print dialog
        printWindow.document.close();
        printWindow.print();
    }

    generateFilename(url, format) {
        // Create a safe filename from the URL
        let filename = url
            .replace(/^https?:\/\//, '')
            .replace(/^www\./, '')
            .replace(/[^a-zA-Z0-9.-]/g, '_')
            .substring(0, 50);
        
        if (!filename) {
            filename = 'qrcode';
        }
        
        return `${filename}.${format}`;
    }

    isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    isValidText(text) {
        // Allow any text for QR code generation
        return text.length > 0 && text.length <= 2000;
    }

    showLoading(show) {
        this.generateBtn.disabled = show;
        this.generateBtn.textContent = show ? 'Generating...' : 'Generate QR Code';
        
        if (show) {
            this.qrContainer.innerHTML = `
                <div class="loading">
                    <div class="spinner"></div>
                    <p>Generating QR code...</p>
                </div>
            `;
        }
    }

    showError(message) {
        this.qrContainer.innerHTML = `
            <div class="error-message">
                <div class="error-icon">⚠️</div>
                <p>${message}</p>
            </div>
        `;
        this.qrActions.style.display = 'none';
    }

    showSuccess(message) {
        // Create a temporary success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 3000);
    }

    /**
     * Regenerate QR Code
     * Regenerates the current QR code with updated customization settings.
     * This method is called automatically when size, format, or error correction changes.
     * Provides real-time feedback to users as they customize their QR codes.
     */
    async regenerateQRCode() {
        if (!this.currentQRCode) return;
        
        try {
            this.showLoading(true);
            
            // Get current URL and new customization settings
            const { originalUrl } = this.currentQRCode;
            const size = parseInt(this.sizeSelect.value);
            const errorCorrectionLevel = this.errorLevel.value;
            const format = this.formatSelect.value;
            
            // Generate new QR code with updated settings
            const qrCodeDataURL = await this.createQRCode(originalUrl, size, errorCorrectionLevel, format);
            
            // Update the display with new QR code
            this.displayQRCode(qrCodeDataURL, originalUrl, size, format);
            
        } catch (error) {
            this.showError(`Error updating QR code: ${error.message}`);
        } finally {
            this.showLoading(false);
        }
    }

    /**
     * Update Input for Type
     * Dynamically updates the input field based on selected QR code type.
     * Changes placeholder text, input type, and icon to match the selected type.
     * 
     * @param {string} type - The QR code type (url, text, email, phone)
     */
    updateInputForType(type) {
        const inputIcon = document.querySelector('.input-icon');
        const input = this.urlInput;
        
        switch(type) {
            case 'url':
                input.placeholder = 'Enter URL (e.g., https://example.com)';
                input.type = 'url';
                inputIcon.textContent = '🔗';
                break;
            case 'text':
                input.placeholder = 'Enter text message';
                input.type = 'text';
                inputIcon.textContent = '📝';
                break;
            case 'email':
                input.placeholder = 'Enter email address (e.g., user@example.com)';
                input.type = 'email';
                inputIcon.textContent = '📧';
                break;
            case 'phone':
                input.placeholder = 'Enter phone number (e.g., +1234567890)';
                input.type = 'tel';
                inputIcon.textContent = '📞';
                break;
        }
    }

    /**
     * Escape HTML
     * Escapes HTML characters to prevent XSS attacks
     * 
     * @param {string} text - Text to escape
     * @returns {string} - Escaped HTML
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

/**
 * Initialize Qreate QR Code Generator
 * Initializes the application when the DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    new QRCodeGenerator();
});