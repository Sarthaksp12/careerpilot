# Base image: a minimal Linux distro with Python 3.13 pre-installed.
# "slim" keeps the image smaller than the full python image (faster builds, smaller deploys).
FROM python:3.13-slim

# Sets the working directory inside the container.
# Every command after this runs relative to /app inside the container.
WORKDIR /app

# Copy ONLY requirements.txt first (not the whole app yet).
# Why: Docker caches each layer. If your code changes but requirements.txt doesn't,
# Docker skips reinstalling packages and reuses the cached layer — much faster rebuilds.
COPY requirements.txt .

# Install dependencies inside the container (isolated from your Windows machine entirely).
RUN pip install --no-cache-dir -r requirements.txt

# Now copy the rest of your application code.
COPY . .

# Document which port this container listens on (informational, doesn't actually open it).
EXPOSE 8000

# The command that runs when the container starts.
# --host 0.0.0.0 is REQUIRED here (not 127.0.0.1) so the container accepts
# connections from outside itself (your browser, or Railway's network).
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]