type RgbaColor = {
  r: number;
  g: number;
  b: number;
  a: number;
};

// https://github.com/omgovich/react-colorful/blob/master/src/utils/round.ts
const round = (
  number: number,
  digits = 0,
  base = Math.pow(10, digits)
): number => {
  return Math.round(base * number) / base;
};

// https://github.com/omgovich/react-colorful/blob/master/src/utils/convert.ts
export const hexToRgba = (hex: string): RgbaColor => {
  if (hex[0] === "#") hex = hex.substring(1);

  if (hex.length < 6) {
    return {
      r: parseInt(hex[0] + hex[0], 16),
      g: parseInt(hex[1] + hex[1], 16),
      b: parseInt(hex[2] + hex[2], 16),
      a: hex.length === 4 ? round(parseInt(hex[3] + hex[3], 16) / 255, 2) : 1,
    };
  }

  return {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16),
    a: hex.length === 8 ? round(parseInt(hex.substring(6, 8), 16) / 255, 2) : 1,
  };
};

// https://github.com/omgovich/react-colorful/blob/master/demo/src/index.tsx
export const getBrightness = (rgba: RgbaColor): number => {
  const { r, g, b } = rgba;
  return (r * 299 + g * 587 + b * 114) / 1000;
};

export const isBright = (hex: string) => {
  const rgba = hexToRgba(hex);
  return getBrightness(rgba) > 128 || rgba.a < 0.5;
};
