import os
from PIL import Image, ImageDraw

def edge_flood_clean(input_path, output_path):
    print(f"Flood-cleaning {input_path}...")
    try:
        img = Image.open(input_path).convert("RGBA")
        width, height = img.size
        
        # We'll perform flood fill from every pixel on the border
        # This will catch everything connected to the edge that matches the tile color
        
        # We'll keep track of colors we've already filled to avoid redundant work
        processed_colors = set()
        
        # Check all border pixels
        border_pixels = []
        for x in range(width):
            border_pixels.append((x, 0))
            border_pixels.append((x, height - 1))
        for y in range(1, height - 1):
            border_pixels.append((0, y))
            border_pixels.append((width - 1, y))
            
        for px in border_pixels:
            color = img.getpixel(px)
            # Only fill if it's not already transparent
            if color[3] > 0:
                # Use a threshold to catch anti-aliased edges and slight tile variations
                ImageDraw.floodfill(img, px, (0, 0, 0, 0), thresh=25)
                
        img.save(output_path, "PNG")
        print(f"Saved to {output_path}")
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
    ("BAckground image of main section.png", "hero_bg_camera_clean.png") # Added this one specifically
]

for src_name, dest_name in files_to_process:
    src_path = os.path.join(assets_dir, src_name)
    dest_path = os.path.join(public_dir, dest_name)
    if os.path.exists(src_path):
        edge_flood_clean(src_path, dest_path)
    else:
        # Check in public too if it was already moved/copied
        alt_src = os.path.join(public_dir, src_name)
        if os.path.exists(alt_src):
            edge_flood_clean(alt_src, dest_path)
