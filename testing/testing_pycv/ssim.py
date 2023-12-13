import sys
import json
from pathlib import Path
from skimage import io, img_as_float, color
from skimage.metrics import structural_similarity
import matplotlib.pyplot as plt
import click


def ssim_diff(a, b):
    # Convert the images to float
    rgb_a = img_as_float(a)
    rgb_b = img_as_float(b)

    rgb_a = rgb_a[:, :, :3]
    rgb_b = rgb_b[:, :, :3]

    # grey scale
    grey_a = color.rgb2gray(rgb_a)
    grey_b = color.rgb2gray(rgb_b)

    # Compute SSIM between two images
    rgb_score, rgb_diff = structural_similarity(rgb_a, rgb_b, full=True,
                                                multichannel=True, win_size=7, channel_axis=2, data_range=1.0)
    grey_score, grey_diff = structural_similarity(grey_a, grey_b, full=True,
                                                  multichannel=False, win_size=7, data_range=1.0)

    # The diff image contains the actual image differences between the two images
    # and is represented as a floating point data type in the range [-1,1]
    # We must transform this image from a float in [-1,1] to uint8 in [0,255]
    score = rgb_score
    rgb_diff = (rgb_diff * 255).astype("uint8")
    grey_diff = (grey_diff * 255).astype("uint8")

    return score, rgb_diff, grey_diff


def ssim(a, b, o):
    o_diff_png = Path(o) / 'diff.png'
    o_diff_g_png = Path(o) / 'diff-g.png'

    # Read images
    a = io.imread(a)
    b = io.imread(b)

    # Compare images
    score, diff, gdiff = ssim_diff(a, b)

    # Save the diff image
    io.imsave(o_diff_png, diff)
    io.imsave(o_diff_g_png, gdiff)

    # output (return) results for parent process
    result = {
        'score': score,
        # file name only (drop path)
        'diff': o_diff_png.name,
        'diff_g': o_diff_g_png.name
    }

    return result, diff


@click.command()
@click.option('--a', '-a', type=click.Path(exists=True, file_okay=True, dir_okay=False, readable=True, resolve_path=True), required=True)
@click.option('--b', '-b', type=click.Path(exists=True, file_okay=True, dir_okay=False, readable=True, resolve_path=True), required=True)
@click.option('--o', '-o', type=click.Path(exists=False, file_okay=False, dir_okay=True, resolve_path=True), required=True)
@click.option('--plot', '-p', type=click.BOOL, default=False)
def main(a, b, o, plot):
    result, diff = ssim(a, b, o)

    if plot:
        # Show diff image
        plt.imshow(diff, cmap='gray')
        plt.colorbar()
        plt.show()

    sys.stdout.write(json.dumps(result))


if __name__ == '__main__':
    main()
    sys.exit()
