import os

SECRET_KEY = os.environ.get("SECRET_KEY", "nothing")
DEBUG = os.environ.get("DEBUG", True)
PYTHON_VERSION = "3.11.4"
