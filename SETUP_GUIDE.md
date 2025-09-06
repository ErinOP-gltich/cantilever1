# Vastu Calculator - Complete Setup Guide

This guide will help you set up the Vastu Calculator application with both the React frontend and FastAPI backend.

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)
```bash
# Windows
start_app.bat

# Or PowerShell
.\start_app.ps1
```

### Option 2: Manual Setup

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn**

## 🔧 Backend Setup (FastAPI + EasyOCR)

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Start the backend server:**
   ```bash
   python main.py
   ```

   The backend will be available at: `http://localhost:8000`

## 🎨 Frontend Setup (React + TypeScript)

1. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

   The frontend will be available at: `http://localhost:8080`

## 🔍 Verification

1. **Backend Health Check:**
   - Visit: `http://localhost:8000`
   - Should show: `{"message": "Welcome to the Vastu Analysis API..."}`

2. **API Documentation:**
   - Visit: `http://localhost:8000/docs`
   - Interactive Swagger UI for testing endpoints

3. **Frontend Application:**
   - Visit: `http://localhost:8080`
   - Should show the Cantilever homepage

4. **Vastu Calculator:**
   - Click "Vastu Calculator" button
   - Upload a floor plan image
   - Test the analysis functionality

## 🏗️ Architecture

```
Cantilever1/
├── src/                    # React frontend
│   ├── pages/
│   │   └── VastuCalculator.tsx
│   └── components/
├── backend/                # FastAPI backend
│   ├── main.py            # Main FastAPI application
│   ├── requirements.txt   # Python dependencies
│   └── start_backend.py   # Startup script
├── start_app.bat          # Windows startup script
├── start_app.ps1          # PowerShell startup script
└── SETUP_GUIDE.md         # This file
```

## 🔧 Configuration

### Backend Configuration
- **Port**: 8000 (configurable in `main.py`)
- **CORS**: Enabled for all origins
- **OCR Model**: EasyOCR with English support

### Frontend Configuration
- **Port**: 8080 (configurable in `vite.config.ts`)
- **API URL**: `http://localhost:8000` (configurable in `VastuCalculator.tsx`)

## 🐛 Troubleshooting

### Backend Issues

1. **EasyOCR Model Download:**
   - First run downloads models (~100MB)
   - Ensure stable internet connection
   - May take 2-3 minutes

2. **Python Dependencies:**
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt --force-reinstall
   ```

3. **Port Already in Use:**
   - Change port in `main.py`: `uvicorn.run(app, host="0.0.0.0", port=8001)`
   - Update frontend URL in `VastuCalculator.tsx`

### Frontend Issues

1. **Dependencies:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Port Already in Use:**
   - Change port in `vite.config.ts`
   - Or use: `npm run dev -- --port 8081`

### Connection Issues

1. **Backend Not Responding:**
   - Check if backend is running on port 8000
   - Verify firewall settings
   - Check console for error messages

2. **CORS Errors:**
   - Backend is configured to allow all origins
   - If issues persist, check browser console

## 📊 Features

### Neural Network OCR
- **Engine**: EasyOCR (superior to Tesseract)
- **Languages**: English
- **Confidence**: 40% minimum threshold
- **Preprocessing**: Advanced image enhancement

### Vastu Analysis
- **Room Types**: 20+ recognized room types
- **Directions**: 8-directional analysis (N, NE, E, SE, S, SW, W, NW)
- **Rules**: Comprehensive Vastu compliance rules
- **Visualization**: Grid overlay and room markers

### User Interface
- **Upload**: Drag & drop or click to upload
- **Progress**: Real-time analysis progress
- **Results**: Detailed compliance report
- **Visualization**: Analyzed image with markers

## 🚀 Production Deployment

### Backend (FastAPI)
```bash
# Install production server
pip install gunicorn

# Run with Gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Frontend (React)
```bash
# Build for production
npm run build

# Serve with static server
npx serve -s dist -l 8080
```

## 📝 API Reference

### POST /analyze/
Analyze a floor plan image for Vastu compliance.

**Request:**
- Content-Type: `multipart/form-data`
- Body: Image file

**Response:**
```json
{
  "report": {
    "summary": {
      "total_rooms_analyzed": 5,
      "verified_placements": 3,
      "not_verified_placements": 2
    },
    "details": [
      {
        "room_name": "Kitchen",
        "detected_location": "SE",
        "status": "VERIFIED",
        "ideal_locations": "SE",
        "message": "Correctly placed in SE."
      }
    ]
  },
  "analyzed_image": "data:image/jpeg;base64,..."
}
```

## 🎯 Usage Tips

1. **Image Quality**: Use high-resolution images with clear, bold text
2. **Room Labels**: Ensure room names are clearly visible
3. **File Formats**: JPG, PNG, WebP supported
4. **Analysis Time**: First analysis may take 30-60 seconds
5. **Browser**: Use modern browsers (Chrome, Firefox, Safari, Edge)

## 📞 Support

If you encounter issues:
1. Check the console for error messages
2. Verify both servers are running
3. Ensure all dependencies are installed
4. Check network connectivity

---

**Happy Vastu Analyzing! 🏠✨**
