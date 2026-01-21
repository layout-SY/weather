export const formatAddress = (value?: string | number | null) => {
  if (!value) return '';
  return String(value)
    .split('-')
    .map((part) => part.trim())
    .filter(Boolean)
    .join(' ');
};
