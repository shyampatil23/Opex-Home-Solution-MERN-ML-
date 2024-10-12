import pandas as pd
from sklearn.metrics import pairwise_distances

# Load the user ratings data
ratings_df = pd.read_csv("user_ratings.csv")

# Create a user-item interaction matrix using the ratings DataFrame
user_item_matrix = ratings_df.pivot_table(index='user_id', columns='house_id', values='rating').fillna(0)

# Calculate similarity matrix using cosine similarity
user_similarity = 1 - pairwise_distances(user_item_matrix, metric='cosine')

# Function to get recommendations
def get_user_user_recommendations(user_id, num_recommendations=5):
    # Check if user_id exists in the matrix
    if user_id not in user_item_matrix.index:
        print(f"User ID {user_id} not found in user-item matrix.")
        return []
    
    user_index = user_item_matrix.index.get_loc(user_id)
    
    # Get similar users
    similar_users = list(enumerate(user_similarity[user_index]))
    similar_users = sorted(similar_users, key=lambda x: x[1], reverse=True)
    
    # Get top N similar users
    top_users = [user[0] for user in similar_users[1:num_recommendations + 1]]
    
    # Get recommendations based on the houses they liked
    recommendations = []
    for user in top_users:
        user_recommendations = user_item_matrix.iloc[user].sort_values(ascending=False).head(num_recommendations)
        recommendations.extend(user_recommendations.index.tolist())
    
    # Return unique recommendations
    return list(set(recommendations))

# Example usage
user_id = 1  # Replace with actual user ID
recommended_houses = get_user_user_recommendations(user_id)
print("Recommended Houses for User {}: {}".format(user_id, recommended_houses))
