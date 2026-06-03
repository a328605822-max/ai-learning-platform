"""
Generate FLUX images for M2 via Replicate REST API.
Uses black-forest-labs/flux-1.1-pro model.
"""
import requests
import base64
import time
import os

API_KEY = os.environ.get("REPLICATE_API_TOKEN", "")
BASE_URL = "https://api.replicate.com/v1"
HEADERS = {"Authorization": f"Token {API_KEY}", "Content-Type": "application/json"}
PROXIES = {"http": None, "https": None}  # Bypass system proxy

# Output directory
OUT_DIR = "public/images/concepts"
os.makedirs(OUT_DIR, exist_ok=True)

# M2 images to generate (5 total)
IMAGES = [
    {
        "name": "semantic-space-3d",
        "prompt": "A stunning 3D visualization of semantic vector space. Words and concepts float as glowing points in a dark cosmic space. Similar words cluster together naturally - animals group in one region, foods in another, technology in another. Lines connect related concepts forming a beautiful constellation-like network. The clusters are color-coded: warm orange for animals, cool blue for technology, green for food. Clean modern educational illustration style. No text, no labels, no watermarks, no UI elements."
    },
    {
        "name": "vector-db-concept",
        "prompt": "A conceptual illustration showing how a vector database works. A user submits a query (shown as a glowing orb entering from the left), which transforms into a vector (a series of numbers floating in the air like 0.23, -0.45, 0.78). This vector then searches through a vast 3D grid of stored document vectors, finding the closest matches which light up brightly. Clean, modern tech illustration style with dark background. No text labels, no watermarks, no UI elements."
    },
    {
        "name": "chunking-strategy",
        "prompt": "An educational illustration showing document chunking strategies. A long document is visually split into three different chunk sizes: tiny pieces (too small, losing context), medium pieces (just right, preserving meaning), and large pieces (too big, losing precision). The medium chunks are highlighted in green with a subtle glow. Clean modern educational infographic style, dark background. No text, no labels, no watermarks."
    },
    {
        "name": "rag-full-pipeline",
        "prompt": "A beautiful conceptual illustration of the RAG (Retrieval-Augmented Generation) pipeline. Show data flowing through stages: document icon on left -> documents being split into chunks -> chunks transforming into colorful vectors -> vectors being stored in a database cylinder -> a query coming in -> vectors being searched -> results flowing into an AI brain/LLM -> final answer with citation marks. Clean pipeline visualization with glowing flow lines connecting each stage. Modern tech illustration, dark background, professional educational style. No text labels, no watermarks, no UI elements."
    },
    {
        "name": "rag-vs-pure-llm",
        "prompt": "A side-by-side comparison illustration. Left side: a confused AI robot making up random facts, with question marks and error symbols floating around it (representing hallucination). Right side: a confident AI robot reading from books/documents and giving accurate answers with checkmarks and source citations. The contrast is clear and dramatic. Dark background, clean modern educational style. No text labels, no watermarks, no UI elements."
    },
]

for i, img in enumerate(IMAGES):
    print(f"[{i+1}/{len(IMAGES)}] Generating {img['name']}...")

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

    # Poll for completion
    while True:
        status_resp = requests.get(
            f"{BASE_URL}/predictions/{pred_id}",
            headers=HEADERS,
            proxies=PROXIES,
        )
        status = status_resp.json()

        if status["status"] == "succeeded":
            output_url = status["output"]
            print(f"  Downloading from {output_url[:80]}...")

            img_data = requests.get(output_url, proxies=PROXIES).content
            filepath = os.path.join(OUT_DIR, f"{img['name']}.png")
            with open(filepath, "wb") as f:
                f.write(img_data)

            size_kb = len(img_data) / 1024
            print(f"  Saved: {filepath} ({size_kb:.0f} KB)")
            break

        elif status["status"] == "failed":
            print(f"  Failed: {status.get('error', 'unknown error')}")
            break

        else:
            print(f"  Status: {status['status']}...")
            time.sleep(3)

    time.sleep(1)

print("\nDone!")
