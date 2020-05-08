export default function uniqID() {
  return `uniqID-${
    Date.now() + Math.floor(Math.random() * 100000 + Math.random() * 1.2)
  }`;
}
