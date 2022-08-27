/**
 * Add 0 to start of string
 * @param value 
 */
export const formatTimeUnit = (value: number): string => {
  return [
    value.toString().length < 2 ? 0 : '',
    value,
  ].join('');
}
