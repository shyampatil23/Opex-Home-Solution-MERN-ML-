import pandas as pd

# Load the user ratings data
ratings_df = pd.read_csv("user_ratings.csv")

# Print the columns and the first few rows of the ratings dataframe
print(ratings_df.columns)
print(ratings_df.head())
