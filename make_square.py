
from PIL import Image

def make_square(image_path, output_path, fill_color=(0, 0, 0, 0)):
    img = Image.open(image_path)
    x, y = img.size
    size = max(x, y)
    new_im = Image.new('RGBA', (size, size), fill_color)
    new_im.paste(img, (int((size - x) / 2), int((size - y) / 2)))
    new_im.save(output_path)
    print(f"Saved square image to {output_path}")

if __name__ == "__main__":
    make_square(r"c:\Users\Infer\Desktop\netnote\src\assets\netnote-icon.png", r"c:\Users\Infer\Desktop\netnote\src\assets\netnote-icon-square.png")
