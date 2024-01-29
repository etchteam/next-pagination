import every from 'lodash/every';
import isInteger from 'lodash/isInteger';
import uniq from 'lodash/uniq';

export const getSizes = (customSizes?: number[]) => {
  const defaultSizes = [20, 40, 60, 80, 100];
  // only if customSizes is an array & all values are valid
  if (Array.isArray(customSizes) && every(customSizes, isInteger)) {
    const uniqSizes = uniq(customSizes).sort((a, b) => a - b);
    // if the evaluate array is empty, return default
    // otherwise, return evaluated values
    if (!uniqSizes.length) return defaultSizes;
    return uniqSizes;
  }
  // default
  return defaultSizes;
};
