import re
import sys
import json
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from pymongo import MongoClient

class NLPSearch:
    def __init__(self, db_url, db_name, collection_name):
        # Connect to MongoDB
        self.client = MongoClient(db_url)
        self.db = self.client[db_name]
        self.collection = self.db[collection_name]

        # Fetch data from MongoDB, including 'images' field
        self.data = list(self.collection.find({}, {
            "_id": 1,
            "desp": 1,
            "price": 1,
            "area": 1,
            "name": 1,
            "material": 1,
            "landOptions": 1,
            "contractor": 1,
            "images": 1
        }))
        self.data = pd.DataFrame(self.data)

        # Preprocess descriptions and vectorize
        self.data['cleaned_description'] = self.data['desp'].apply(self.clean_text)
        self.tfidf_vectorizer = TfidfVectorizer(stop_words='english')
        self.tfidf_matrix = self.tfidf_vectorizer.fit_transform(self.data['cleaned_description'])

    def clean_text(self, text):
        """Cleans the input text by removing unwanted characters and making it lowercase."""
        text = re.sub(r'[^\w\s]', '', text)  # Remove punctuation
        text = text.lower()  # Convert to lowercase
        return text

    def extract_numbers(self, query):
        """Extract numerical values from the search query (price and area)."""
        price_matches = re.findall(r'\d+ lakhs?', query)
        area_matches = re.findall(r'\d+\s*square\s*feet|\d+\s*sqft', query)

        price = None
        area = None
        if price_matches:
            price = int(re.findall(r'\d+', price_matches[0])[0])
        if area_matches:
            area = int(re.findall(r'\d+', area_matches[0])[0])
        
        return price, area

    def extract_house_type(self, query):
        """Extract house type from the search query."""
        house_types = ['bungalow', 'house', 'villa', 'appartment', 'Farmhouse', 'Penthouse', 'Cape Cod', 'Colonial', 'Cottage', 'Studio', 'Industry', 'Factory', 'Headquarters', 'Bank', 'Center', 'commercial building', 'Hotel', 'Building', 'Bakery', 'Caffe', 'Cafe', 'Shop', 'Store', 'Complex', 'Office_building', 'Office', 'Bookstore']  # Add other types as needed
        for house_type in house_types:
            if house_type in query.lower():
                return house_type.capitalize()  # Capitalize for matching with database
        return None  # Return None if no type is found

    def format_results(self, results):
        formatted_results = []

        for _, row in results.iterrows():
            formatted_result = {
                "_id": str(row["_id"]),
                "name": row["name"],
                "desp": row["desp"],
                "price": row["price"],
                "area": row["area"],
                "material": row["material"],
                "landOptions": row["landOptions"],
                "contractor": row["contractor"],
                "images": {
                    "exterior": row['images'].get('exterior', []),
                    "interior": row['images'].get('interior', []),
                    "plan": row['images'].get('plan', [])
                },
                "__v": row.get("__v", 0)
            }
            formatted_results.append(formatted_result)

        return formatted_results

    def search(self, query):
        """Search for houses based on the input query using cosine similarity and filters."""
        cleaned_query = self.clean_text(query)
        query_vec = self.tfidf_vectorizer.transform([cleaned_query])
        similarity_scores = cosine_similarity(query_vec, self.tfidf_matrix).flatten()
        
        # Get all indices sorted by similarity score
        top_indices = similarity_scores.argsort()[::-1]  # Sort all results

        # Extract price and area from the query
        query_price, query_area = self.extract_numbers(query)
        
        # Extract house type from the query
        house_type = self.extract_house_type(query)

        # Get all results based on similarity scores
        results = self.data.iloc[top_indices].reset_index(drop=True)  # Reset the index here

        # Initialize a mask for filtering results
        mask = pd.Series([True] * len(results))  # Start with all True (keep all results)

        # Modify the price and area filters as needed
        if query_price is not None:
            mask &= (results['price'] >= (query_price - 5)) & (results['price'] <= (query_price + 5))
        if query_area is not None:
            mask &= (results['area'] >= (query_area - 200)) & (results['area'] <= (query_area + 200))

        # Apply the mask to filter results
        results = results[mask]

        # Filter by house type if specified
        if house_type:
            results = results[results['name'].str.contains(house_type, case=False, na=False)]

        # Format the results to the desired output structure
        formatted_results = self.format_results(results)

        # Return all results instead of limiting to 5
        return formatted_results


# Example usage
if __name__ == "__main__":
    db_url = "mongodb://localhost:27017/"
    db_name = "opex_home_solutions"
    collection_name = "houses"

    nlp_search = NLPSearch(db_url, db_name, collection_name)

    if len(sys.argv) > 1:
        query = sys.argv[1]
        try:
            results = nlp_search.search(query)
            print(json.dumps(results, indent=4))  # Output results as JSON with indentation
        except Exception as e:
            print(f"Error occurred during search: {str(e)}")
    else:
        print("No query provided.")
