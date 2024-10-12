import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

# Load house data (assumes you have house descriptions)
house_data = pd.read_csv('cleaned_house_data.csv')  # 'house_data.csv' should contain 'house_id' and 'description'

# Check column names for debugging
print(house_data.columns)  # Print to ensure correct columns are loaded

# Create a TF-IDF matrix
tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(house_data['cleaned_description'])

# Calculate similarity between houses
cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

# Function to recommend similar houses
def recommend_content_based(house_id, house_data, cosine_sim, num_recommendations=2):

    print(f"House IDs in the data: {house_data['_id'].tolist()}")
    print(f"Requested House ID: {house_id}")

    # Use correct column name (either 'house_id', '_id', or another)
    idx = house_data.index[house_data['_id'] == house_id].tolist()[0]  # Adjust 'house_id' if needed
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    house_indices = [i[0] for i in sim_scores[1:num_recommendations+1]]
    return house_data['_id'].iloc[house_indices].tolist()  # Adjust 'house_id' if needed

# Example usage
house_id = 'house8'  # Make sure 'house1' exists in your 'house_data.csv'
recommendations = recommend_content_based(house_id, house_data, cosine_sim)
print(f"Content-based recommendations for {house_id}: {recommendations}")