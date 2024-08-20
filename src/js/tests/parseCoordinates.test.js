import { parseCoordinates } from "../geoparce";

describe("parseCoordinates", () => {
  test("должен правильно парсить корректные координаты", () => {
    expect(parseCoordinates("[45.123, -93.456]")).toEqual({
      latitude: 45.123,
      longitude: 93.456,
    });
    expect(parseCoordinates("45.123, -93.456")).toEqual({
      latitude: 45.123,
      longitude: 93.456,
    });
    expect(parseCoordinates("45.123,-93.456")).toEqual({
      latitude: 45.123,
      longitude: 93.456,
    });
  });

  test("должен выбрасывать ошибку для неверного формата", () => {
    expect(() => parseCoordinates("45.123, 93.456")).toThrow(
      'Неверный формат координат. Ожидается: "широта, -долгота" или "[широта, -долгота]"',
    );
    expect(() => parseCoordinates("45.123, -93.456, 12")).toThrow(
      'Неверный формат координат. Ожидается: "широта, -долгота" или "[широта, -долгота]"',
    );
    expect(() => parseCoordinates("45.123")).toThrow(
      'Неверный формат координат. Ожидается: "широта, -долгота" или "[широта, -долгота]"',
    );
  });

  test("должен выбрасывать ошибку для нечисловых значений", () => {
    expect(() => parseCoordinates("[abc, -93.456]")).toThrow(
      "Неверный формат координат. Убедитесь, что введены числовые значения.",
    );
    expect(() => parseCoordinates("[45.123, -xyz]")).toThrow(
      "Неверный формат координат. Убедитесь, что введены числовые значения.",
    );
  });
});
