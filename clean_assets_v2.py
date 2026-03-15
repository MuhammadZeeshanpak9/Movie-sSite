import os
from PIL import Image

def aggressive_clean(input_path, output_path):
    print(f"Aggressively processing {input_path}...")
    try:
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()

        # Build a list of background colors to remove
        # We sample the first few pixels which usually contain the checkerboard colors
        # Standard checkerboard colors are white (255,255,255) and gray (often 204 or 192)
        bg_samples = []
        for x in range(0, 10):
            bg_samples.append(img.getpixel((x, 0))[:3])
            bg_samples.append(img.getpixel((0, x))[:3])
        
        # Unique colors only
        bg_palette = list(set(bg_samples))
        print(f"Detected potential BG colors: {bg_palette}")

        new_data = []
        threshold = 30 # Slightly higher tolerance to catch aliased edges

        for item in datas:
            is_bg = False
            for bg_color in bg_palette:
                # Check if pixel color is close to any of our background palette colors
                if abs(item[0] - bg_color[0]) < threshold and \
                   abs(item[1] - bg_color[1]) < threshold and \
                   abs(item[2] - bg_color[2]) < threshold:
                    is_bg = True
                    break
            
            if is_bg:
                new_data.append((0, 0, 0, 0)) # Pure transparent
            else:
                new_data.append(item)

        img.putdata(new_data)
        img.save(output_path, "PNG")
        print(f"Saved cleaned asset to {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

assets_dir = r"d:\9 wesbites\Movie Site\src\assets"
public_dir = r"d:\9 wesbites\Movie Site\public"

files_to_process = [
    ("backgorund animation 1 (1).png", "user_asset_1.png"),
    ("backgorund animation 1 (2).png", "user_asset_2.png"),
    ("backgorund animation 1 (3).png", "user_asset_3.png"),
    ("backgorund animation 1 (4).png", "user_asset_4.png"),
    ("backgorund animation 1 (5).png", "user_asset_5.png"),
    ("animate image.png", "user_asset_6.png"),
]

for src_name, dest_name in files_to_process:
    src_path = os.path.join(assets_dir, src_name)
    dest_path = os.path.join(public_dir, dest_name)
    if os.path.exists(src_path):
        aggressive_clean(src_path, dest_path)

# Also re-clean the hero image
hero_src = os.path.join(public_dir, "hero_bg_camera.png")
hero_dest = os.path.join(public_dir, "hero_bg_camera_clean.png")
if os.path.exists(hero_src):
    aggressive_clean(hero_src, hero_dest)
