import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

# Load the user-item matrix
user_item_matrix = pd.read_csv('user_item_matrix.csv', index_col=0)

# Ensure the data types are correct (float)
user_item_matrix = user_item_matrix.astype(float)

# Calculate item similarity matrix using cosine similarity
item_similarity = cosine_similarity(user_item_matrix.T)  # Transpose to get items as rows
item_similarity_df = pd.DataFrame(item_similarity, index=user_item_matrix.columns, columns=user_item_matrix.columns)

# Ensure that the similarity dataframe only includes items present in the user-item matrix
item_similarity_df = item_similarity_df[user_item_matrix.columns].loc[user_item_matrix.columns]

# Debug: Print shapes and columns of the matrices
print("User-Item Matrix Shape:", user_item_matrix.shape)
print("Item Similarity Matrix Shape:", item_similarity_df.shape)
print("User-Item Matrix Columns:", user_item_matrix.columns.tolist())
print("Item Similarity Matrix Columns:", item_similarity_df.columns.tolist())

# Function to get item recommendations
def get_recommendations(item_id, item_similarity_df, user_item_matrix, user_id, num_recommendations=5):
    # Check if item_id exists in the similarity dataframe
    if item_id not in item_similarity_df.columns:
        raise ValueError(f"Item ID '{item_id}' not found in item similarity data.")

    # Get similar items
    similar_items = item_similarity_df[item_id]

    # Get user ratings for items
    if user_id not in user_item_matrix.index:
        raise ValueError(f"User ID '{user_id}' not found in user-item matrix.")
    
    user_ratings = user_item_matrix.loc[user_id]

    # Align similar items with the user-item matrix
    similar_items = similar_items[user_ratings.index]  # Align similar items to user ratings

    # Debug: Print the shapes and values of the user ratings and similar items
    print("User Ratings Shape:", user_ratings.shape)
    print("User Ratings Values:\n", user_ratings)
    print("Similar Items Shape:", similar_items.shape)
    print("Similar Items Values:\n", similar_items)

    # Create a score for each item based on user ratings and similarity
    # Consider all items, not just rated ones
    scores = user_ratings * similar_items  # Element-wise multiplication

    # Debug: Print scores shape
    print("Scores Shape:", scores.shape)

    # Filter out items that the user has already rated
    scores = scores[scores.index != item_id]  # Exclude the current item from recommendations

    # Get top N recommendations
    recommendations = scores.sort_values(ascending=False).head(num_recommendations).index.tolist()
    
    return recommendations

# Example usage
if __name__ == "__main__":
    user_id = 'user1'  # Specify the user for whom you want recommendations
    item_id = 'house1'  # Specify an item for finding similar items

    try:
        recommendations = get_recommendations(item_id, item_similarity_df, user_item_matrix, user_id)
        print("Recommendations for User:", user_id)
        print(recommendations)
    except ValueError as e:
        print(e)
