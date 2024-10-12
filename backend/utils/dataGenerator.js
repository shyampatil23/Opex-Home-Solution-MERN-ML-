// Helper function to generate a random value within a range and ensure it is a multiple of a given number
function getRandomMultipleInRange(min, max, multiple) {
  const random =
    Math.floor(Math.random() * ((max - min) / multiple + 1)) * multiple + min;
  return random;
}

// Function to generate random house data based on type
export function generateRandomHouseData(
  type,
  previousHouseData = { price: 30, area: 1500 },
  count
) {
  const houseDataArray = [];

  // Define price and area ranges for each house type
  const houseTypes = {
    Bungalow: { price: [40, 60], area: [1000, 2000] },
    Villa: { price: [40, 80], area: [1500, 3000] },
    Farmhouse: { price: [20, 60], area: [1500, 3000] },
    Penthouse: { price: [20, 60], area: [800, 1500] },
    "Cape Cod": { price: [30, 60], area: [1000, 2000] },
    Colonial: { price: [20, 60], area: [1000, 3000] },
    Cottage: { price: [20, 40], area: [800, 1500] },
    Studio: { price: [20, 30], area: [600, 1000] },
    Bookstore: { price: [20, 30], area: [600, 1500] },
    Office: { price: [40, 80], area: [1500, 3000] },
    Office_building: { price: [80, 200], area: [2000, 4000] },
    Complex: { price: [80, 300], area: [7000, 10000] },
    House: { price: [20, 60], area: [800, 1500] },
    Store: { price: [10, 20], area: [500, 1000] },
    Shop: { price: [10, 20], area: [500, 1500] },
    Cafe: { price: [15, 30], area: [800, 1500] },
    Caffe: { price: [15, 30], area: [800, 1500] },
    Bakery: { price: [10, 20], area: [500, 1000] },
    Building: { price: [200, 400], area: [4000, 7000] },
    Hotel: { price: [60, 150], area: [2000, 4000] },
    "commercial building": { price: [100, 300], area: [8000, 10000] },
    Center: { price: [40, 100], area: [1000, 3000] },
    Appartment: { price: [200, 350], area: [4000, 6000] },
    Bank: { price: [100, 250], area: [3000, 5000] },
    Headquarters: { price: [600, 1000], area: [10000, 15000] },
    Factory: { price: [100, 300], area: [8000, 10000] },
    Industry: { price: [200, 350], area: [10000, 12000] },
  };

  for (let i = 0; i < count; i++) {
    const houseTypeData = houseTypes[type] || houseTypes["House"]; // Default to House if type not found
    const priceRange = houseTypeData.price;
    const areaRange = houseTypeData.area;

    // If previous data exists, adjust price and area to ensure realistic variations
    let price, area;
    if (previousHouseData) {
      price = getRandomMultipleInRange(
        Math.max(priceRange[0], previousHouseData.price - 10), // Lower bound of price range
        Math.min(priceRange[1], previousHouseData.price + 10), // Upper bound of price range
        5 // Multiple of 5 lakhs
      );
      area = getRandomMultipleInRange(
        Math.max(areaRange[0], previousHouseData.area - 200), // Lower bound of area range
        Math.min(areaRange[1], previousHouseData.area + 200), // Upper bound of area range
        50 // Multiple of 50 sqft
      );
    } else {
      // Generate first house data without previous data constraints
      price = getRandomMultipleInRange(priceRange[0], priceRange[1], 5);
      area = getRandomMultipleInRange(areaRange[0], areaRange[1], 50);
    }

    houseDataArray.push({
      name: `${type}`, // Unique name for each house
      desp: `This ${type} offers a spacious area of ${area} sqft and is priced at ₹${price} lakhs. It is designed for modern living with premium materials and offers excellent land options.`,
      price: price, // Store price as a number
      area: area, // Store area as a number
      material: "Concrete, Cement, Wood, Glass, Steel, Marbel Rock, Tiles", // Default material for now
      contractor: {
        name: "John Doe",
        contact: "1234567890",
      },
    });
  }

  return houseDataArray;
}
