const getAttributeValue = (object, attributeName, defaultValue = null) => {
  const attribute = object.attributes[attributeName];
  const value = attribute && attribute[0];
  return value || defaultValue;
};

export const Form = object =>
  ({
    name: object.name,
    slug: object.slug,
    description: object.description,
    icon: getAttributeValue(object, 'Icon', 'fa-cube'),
    categories: object.categorizations.map(c => c.category.slug),
  });

export const Category = object =>
  ({
    name: object.name,
    slug: object.slug,
    sortOrder: parseInt(getAttributeValue(object, 'Sort Order', 1000), 10),
    icon: getAttributeValue(object, 'Icon', 'fa-cube'),
    parent: getAttributeValue(object, 'Parent'),
  });
