# Description
This is a small TODO application made with Eel for Python.

# HOW TO RUN THE APPLICATION
`python3 -m venv .venv`

`./.venv/bin/python3 -m pip install --upgrade pip`

`./.venv/bin/python3 -m pip install -r requirements.txt`

`./.venv/bin/python3 main.py`

## Create the Python virtual environment
`python3 -m venv .venv`

## Start the Python virtual environment
`source .venv/bin/activate`

## Install dependencies
`./.venv/bin/python3 -m pip install eel`

`./.venv/bin/python3 -m pip install mysql-connector-python` - **This is no longer necessary as the application now uses SQLite**

## Generate/Update requirements.txt
`./.venv/bin/python3 -m pip freeze > requirements.txt`

## SQLite Viewer
https://inloop.github.io/sqlite-viewer/