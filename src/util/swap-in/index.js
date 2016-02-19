export default function swapIn(arr, i, j) {
  if(i < 0 || i >= arr.length) throw new Error(`Index ${i} out of bounds`);
  if(j < 0 || j >= arr.length) throw new Error(`Index ${j} out of bounds`);
  const result = arr.slice();
  const temp = result[i];
  result[i] = result[j];
  result[j] = temp;
  return result;
}
