export const joinWithPreposition = (items, preposition = "and") => {
  if (!items || items.length <= 1) return;

  const withoutLast = items.slice(0, items.length - 1);

  return withoutLast.join(", ") + `, ${preposition} ` + items[items.length - 1];
};
