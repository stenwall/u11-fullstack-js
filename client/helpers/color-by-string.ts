export const colorByString = (letters: any) => {
  let stringUniqueHash = [...letters].reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  return `hsl(${stringUniqueHash % 360}, 80%, 25%)`;
}

// source
// ------------------------------------------------------------------
// https://stackoverflow.com/a/66494926