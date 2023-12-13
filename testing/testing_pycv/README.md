# CV Module (Python)

## Why do we need a python server?

The testing module is mainly focused on automating visual testing and providing useful data for the qa editor, which CV is required, we need a python-based server to perform this actions in a fast and reliable way.

## Setup

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
# or below if pip installation fails
venv/bin/python -m pip install -r requirements.txt
```

## How is this module used?

1. **via python-shell** -
   On local environment, this cv module is used from [testing server](../server/) via [python-shell](https://www.npmjs.com/package/python-shell).

2. **via python server** -
   On production environment, this cv module runs as a independent python server

## Starting the server

```bash
flask run
```
