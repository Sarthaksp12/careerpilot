import fitz

try:
    import pytesseract
    from pdf2image import convert_from_path
    OCR_AVAILABLE = True
except ImportError:
    OCR_AVAILABLE = False


def extract_text(pdf_path: str):
    text = ""

    try:
        doc = fitz.open(pdf_path)

        for page in doc:
            text += page.get_text("text")

        doc.close()

        if text.strip():
            print("Text extracted using PyMuPDF")
            return text

    except Exception as e:
        print("PyMuPDF Error:", e)

    if not OCR_AVAILABLE:
        print("OCR libraries not installed.")
        return ""

    try:
        print("Running OCR...")

        images = convert_from_path(pdf_path)

        ocr_text = ""

        for image in images:
            ocr_text += pytesseract.image_to_string(image)

        return ocr_text

    except Exception as e:
        print("OCR Error:", e)
        return ""