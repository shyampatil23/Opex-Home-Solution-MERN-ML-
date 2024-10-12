#data_cleaning.py

import pymongo
import pandas as pd
import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
import re

# Load Spacy NLP model
nlp = spacy.load("en_core_web_sm")

# MongoDB connection
def connect_to_mongodb():
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client["opex_home_solutions"]
    collection = db["houses"]
    return collection

# Function to clean text
def clean_text(text):
    # Tokenize, remove stopwords, and lemmatize using Spacy
    doc = nlp(text.lower())
    tokens = [token.lemma_ for token in doc if not token.is_stop and token.is_alpha]
    return " ".join(tokens)

# Function to preprocess data
def preprocess_data(collection):
    # Fetch all house design documents from MongoDB
    house_data = list(collection.find({}))

    # Convert to Pandas DataFrame for easier handling
    df = pd.DataFrame(house_data)

    # Clean text fields (description and name)
    df["cleaned_description"] = df["desp"].apply(clean_text)
    df["cleaned_name"] = df["name"].apply(clean_text)

    # TF-IDF Vectorization for descriptions
    tfidf = TfidfVectorizer(max_features=500)  # Limit to top 500 terms
    df_tfidf = tfidf.fit_transform(df["cleaned_description"]).toarray()

    # Create DataFrame for TF-IDF results
    tfidf_df = pd.DataFrame(df_tfidf, columns=tfidf.get_feature_names_out())
    
    # Add TF-IDF features to the main dataframe
    df = pd.concat([df, tfidf_df], axis=1)

    return df


# Main function to execute cleaning and extraction
if __name__ == "__main__":
    collection = connect_to_mongodb()
    processed_df = preprocess_data(collection)
    
    # Export cleaned data to a CSV file for inspection (optional)
    processed_df.to_csv("cleaned_house_data.csv", index=False)
    
    print("Data cleaning and feature extraction completed.")
