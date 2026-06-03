"""Generate 4 FLUX images for M5 via Replicate API."""
import requests, time, os

API_KEY = os.environ.get("REPLICATE_API_TOKEN", "")
BASE_URL = "https://api.replicate.com/v1"
HEADERS = {"Authorization": f"Token {API_KEY}", "Content-Type": "application/json"}
PROXIES = {"http": None, "https": None}
OUT_DIR = "public/images/concepts"
os.makedirs(OUT_DIR, exist_ok=True)

IMAGES = [
    {
        "name": "product-direction-decision",
        "prompt": "A conceptual illustration of choosing an AI product direction. A person stands at a crossroads with three glowing paths diverging: one leads to a knowledge base/library (representing RAG vertical assistant), one to a robot with tools (Agent automation), one to a brain being fine-tuned (model fine-tuning). The person is thoughtfully considering which path to take. Clean modern educational style, dark background with warm hopeful lighting. No text, no watermarks."
    },
    {
        "name": "ai-coding-workflow",
        "prompt": "An illustration showing AI-assisted coding workflow. A developer sits at a desk with a holographic screen. On one side, code architecture diagrams float (designed by human). In the center, AI-generated code blocks flow and assemble. The developer reviews and approves each piece. The collaboration between human and AI is shown as a dance of light. Modern tech illustration, dark background. No text, no watermarks."
    },
    {
        "name": "deployment-architecture",
        "prompt": "A beautiful visualization of deploying an AI application. A glowing application icon at the center connects to surrounding cloud platforms (shown as floating islands in the sky). Data flows from a local computer up through glowing pipelines to the cloud servers. The application is now accessible from multiple devices (phone, laptop, tablet) shown at the edges. Clean modern illustration, dark sky background with stars. No text, no watermarks."
    },
    {
        "name": "user-feedback-loop",
        "prompt": "A circular feedback loop illustration. Users at the top provide feedback (shown as glowing speech bubbles flowing down). The feedback enters a processing center where insights are extracted (magnifying glass icon). These insights flow into product improvements (gear/wrench icon). The improved product flows back up to users. A continuous beautiful cycle. Clean modern infographic style, dark background. No text, no watermarks."
    },
]

for i, img in enumerate(IMAGES):
    print(f"[{i+1}/{len(IMAGES)}] {img['name']}...")
    time.sleep(12)

    response = requests.post(
        f"{BASE_URL}/models/black-forest-labs/flux-1.1-pro/predictions",
        headers=HEADERS,
        json={"input": {"prompt": img["prompt"], "aspect_ratio": "16:9", "output_format": "png"}},
        proxies=PROXIES,
    )

    if response.status_code != 201:
        print(f"  Error: {response.status_code} {response.text[:200]}")
        continue

    pred_id = response.json()["id"]
    while True:
        s = requests.get(f"{BASE_URL}/predictions/{pred_id}", headers=HEADERS, proxies=PROXIES).json()
        if s["status"] == "succeeded":
            data = requests.get(s["output"], proxies=PROXIES).content
            fp = os.path.join(OUT_DIR, f"{img['name']}.png")
            with open(fp, "wb") as f: f.write(data)
            print(f"  Saved: {fp} ({len(data)/1024:.0f} KB)")
            break
        elif s["status"] == "failed":
            print(f"  Failed: {s.get('error','?')}")
            break
        else:
            print(f"  {s['status']}...")
            time.sleep(3)

print("\nDone!")
