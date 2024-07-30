export const truncateAmharicText = (
  text: string,
  maxLength: number
): string => {
  if (!text) return "";

  const ellipsis = "...";
  const amharicText = text.substring(0, maxLength);

  // Check if the original text is longer than the truncated text
  if (text.length > maxLength) {
    // Remove any incomplete UTF-8 characters at the end
    const truncatedText = amharicText.replace(
      /[\uD800-\uDBFF][\uDC00-\uDFFF]$/,
      ""
    );

    return truncatedText + ellipsis;
  }

  return amharicText;
};
