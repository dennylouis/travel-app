export default function bytesToMegabytes(bytes) {
  return Number.parseFloat(bytes / 1e6).toFixed(2);
}
