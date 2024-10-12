import pandas as pd
import joblib
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler, PolynomialFeatures
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

class PricePredictionModel:
    def __init__(self, data):
        self.data = data
        self.model = None
        self.scaler = None
        self.feature_columns = None

    def preprocess_data(self):
        # Keep only the relevant columns
        self.data = self.data[['name', 'area', 'landOptions', 'price']]

        # One-hot encode categorical features
        self.data = pd.get_dummies(self.data, columns=['name', 'landOptions'], drop_first=True)

        # Scale numerical features
        self.scaler = StandardScaler()
        self.data[['area']] = self.scaler.fit_transform(self.data[['area']])

        # Save feature column names
        self.feature_columns = self.data.drop(['price'], axis=1).columns
        joblib.dump(self.feature_columns, 'feature_columns.joblib')

        # Separate features and target variable
        X = self.data.drop('price', axis=1)
        y = self.data['price']
        
        return train_test_split(X, y, test_size=0.2, random_state=42)

    def train_model(self):
        X_train, X_test, y_train, y_test = self.preprocess_data()

        # Train the model
        self.model = RandomForestRegressor()
        self.model.fit(X_train, y_train)

        # Evaluate the model
        predictions = self.model.predict(X_test)
        mse = mean_squared_error(y_test, predictions)
        r2 = r2_score(y_test, predictions)

       # print(f"Model MSE: {mse:.2f}")
       # print(f"Model R^2: {r2:.2f}")

        # Debugging the feature importances
       # feature_importances = self.model.feature_importances_
       # if len(feature_importances) == len(self.feature_columns):
        #    print("\nFeature Importances:\n", pd.Series(feature_importances, index=self.feature_columns))
      #  else:
         #   print("Feature importance length mismatch.")

        # Save the model and scaler
        joblib.dump(self.model, 'house_price_predictor.joblib')
        joblib.dump(self.scaler, 'scaler_enhanced.joblib')

    def predict_price(self, features):
        # Prepare features for prediction
        features_df = pd.DataFrame([features])

        # One-hot encode the categorical features
        features_df = pd.get_dummies(features_df, columns=['name', 'landOptions'], drop_first=True)
        features_df = features_df.reindex(columns=self.feature_columns, fill_value=0)

        # Scale 'area' column
        if 'area' in features_df.columns:
            features_df[['area']] = self.scaler.transform(features_df[['area']])

        # Predict the price
        price_pred = self.model.predict(features_df)
        return price_pred[0]

# Load your cleaned dataset
data = pd.read_csv('C:/Users/infin/OneDrive/Desktop/Opex_Home_Solutions/AI_ML/cleaned_house_data.csv')

# Train and save the model
price_model = PricePredictionModel(data)
price_model.train_model()

# Predict a sample price
sample_features = {
    "name": "Cottage",
    "area": 1500,
    "landOptions": "Rural",
}
predicted_price = price_model.predict_price(sample_features)
print("", predicted_price)  
