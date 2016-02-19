let idCounter = 0;
export default function uid() {
  return `${Date.now()}-${idCounter++}`;
}
