# recommendation_system.py

import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# Load cleaned data
def load_cleaned_data():
    df = pd.read_csv("cleaned_house_data.csv")
    return df

# Function to recommend similar house designs
def get_recommendations(house_id, df, top_n=5):
    # Ensure house_id is an ObjectId-like string
    house_id_str = str(house_id)

    # Get the index of the house design
    idx = df[df["_id"].astype(str) == house_id_str].index[0]

    # Get only the numeric columns for TF-IDF features
    tfidf_features = df.select_dtypes(include=[float, int])  # Assuming TF-IDF features are numeric

    # Calculate cosine similarity
    cosine_sim = cosine_similarity(tfidf_features)

    # Get similarity scores for the selected house
    sim_scores = list(enumerate(cosine_sim[idx]))

    # Sort by similarity scores
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Get the indices of the most similar houses (excluding the house itself)
    sim_scores = sim_scores[1:top_n+1]

    # Return the top similar houses
    house_indices = [i[0] for i in sim_scores]
    return df.iloc[house_indices][["name", "desp", "price", "area"]]

# Main function to test recommendations
if __name__ == "__main__":
    df = load_cleaned_data()

    # Example: Recommend houses similar to the one with a specific ID
    house_id = "66fd89df15ecd00aa6661900"  # Replace with actual house _id
    recommendations = get_recommendations(house_id, df)

    print("Recommended Houses:")
    print(recommendations)