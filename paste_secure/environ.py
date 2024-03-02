import os
from dotenv import load_dotenv

load_dotenv()
SECRET_KEY = os.environ.get("SECRET_KEY", "nothing")
DEBUG = os.environ.get("DEBUG", True)
PYTHON_VERSION = "3.11.4"
POSTGRES_USER = os.environ.get("POSTGRES_USER", "user")
POSTGRES_PASS = os.environ.get("POSTGRES_PASS", "password")
