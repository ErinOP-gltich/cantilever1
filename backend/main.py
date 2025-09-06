import cv2
import re
import numpy as np
import base64
import io
from PIL import Image
import easyocr  

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# --- NEURAL NETWORK MODEL INITIALIZATION ---

print("Loading EasyOCR model into memory... This may take a moment.")
EASYOCR_READER = easyocr.Reader(['en']) 
print("EasyOCR model loaded successfully.")


app = FastAPI(
    title="Vastu Calculator (Neural Network Edition)",
    description="Upload an architectural plan to analyze its Vastu compliance.",
    version="2.1.0" 
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ----------------------RULES-------------------------------
VASTU_RULES = {
    # North-East Zone (Water Element) - Ideal for sacred spaces
    "pooja room": ["NE"], 
    "temple": ["NE"],
    "entrance": ["NE", "E", "N"], 
    "main entry": ["NE", "E", "N"], 
    "living room": ["NE", "E", "N", "NW"], 
    "balcony": ["NE"], 
    "verandah": ["NE"],
    "front porch": ["N", "E", "NE"], # <-- NEW
    "back porch": ["N", "E", "NE"],  # <-- NEW
    "underground water tank": ["NE"], 
    
    # South-East Zone (Fire Element) - Ideal for heat and electricals
    "kitchen": ["SE"], 
    "kitchen verandah": ["NE"],
    "kitchen store": ["SE", "S"],
    "pantry": ["SE", "S"],        
    "electric meter": ["SE"],
    "generator": ["SE"], 
    "laundry": ["NW", "SE"],      
    
    # South Zone (Earth Element) - Ideal for stability
    "bedroom": ["S", "W"], 
    "store room": ["SE", "S"], 

    # South-West Zone (Earth Element) - Ideal for heavy items, leadership
    "master bedroom": ["SW"], 
    "wardrobe": ["SW"], 
    "closet": ["SW"],             
    "cash cupboard": ["SW", "N"],
    "heavy items": ["SW"], 
    "overhead water tank": ["SW", "S", "W"], 
    "staircase": ["S", "SW"],

    # West Zone (Water Element - Varuna) - Ideal for dining, studies
    "dining room": ["W", "SE"], 
    "dining": ["W", "SE"],      
    "study room": ["W", "E"],
    "children bedroom": ["W", "NW"],
    
    # North-West Zone (Air Element) - Ideal for movement, guests, outlets
    "guest room": ["NW", "E"],
    "parking": ["W", "NW"], 
    "garage": ["W", "NW"],
    "toilet": ["W", "NW"],
    "septic tank": ["W", "NW"], 
    
    # North Zone (Water/Wealth Element) - Ideal for offices, cash
    "bathroom": ["E", "NW", "N"],
    "bath": ["E", "NW", "N"]      
}


def find_and_crop_to_plan(image, padding=20):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if not contours: return image
    largest_contour = max(contours, key=cv2.contourArea)
    x, y, w, h = cv2.boundingRect(largest_contour)
    x_start, y_start = max(0, x - padding), max(0, y - padding)
    x_end, y_end = min(image.shape[1], x + w + padding), min(image.shape[0], y + h + padding)
    return image[y_start:y_end, x_start:x_end]


def preprocess_image_for_nn(image):
    upscaled = cv2.resize(image, None, fx=1.875, fy=1.875, interpolation=cv2.INTER_CUBIC)
    return upscaled

def perform_nn_ocr(image):
    results = EASYOCR_READER.readtext(image, paragraph=False)
    
    final_rooms = []
    for (bbox, text, prob) in results:
        if prob > 0.4: 
            cleaned_text = re.sub(r'[^a-zA-Z\s]', '', text).lower().strip()
            
            if len(cleaned_text) < 2: continue
            
            if cleaned_text in ['up', 'dn']: cleaned_text = 'staircase'

            best_match_key = None
            if cleaned_text in VASTU_RULES:
                best_match_key = cleaned_text
            else:
                for key in VASTU_RULES.keys():
                    if all(word in cleaned_text for word in key.split()):
                        best_match_key = key
                        break
            
            if best_match_key:
                (tl, _, br, _) = bbox
                x, y = int(tl[0]), int(tl[1])
                w, h = int(br[0] - tl[0]), int(br[1] - tl[1])
                
                final_rooms.append({"text": best_match_key, "bbox": (x, y, w, h)})
    
    return final_rooms


def get_grid_location(bbox, img_width, img_height):
    x, y, w, h = bbox
    center_x, center_y = x + w / 2, y + h / 2
    if center_x < img_width / 3: col = 'W'
    elif center_x < 2 * img_width / 3: col = 'C'
    else: col = 'E'
    if center_y < img_height / 3: row = 'N'
    elif center_y < 2 * img_height / 3: row = 'C'
    else: row = 'S'
    location_map = {('N', 'W'): 'NW', ('N', 'C'): 'N', ('N', 'E'): 'NE',
                    ('C', 'W'): 'W', ('C', 'C'): 'Center', ('C', 'E'): 'E',
                    ('S', 'W'): 'SW', ('S', 'C'): 'S', ('S', 'E'): 'SE'}
    return location_map.get((row, col), 'Unknown')

def generate_report_data(located_rooms):
    
    report = {"summary": {}, "details": []}
    verified_count, not_verified_count = 0, 0
    for room in located_rooms:
        room_title = room['text'].lower()
        location = room['location']
        room_detail = { "room_name": room_title.title(), "detected_location": location, "status": "UNKNOWN", "ideal_locations": "N/A", "message": f"No specific rule found for '{room_title.title()}'" }
        best_match_key = room_title 
        if best_match_key in VASTU_RULES:
            ideal_locations = VASTU_RULES[best_match_key]
            room_detail["ideal_locations"] = ', '.join(ideal_locations)
            if location in ideal_locations:
                room_detail["status"], verified_count = "VERIFIED", verified_count + 1
                room_detail["message"] = f"Correctly placed in {location}."
            else:
                room_detail["status"], not_verified_count = "NOT VERIFIED", not_verified_count + 1
                room_detail["message"] = f"Found in {location}, but ideal location(s) are: {', '.join(ideal_locations)}."
        report["details"].append(room_detail)
    report["summary"] = { "total_rooms_analyzed": len(located_rooms), "verified_placements": verified_count, "not_verified_placements": not_verified_count }
    return report

def draw_visualizations(image, located_rooms):
   
    h, w, _ = image.shape
    font_scale = max(0.5, 0.7 * (w / 1200))
    thickness = max(1, int(2 * (w / 1200)))
    for i in range(1, 3):
        cv2.line(image, (int(w * i / 3), 0), (int(w * i / 3), h), (0, 0, 255), thickness)
        cv2.line(image, (0, int(h * i / 3)), (w, int(h * i / 3)), (0, 0, 255), thickness)
    for room in located_rooms:
        x, y, w_box, h_box = room['bbox']
        location = room['location']
        cv2.rectangle(image, (x, y), (x + w_box, y + h_box), (0, 255, 0), thickness)
        label = f"{room['text'].title()} ({location})"
        (lw, lh), base = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, font_scale, thickness)
        cv2.rectangle(image, (x, y - lh - 10), (x + lw, y), (0, 255, 0), -1)
        cv2.putText(image, label, (x, y - 5), cv2.FONT_HERSHEY_SIMPLEX, font_scale, (0, 0, 0), thickness)
    return image

@app.post("/analyze/")
async def analyze_vastu_plan(file: UploadFile = File(...)):
    contents = await file.read()
    pil_image = Image.open(io.BytesIO(contents))
    original_image = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)
    
    processed_image = preprocess_image_for_nn(original_image)
    
    rooms = perform_nn_ocr(processed_image)
    
    if not rooms: 
        return {"error": "Could not detect any recognizable room titles in the image."}
    
    h_proc, w_proc, _ = processed_image.shape
    located_rooms = [{'location': get_grid_location(r['bbox'], w_proc, h_proc), **r} for r in rooms]
    
    report_data = generate_report_data(located_rooms)
    output_image = draw_visualizations(processed_image, located_rooms)
    
    _, buffer = cv2.imencode('.jpg', output_image)
    base64_image = base64.b64encode(buffer).decode('utf-8')
    data_url_image = f"data:image/jpeg;base64,{base64_image}"
    
    return {"report": report_data, "analyzed_image": data_url_image}

@app.get("/")
def read_root(): 
    return {"message": "Welcome to the Vastu Analysis API. Please go to /docs to test the endpoint."}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
