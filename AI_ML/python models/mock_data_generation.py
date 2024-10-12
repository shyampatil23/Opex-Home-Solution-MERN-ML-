import pandas as pd
import numpy as np

# Load your cleaned data
df = pd.read_csv("cleaned_house_data.csv")  # Adjust path as needed

# Mock user IDs (for example, 1 to 10)
user_ids = range(1, 11)

# Create a user-item interaction matrix with random ratings
ratings_data = []
for house_id in df["_id"]:  # Ensure this matches the house ID column
    for user_id in user_ids:
        # Random rating between 1 and 5
        rating = np.random.randint(1, 6)
        ratings_data.append({"user_id": user_id, "house_id": house_id, "rating": rating})

# Convert to DataFrame
ratings_df = pd.DataFrame(ratings_data)

# Save to a CSV file
ratings_df.to_csv("user_ratings.csv", index=False)

print("Mock ratings data generated and saved to 'user_ratings.csv'.")
