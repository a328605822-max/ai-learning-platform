"""Generate 6 FLUX images for M3 via Replicate REST API."""
import requests
import time
import os

API_KEY = os.environ.get("REPLICATE_API_TOKEN", "")
BASE_URL = "https://api.replicate.com/v1"
HEADERS = {"Authorization": f"Token {API_KEY}", "Content-Type": "application/json"}
PROXIES = {"http": None, "https": None}
OUT_DIR = "public/images/concepts"
os.makedirs(OUT_DIR, exist_ok=True)

IMAGES = [
    {
        "name": "function-calling-concept",
        "prompt": "A beautiful conceptual illustration of AI Function Calling. A friendly robot sits at a control panel, pointing at different glowing buttons labeled with tool icons (weather, calculator, search). The robot is not pressing the buttons itself - it's telling a human programmer (shown as hands on a keyboard) what to press. Clean modern educational illustration, dark cosmic background, purple and blue color scheme. No text labels, no watermarks."
    },
    {
        "name": "tool-schema",
        "prompt": "An educational illustration showing how JSON Schema defines tools for AI. On the left, three floating holographic cards showing structured tool definitions (weather tool, calculator tool, search tool) with glowing parameter fields. On the right, an AI brain connecting to the correct tool based on user intent. Clean tech illustration style, dark background with subtle grid. No text, no watermarks."
    },
    {
        "name": "agent-thinking-process",
        "prompt": "A visualization of an AI Agent's thinking process. A glowing brain-like structure in the center with multiple thought bubbles branching out showing step-by-step reasoning: 'What do I need?', 'Let me check this first', 'Now I need more info', 'Task complete!'. The thought chain is connected by glowing lines showing the logical flow. Clean modern educational style, dark background, purple and teal. No text in the actual image, no watermarks."
    },
    {
        "name": "react-pattern",
        "prompt": "A beautiful circular diagram visualization of the ReAct (Reasoning + Acting) pattern. A looping cycle shows: a thinking brain icon -> action hands icon -> observation eye icon -> back to thinking. The cycle has glowing arrows flowing between stages. Each stage is color-coded. Clean modern educational illustration, dark background. No text labels, no watermarks."
    },
    {
        "name": "multi-agent-scene",
        "prompt": "An illustration showing multiple AI agents collaborating on a complex task. Three robot characters work together: one searches the web, one analyzes data on a holographic screen, and one composes an email. They are connected by glowing data streams showing information flowing between them. Modern tech illustration, dark background, professional style. No text, no watermarks."
    },
    {
        "name": "safety-boundary",
        "prompt": "A conceptual illustration of AI safety boundaries. A glowing shield barrier separates 'safe zone' (green glowing icons of search, weather check, read operations) from 'restricted zone' (red icons of email, delete, money transfer). A human hand hovers over a confirmation button, acting as the gatekeeper. Clean modern illustration, dark background. No text, no watermarks."
    },
]

for i, img in enumerate(IMAGES):
    print(f"[{i+1}/{len(IMAGES)}] Generating {img['name']}...")
    time.sleep(12)  # Rate limit cooldown

    response = requests.post(
        f"{BASE_URL}/models/black-forest-labs/flux-1.1-pro/predictions",
        headers=HEADERS,
        json={"input": {"prompt": img["prompt"], "aspect_ratio": "16:9", "output_format": "png"}},
        proxies=PROXIES,
    )

    if response.status_code != 201:
        print(f"  Error: {response.status_code} {response.text}")
        continue

    pred_id = response.json()["id"]

    while True:
        status_resp = requests.get(
            f"{BASE_URL}/predictions/{pred_id}",
            headers=HEADERS,
            proxies=PROXIES,
        )
        status = status_resp.json()

        if status["status"] == "succeeded":
            output_url = status["output"]
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
