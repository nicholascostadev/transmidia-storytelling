/**
 * @param {unknown} str - unknown
 * @returns It returns the `str` or `null` if it's not a string, used for reading
 * the query without the option of it being other type than string
 */
export const stringOrNull = (str: unknown) => {
  if (typeof str === 'string') {
    return str
  }
  return null
}
