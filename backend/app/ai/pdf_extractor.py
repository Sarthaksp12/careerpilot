import fitz
import pytesseract
from pdf2image import convert_from_path

# Tesseract Path
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# Poppler Path
POPPLER_PATH = r"C:\Users\sarthak patil\Downloads\Release-26.02.0-0\poppler-26.02.0\Library\bin"


def extract_text(pdf_path: str):
    text = ""

    # Try PyMuPDF first
    try:
        doc = fitz.open(pdf_path)

        for page in doc:
            text += page.get_text("text")

        doc.close()

        if text.strip():
            print("✅ Text extracted using PyMuPDF")
            return text

        print("⚠ No text found using PyMuPDF")

    except Exception as e:
        print("PyMuPDF Error:", e)

    # OCR fallback
    try:
        print("🔄 Running OCR...")

        images = convert_from_path(
            pdf_path,
            poppler_path=POPPLER_PATH
        )

        ocr_text = ""

        for i, image in enumerate(images):
            print(f"Reading Page {i+1}")
            ocr_text += pytesseract.image_to_string(image)

        print("✅ OCR Completed")
        return ocr_text

    except Exception as e:
        print("OCR Error:", e)
        return ""