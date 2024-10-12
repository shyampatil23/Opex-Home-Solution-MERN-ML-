import pandas as pd
from matrix_factorization import recommend_svd  # Import SVD recommendation
from content_based_filtering import recommend_content_based  # Import content-based recommendation

# Load necessary data
user_item_matrix = pd.read_csv('user_item_matrix.csv', index_col=0)
house_data = pd.read_csv('cleaned_house_data.csv')

# Hybrid Recommendation: Combine SVD and Content-Based
def hybrid_recommend(user_id, house_id, svd_recs, content_recs, num_recommendations=2):
    # Combine recommendations, giving equal weight to both systems
    combined_recs = list(set(svd_recs + content_recs))[:num_recommendations]
    return combined_recs

# Example usage
user_id = 'user5'
house_id = 'house1'

# Get SVD recommendations
svd_recs = recommend_svd(user_id, user_item_matrix)

# Get content-based recommendations
content_recs = recommend_content_based(house_id, house_data, cosine_sim)

# Get hybrid recommendations
hybrid_recs = hybrid_recommend(user_id, house_id, svd_recs, content_recs)
print(f"Hybrid recommendations for user {user_id} and house {house_id}: {hybrid_recs}")
