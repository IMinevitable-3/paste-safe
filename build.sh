#!/usr/bin/env bash
# Exit on error
set -o errexit

# Modify this line as needed for your package manager (pip, poetry, etc.)
pip install -r ./paste_secure/requirements.txt

# Convert static asset files
python ./paste_secure/manage.py collectstatic --no-input

# Apply any outstanding database migrations
python ./paste_secure/manage.py migrate