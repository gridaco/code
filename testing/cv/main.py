import os
from pathlib import Path
from skimage import io, img_as_float, color
from skimage.metrics import structural_similarity as ssim
import matplotlib.pyplot as plt
import numpy as np


def compare_images(a, b):
    # Convert the images to float
    rgb_a = img_as_float(a)
    rgb_b = img_as_float(b)

    rgb_a = rgb_a[:, :, :3]
    rgb_b = rgb_b[:, :, :3]

    # grey scale
    grey_a = color.rgb2gray(rgb_a)
    grey_b = color.rgb2gray(rgb_b)

    print(f"RGB - Image A: {rgb_a.shape}, Image B: {rgb_b.shape}")
    print(f"GREY - Image A: {grey_a.shape}, Image B: {grey_b.shape}")

    # Compute SSIM between two images
    rgb_score, rgb_diff = ssim(rgb_a, rgb_b, full=True,
                               multichannel=True, win_size=7, channel_axis=2, data_range=1.0)
    grey_score, grey_diff = ssim(grey_a, grey_b, full=True,
                                 multichannel=False, win_size=7, data_range=1.0)

    print(f"RGB SSIM: {rgb_score}, GREY SSIM: {grey_score}")

    # The diff image contains the actual image differences between the two images
    # and is represented as a floating point data type in the range [-1,1]
    # We must transform this image from a float in [-1,1] to uint8 in [0,255]
    score = rgb_score
    rgb_diff = (rgb_diff * 255).astype("uint8")
    grey_diff = (grey_diff * 255).astype("uint8")

    return score, rgb_diff, grey_diff


__dir = os.path.dirname(os.path.abspath(__file__))
demo_dir = Path(__dir) / 'demo'

# Read images
a = io.imread(demo_dir / 'a.png')
b = io.imread(demo_dir / 'b.png')

# Compare images
score, diff, gdiff = compare_images(a, b)

print("SSIM Score: {:.1f}".format(score * 100))

# Show diff image
plt.imshow(diff, cmap='gray')
plt.colorbar()
plt.show()

# Save the diff image
io.imsave(demo_dir / 'diff.png', diff)
io.imsave(demo_dir / 'diff-g.png', gdiff)
