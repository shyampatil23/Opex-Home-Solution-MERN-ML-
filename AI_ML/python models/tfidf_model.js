import { TfidfVectorizer } from 'scikit-learn'; // Ensure you have the right import for TF-IDF
import House from '../backend/models/houseModel.js'; // Adjust import according to your structure

// Function to train the TF-IDF model on house descriptions
const trainTfidfModel = async () => {
    const houses = await House.find(); // Fetch all house data from MongoDB
    const descriptions = houses.map(house => house.desp); // Extract descriptions

    const tfidf = new TfidfVectorizer();
    const tfidfMatrix = tfidf.fitTransform(descriptions); // Fit and transform the descriptions

    return { tfidf, tfidfMatrix, houses };
};

// Function to search using the TF-IDF model
const searchWithTfidf = async (query) => {
    const { tfidf, tfidfMatrix, houses } = await trainTfidfModel();

    const queryVector = tfidf.transform([query]); // Transform the query
    const similarities = tfidfMatrix.dot(queryVector.T).toArray(); // Calculate cosine similarity

    // Get indices of houses sorted by similarity
    const sortedIndices = similarities
        .map((similarity, index) => ({ index, similarity }))
        .sort((a, b) => b.similarity - a.similarity)
        .map(item => item.index);

    // Return houses sorted by similarity
    return sortedIndices.map(index => houses[index]);
};

export { searchWithTfidf };
