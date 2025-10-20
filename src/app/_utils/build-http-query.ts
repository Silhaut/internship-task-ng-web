export function buildHttpQuery(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') continue;

    if (typeof value === 'object' && !Array.isArray(value)) {
      Object.entries(value).forEach(([op, val]) => {
        searchParams.append(`${key}[${op}]`, String(val));
      });
      continue;
    }

    if (Array.isArray(value)) {
      searchParams.append(key, value.join(','));
      continue;
    }

    searchParams.append(key, String(value));
  }

  return searchParams.toString();
}
