# Vastu Calculator Backend

This is the FastAPI backend for the Vastu Calculator application, powered by EasyOCR neural network for advanced floor plan analysis.

## Features

- **Neural Network OCR**: Uses EasyOCR for superior text detection
- **Advanced Image Processing**: OpenCV-based preprocessing and analysis
- **Comprehensive Vastu Rules**: 20+ room types with directional guidelines
- **Real-time Analysis**: Fast processing with progress tracking
- **Visual Output**: Returns analyzed images with room markers

## Setup

### Prerequisites

- Python 3.8 or higher
- pip package manager

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   python start_backend.py
   ```

   Or manually:
   ```bash
   pip install -r requirements.txt
   python main.py
   ```

### Running the Server

The server will start on `http://localhost:8000`

- **API Documentation**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/

## API Endpoints

### POST /analyze/
Upload a floor plan image for Vastu analysis.

**Request**: Multipart form data with image file
**Response**: JSON with analysis report and processed image

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

## Vastu Rules

The system recognizes 20+ room types with their ideal directional placements:

- **North-East Zone**: Pooja room, temple, entrance, living room
- **South-East Zone**: Kitchen, pantry, electric meter, generator
- **South Zone**: Bedroom, store room
- **South-West Zone**: Master bedroom, wardrobe, staircase
- **West Zone**: Dining room, study room, children's bedroom
- **North-West Zone**: Guest room, parking, toilet
- **North Zone**: Bathroom, office

## Technical Details

- **OCR Engine**: EasyOCR with English language support
- **Image Processing**: OpenCV for preprocessing and visualization
- **Grid Analysis**: 3x3 grid system for directional classification
- **Confidence Filtering**: Minimum 40% confidence for text detection
- **Image Enhancement**: 1.875x upscaling for better OCR accuracy

## Troubleshooting

1. **Model Loading**: First run may take time to download EasyOCR models
2. **Memory Usage**: Ensure sufficient RAM for image processing
3. **CORS Issues**: Backend is configured to allow all origins for development
4. **Port Conflicts**: Default port 8000, change in main.py if needed

## Development

To modify the Vastu rules or add new room types, edit the `VASTU_RULES` dictionary in `main.py`.
