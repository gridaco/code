from flask import Flask, request
from ssim import ssim

app = Flask(__name__)


@app.route("/")
def r_index():
    return "<p>Hello, World!</p>"


@app.route("/ssim", methods=['POST'])
def r_ssim():
    data = request.json
    a = data['a']
    b = data['b']
    o = data['o']
    print("ssim", a, b, o)
    result, diff = ssim(a, b, o)
    return result
