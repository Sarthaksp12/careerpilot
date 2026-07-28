

import requests

url = "https://jsearch.p.rapidapi.com/search-v2"

querystring = {
    "query": "python",
    "num_pages": "1",
    "country": "us",
    "date_posted": "all",
}

headers = {
    "x-rapidapi-key": "YOUR_API_KEY",
    "x-rapidapi-host": "jsearch.p.rapidapi.com",
    "Content-Type": "application/json",
}

response = requests.get(
    url,
    headers=headers,
    params=querystring,
)

print("Status:", response.status_code)
print(response.text)