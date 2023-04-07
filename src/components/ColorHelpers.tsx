let convert = require("color-convert");

export const checkColor = (hex: string, part: string): number => {
  let partOfColor = "";
  if (part === "R") {
    partOfColor = hex.substring(1, 3);
  } else if (part === "G") {
    partOfColor = hex.substring(3, 5);
  } else if (part === "B") {
    partOfColor = hex.substring(5, 7);
  } else if (part === "S") {
    const hsl = saturationFromRGB(
      parseInt(hex.substring(1, 3), 16),
      parseInt(hex.substring(3, 5), 16),
      parseInt(hex.substring(5, 7), 16)
    );
    return hsl;
  }
  return parseInt(partOfColor, 16);
};

export const saturationFromRGB = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  return 100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0);
};
