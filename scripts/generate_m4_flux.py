"""Generate 6 FLUX images for M4 via Replicate API."""
import requests, time, os

API_KEY = os.environ.get("REPLICATE_API_TOKEN", "")
BASE_URL = "https://api.replicate.com/v1"
HEADERS = {"Authorization": f"Token {API_KEY}", "Content-Type": "application/json"}
PROXIES = {"http": None, "https": None}
OUT_DIR = "public/images/concepts"
os.makedirs(OUT_DIR, exist_ok=True)

IMAGES = [
    {
        "name": "perceptron-to-network",
        "prompt": "A beautiful educational illustration showing the evolution from a single neuron to a multi-layer neural network. Left side: one simple circle neuron with a few inputs. Middle: a small network with one hidden layer. Right side: a deep network with many interconnected glowing nodes and layers. Each stage is color-coded. Clean modern educational style, dark background, purple and blue color scheme. No text labels, no watermarks."
    },
    {
        "name": "backpropagation-visual",
        "prompt": "A stunning visualization of the backpropagation algorithm. Show a neural network where error signals flow backwards as glowing red/orange streams from the output layer back through hidden layers to the input layer. The forward pass is shown as cool blue streams, the backward error flow as warm orange/red. Each weight is visualized as a small dial being slightly adjusted. Educational infographic style, dark background. No text, no watermarks."
    },
    {
        "name": "gradient-descent-landscape",
        "prompt": "A beautiful 3D visualization of gradient descent optimization. A mountainous loss landscape with peaks and valleys in deep purple and blue. A small glowing ball rolls down from a high point, following the steepest descent path, eventually settling in a deep valley (the minimum). Multiple descent paths shown with dotted trails. Clean modern scientific visualization, dark background. No text, no watermarks."
    },
    {
        "name": "transformer-attention-heatmap",
        "prompt": "A mesmerizing visualization of Transformer attention patterns. A sentence's words are connected by glowing lines of varying thickness and color intensity - thick bright lines between related words, thin dim lines between unrelated words. The connections form a beautiful web pattern. Color scheme goes from cool blue (low attention) through yellow to hot red (high attention). Dark background, modern scientific visualization. No text, no watermarks."
    },
    {
        "name": "self-attention-mechanism",
        "prompt": "An educational illustration of the Self-Attention mechanism. Three streams of data (Query, Key, Value) shown as flowing ribbons of colored light converging and interacting. The Query ribbon searches through Keys, finds matches, and weights the Value ribbon accordingly. The interaction creates a beautiful interference pattern where the ribbons intersect. Clean modern tech illustration, dark background, professional style. No text, no watermarks."
    },
    {
        "name": "gpt-training-process",
        "prompt": "A beautiful time-lapse style illustration showing the GPT training process. From left to right: random noise/static gradually resolving into coherent text patterns. The progression shows: random characters → occasional real words → short phrases → grammatically correct sentences → Shakespeare-style text. Each stage is a glowing panel connected by flowing energy streams. Modern educational visualization, dark background. No text, no watermarks."
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
