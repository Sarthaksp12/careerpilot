import fitz

pdf = fitz.open("uploads/Resume Actual.pdf.pdf")

print("Pages:", len(pdf))

for i, page in enumerate(pdf):
    text = page.get_text("text")
    print(f"Page {i+1}: {len(text)} characters")
    print(text[:500])

pdf.close()