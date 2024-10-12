import pandas as pd

# Sample user interactions
interactions = [
    {'user_id': 'user1', 'house_id': 'house1', 'rating': 5},
    {'user_id': 'user1', 'house_id': 'house2', 'rating': 3},
    {'user_id': 'user2', 'house_id': 'house1', 'rating': 4},
    {'user_id': 'user2', 'house_id': 'house3', 'rating': 2},
    # Add more interactions as needed
]

# Create a DataFrame from interactions
df = pd.DataFrame(interactions)

# Create a user-item matrix
user_item_matrix = df.pivot_table(index='user_id', columns='house_id', values='rating')

# Fill NaN values with 0
user_item_matrix = user_item_matrix.fillna(0)

# Save the matrix to a CSV file
user_item_matrix.to_csv('user_item_matrix.csv')

print("User-item interaction matrix created and saved as 'user_item_matrix.csv'.")
