import pdfplumber

pdf_path = r"uploads\Resume Actual.pdf.pdf"

with pdfplumber.open(pdf_path) as pdf:
    print("Pages:", len(pdf.pages))

    for i, page in enumerate(pdf.pages):
        text = page.extract_text()
        print(f"\nPage {i+1}")
        print("Length:", 0 if text is None else len(text))
        print(text[:500] if text else "No text found")