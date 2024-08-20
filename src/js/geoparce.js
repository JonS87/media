export const parseCoordinates = (geo) => {
  const cleanedGeo = geo.replace(/\s+/g, "").replace(/[[\]]/g, "");
  const parts = cleanedGeo.split(",");

  if (parts.length !== 2 || parts[1][0] !== "-") {
    throw new Error(
      'Неверный формат координат. Ожидается: "широта, -долгота" или "[широта, -долгота]"',
    );
  }

  const latitude = parseFloat(parts[0]);
  const longitude = parseFloat(parts[1].slice(1));

  if (isNaN(latitude) || isNaN(longitude)) {
    throw new Error(
      "Неверный формат координат. Убедитесь, что введены числовые значения.",
    );
  }

  return {
    latitude: latitude,
    longitude: longitude,
  };
};
