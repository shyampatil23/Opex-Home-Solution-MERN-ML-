// ai_ml/nlp.js

export const processQuery = function (query) {
  const typeRegex =
    /(villa|apartment|bungalow|house|Farmhouse|Cape Cod|Colonial|Cottage|Studio|Bookstore|Store|Shop|Cafe|Caffe|Bakery|Building|Hotel|Apartment|Appartment|Bank|Office|Office_building|Complex|Commercial_building|Center|Headquarters|Factory|Industry|Penthouse)/i;
  const priceRegex = /(\d+)\s?lakhs?/i;
  const areaRegex = /(\d+)\s?sqft/i;

  const typeMatch = query.match(typeRegex);
  const priceMatch = query.match(priceRegex);
  const areaMatch = query.match(areaRegex);

  return {
    type: typeMatch ? typeMatch[1].toLowerCase() : null,
    price: priceMatch ? parseInt(priceMatch[1]) : null,
    area: areaMatch ? parseInt(areaMatch[1]) : null,
  };
};
