function pad(num: string, size: number): string {
  let num2 = num.toString();
  while (num2.length < size) num2 = `0${num2}`;
  return num2;
}

export function randomColor(): string {
  const compute = () => pad(Math.floor(Math.random() * 255).toString(16), 2);

  const [r, g, b] = [compute(), compute(), compute()];

  return `#${r}${g}${b}`;
}

export function subtractColor(color: string): string {
  if (color[0] === '#') color = color.slice(1, color.length);

  const [r, g, b] = [
    color.slice(0, 2),
    color.slice(2, 4),
    color.slice(4, 6),
  ].map((n) => parseInt(n, 16));

  const brightness = Math.round((r * 299 + g * 587 + b * 114) / 1000);

  return brightness > 125 ? '#000' : '#fff';
}
