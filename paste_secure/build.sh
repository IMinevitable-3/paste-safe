#!/usr/bin/env bash
# Exit on error
set -o errexit

# Specify Python version and use a virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies using poetry
poetry install

# Convert static asset files
python manage.py collectstatic --no-input

# Apply any outstanding database migrations
python manage.py migrate

# Deactivate the virtual environment
deactivate
