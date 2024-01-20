export default function CapitalizeLetter() {
  // to convert capital letter
  function capitalizeFirstLetter(inputString) {
    return `${inputString?.charAt(0)?.toUpperCase()}${inputString
      ?.slice(1)
      ?.toLowerCase()}`;
  }
  return {
    capitalizeFirstLetter,
  };
}
