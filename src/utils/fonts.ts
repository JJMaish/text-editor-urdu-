// Font data as base64 string - this ensures the font is always available
export const JAMEEL_NOORI_NASTALEEQ_FONT = `AAEAAAAPAIAAAwBwRkZUTXxXP...`; // Note: Actual base64 font data would be much longer

export const loadFonts = async () => {
  return {
    JameelNooriNastaleeq: JAMEEL_NOORI_NASTALEEQ_FONT
  };
};