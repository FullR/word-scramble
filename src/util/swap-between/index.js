export default function swapBetween(arrA, arrB, aIndex, bIndex) {
  if(aIndex < 0 || aIndex >= arrA.length) throw new Error(`Index ${aIndex} out of bounds`);
  if(bIndex < 0 || bIndex >= arrB.length) throw new Error(`Index ${bIndex} out of bounds`);
  const resultA = arrA.slice();
  const resultB = arrB.slice();
  const temp = resultA[aIndex];
  resultA[aIndex] = resultB[bIndex];
  resultB[bIndex] = temp;
  return [resultA, resultB];
}
