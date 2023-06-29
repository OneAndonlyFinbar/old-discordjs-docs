export function flattenArray(arr: Array<any>) {
  let result: Array<any> = [];

  function flattenHelper(arr: Array<any>) {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        flattenHelper(arr[i]); // Recursively flatten nested arrays
      } else {
        result.push(arr[i]); // Add non-array elements to the result
      }
    }
  }

  flattenHelper(arr);
  return result;
}