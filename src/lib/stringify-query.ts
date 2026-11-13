type QueryValue = string | number | string[] | undefined

export const stringifyQuery = (query: Record<string, QueryValue>) => {
  const params = new URLSearchParams()
  Object.keys(query).forEach((key) => {
    const value = query[key]
    const values = Array.isArray(value) ? value : [value]
    values.forEach((v) => params.append(key, String(v)))
  })
  return params.toString()
}
