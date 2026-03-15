import os
from PIL import Image, ImageDraw

def final_aggressive_clean(input_path, output_path):
    print(f"Final cleanup for {input_path}...")
    try:
        img = Image.open(input_path).convert("RGBA")
        width, height = img.size
        
        # Pass 1: Flood fill from every edge pixel (removes connected background)
        for x in range(width):
            ImageDraw.floodfill(img, (x, 0), (0, 0, 0, 0), thresh=30)
            ImageDraw.floodfill(img, (x, height - 1), (0, 0, 0, 0), thresh=30)
        for y in range(height):
            ImageDraw.floodfill(img, (0, y), (0, 0, 0, 0), thresh=30)
            ImageDraw.floodfill(img, (width - 1, y), (0, 0, 0, 0), thresh=30)

        # Pass 2: Global color removal for characteristic checkerboard colors
        # Standard tile colors are white (255) and gray (around 190-220)
        datas = img.getdata()
        new_data = []
        
        # Checkerboard typical gray/white pairs
        targets = [
            (255, 255, 255), # Pure white
            (204, 204, 204), # Standard gray
            (191, 191, 191), # Common gray
            (221, 221, 221), # Light gray
            (240, 240, 240), # Off white
        ]
        
        threshold = 25 # Tolerance for each target
        
        for item in datas:
            if item[3] == 0:
                new_data.append(item)
                continue
                
            is_tile = False
            for target in targets:
                if abs(item[0] - target[0]) < threshold and \
                   abs(item[1] - target[1]) < threshold and \
                   abs(item[2] - target[2]) < threshold:
                    is_tile = True
                    break
            
            if is_tile:
                new_data.append((0, 0, 0, 0))
            else:
                new_data.append(item)
        
        img.putdata(new_data)
        img.save(output_path, "PNG")
        print(f"Aggressively saved to {output_path}")
    except Exception as e:
        print(f"Error: {e}")

public_dir = r"d:\9 wesbites\Movie Site\public"
assets_dir = r"d:\9 wesbites\Movie Site\src\assets"

files = [
    ("bg_anim_1.png", "user_asset_1.png"),
    ("bg_anim_2.png", "user_asset_2.png"),
    ("bg_anim_3.png", "user_asset_3.png"),
    ("bg_anim_4.png", "user_asset_4.png"),
    ("bg_anim_5.png", "user_asset_5.png"),
    ("animate_camera.png", "user_asset_6.png"),
    ("hero_bg_camera_clean.png", "hero_bg_camera_clean.png")
]

for src_name, dest_name in files:
    src_path = os.path.join(public_dir, src_name)
    dest_path = os.path.join(public_dir, dest_name)
    if os.path.exists(src_path):
        final_aggressive_clean(src_path, dest_path)
    else:
        # Check assets folder too
        # Mapping for special names
        name_map = {
            "bg_anim_1.png": "backgorund animation 1 (1).png",
            "bg_anim_2.png": "backgorund animation 1 (2).png",
            "bg_anim_3.png": "backgorund animation 1 (3).png",
            "bg_anim_4.png": "backgorund animation 1 (4).png",
            "bg_anim_5.png": "backgorund animation 1 (5).png",
            "animate_camera.png": "animate image.png",
            "hero_bg_camera_clean.png": "BAckground image of main section.png"
        }
        src_path = os.path.join(assets_dir, name_map.get(src_name, src_name))
        if os.path.exists(src_path):
            final_aggressive_clean(src_path, dest_path)
