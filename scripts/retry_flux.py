"""Retry failed M2 FLUX images"""
import requests
import time
import os

API_KEY = os.environ.get("REPLICATE_API_TOKEN", "")
BASE_URL = "https://api.replicate.com/v1"
HEADERS = {"Authorization": f"Token {API_KEY}", "Content-Type": "application/json"}
PROXIES = {"http": None, "https": None}
OUT_DIR = "public/images/concepts"

IMAGES = [
    {
        "name": "vector-db-concept",
        "prompt": "A conceptual illustration showing how a vector database works. A user submits a query (shown as a glowing orb entering from the left), which transforms into a vector (a series of numbers floating in the air like 0.23, -0.45, 0.78). This vector then searches through a vast 3D grid of stored document vectors, finding the closest matches which light up brightly. Clean, modern tech illustration style with dark background. No text labels, no watermarks, no UI elements."
    },
    {
        "name": "rag-vs-pure-llm",
        "prompt": "A side-by-side comparison illustration. Left side: a confused AI robot making up random facts, with question marks and error symbols floating around it (representing hallucination). Right side: a confident AI robot reading from books/documents and giving accurate answers with checkmarks and source citations. The contrast is clear and dramatic. Dark background, clean modern educational style. No text labels, no watermarks, no UI elements."
    },
]

for i, img in enumerate(IMAGES):
    print(f"[{i+1}/{len(IMAGES)}] Retrying {img['name']}...")
    time.sleep(15)  # Wait for rate limit to reset

    response = requests.post(
        f"{BASE_URL}/models/black-forest-labs/flux-1.1-pro/predictions",
        headers=HEADERS,
        json={"input": {"prompt": img["prompt"], "aspect_ratio": "16:9", "output_format": "png"}},
        proxies=PROXIES,
    )

    if response.status_code != 201:
        print(f"  Error: {response.status_code} {response.text}")
        continue

    prediction = response.json()
    pred_id = prediction["id"]

    while True:
        status_resp = requests.get(
            f"{BASE_URL}/predictions/{pred_id}",
            headers=HEADERS,
            proxies=PROXIES,
        )
        status = status_resp.json()

        if status["status"] == "succeeded":
            output_url = status["output"]
            print(f"  Downloading...")
            img_data = requests.get(output_url, proxies=PROXIES).content
            filepath = os.path.join(OUT_DIR, f"{img['name']}.png")
            with open(filepath, "wb") as f:
                f.write(img_data)
            print(f"  Saved: {filepath} ({len(img_data)/1024:.0f} KB)")
            break
        elif status["status"] == "failed":
            print(f"  Failed: {status.get('error', 'unknown')}")
            break
        else:
            print(f"  {status['status']}...")
            time.sleep(3)

print("\nDone!")
