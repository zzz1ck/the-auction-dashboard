export default function usePriceFormat(price: string): number {
  return Math.round(Number(price) * Math.pow(10, -24) * 100) / 100;
}
