export interface AddressResult {
  label: string;
  score: number;
  matchRate: number;
}

const normalizeAddress = (value: string | number) =>
  String(value).replace(/[\s-]/g, '').toLowerCase();

const getMatchScore = (query: string, candidate: string) => {
  if (!query) return 0;
  const normalizedQuery = normalizeAddress(query);
  const normalizedCandidate = normalizeAddress(candidate);
  if (!normalizedQuery || !normalizedCandidate) return 0;
  if (normalizedCandidate.startsWith(normalizedQuery)) {
    return 100 + normalizedQuery.length;
  }
  if (normalizedCandidate.includes(normalizedQuery)) {
    return 80 + normalizedQuery.length;
  }
  const tokens = query.split(/[\s-]+/).filter(Boolean);
  const matched = tokens.filter((t) => candidate.includes(t)).length;
  return matched * 10;
};

export const getAddressResults = (
  districts: Array<string | number>,
  query: string,
  limit = 20
): AddressResult[] => {
  const trimmed = query.trim();
  if (!trimmed) return [];
  const normalizedQuery = normalizeAddress(trimmed);
  return districts
    .filter((item) => typeof item === 'string' || typeof item === 'number')
    .map((item) => {
      const candidate = String(item);
      const normalizedCandidate = normalizeAddress(candidate);
      const score = getMatchScore(trimmed, candidate);
      const matchRate = Math.round(
        (normalizedQuery.length / Math.max(normalizedCandidate.length, 1)) * 100
      );
      return {
        label: candidate,
        score,
        matchRate,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};
