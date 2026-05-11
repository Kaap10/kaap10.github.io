from PIL import Image

# Open the profile image
img = Image.open('static/img/profile.png')
print(f"Original size: {img.size}")

# Get dimensions
width, height = img.size

# Crop to square (use the smaller dimension)
size = min(width, height)
left = (width - size) / 2
top = (height - size) / 2
right = (width + size) / 2
bottom = (height + size) / 2

# Crop to square
img_cropped = img.crop((left, top, right, bottom))
print(f"Cropped to square: {img_cropped.size}")

# Resize to 100x100 for logo quality
img_resized = img_cropped.resize((100, 100), Image.Resampling.LANCZOS)

# Save as profile-logo.png
img_resized.save('static/img/profile-logo.png')
print("✓ Saved as profile-logo.png (100x100)")
