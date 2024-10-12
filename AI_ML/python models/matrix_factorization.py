import numpy as np
import pandas as pd
from sklearn.decomposition import TruncatedSVD

# Load user-item matrix
user_item_matrix = pd.read_csv('user_item_matrix.csv', index_col=0)

# Step 1: Decompose the matrix using SVD
svd = TruncatedSVD(n_components=2)  # You can tune n_components
latent_matrix = svd.fit_transform(user_item_matrix)

# Reconstruct matrix
reconstructed_matrix = np.dot(latent_matrix, svd.components_)

# Create DataFrame for reconstructed matrix
reconstructed_df = pd.DataFrame(reconstructed_matrix, index=user_item_matrix.index, columns=user_item_matrix.columns)

# Step 2: Recommend houses based on SVD
def recommend_svd(user_id, reconstructed_df, num_recommendations=2):
    user_ratings = reconstructed_df.loc[user_id]
    recommendations = user_ratings.sort_values(ascending=False).head(num_recommendations).index.tolist()
    return recommendations

# Example usage
user_id = 'user1'
recommendations = recommend_svd(user_id, reconstructed_df)
print(f"Recommendations for {user_id}: {recommendations}")
