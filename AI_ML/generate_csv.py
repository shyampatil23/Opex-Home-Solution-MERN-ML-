# generate_csv.py

from pymongo import MongoClient
import pandas as pd

# MongoDB connection details
client = MongoClient('mongodb://localhost:27017/')  # Update with your MongoDB URI if different
db = client['opex_home_solutions']  # Replace with your database name
collection = db['houses']  # Replace with your collection name

# Fetch all house listings
house_data = list(collection.find())

# Process data into a format suitable for CSV
# Flattening necessary fields
processed_data = []

for house in house_data:
    entry = {
        '_id': str(house.get('_id')),
        'name': house.get('name', ''),
        'description': house.get('desp', ''),
        'price': house.get('price', 0),
        'area': house.get('area', 0),
        'material': house.get('material', ''),
        'landOptions': house.get('landOptions', ''),
        'contractor_name': house.get('contractor', {}).get('name', ''),
        'contractor_contact': house.get('contractor', {}).get('contact', ''),
        'images_exterior': house.get('images', {}).get('exterior', ''),
        'images_interior': house.get('images', {}).get('interior', ''),
        'images_plan': house.get('images', {}).get('plan', '')
    }
    processed_data.append(entry)

# Convert to DataFrame
df = pd.DataFrame(processed_data)

# Save to CSV
csv_filename = 'cleaned_house_data.csv'
df.to_csv(csv_filename, index=False)

print(f"Data exported successfully to {csv_filename}")
