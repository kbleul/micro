export function areArrayLengthEqual(arr1: string[], arr2: string[]) {
  console.log(arr1, " ---------- ", arr2);
  if (arr1.length !== arr2.length) {
    return false;
  }
  return true;
}
