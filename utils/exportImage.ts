export async function exportToPng(element: HTMLElement): Promise<string> {
  const { toPng } = await import('html-to-image');
  return toPng(element, {
    pixelRatio: 2.5,
    backgroundColor: '#FFFFFD',
    cacheBust: true,
  });
}

export async function downloadPng(element: HTMLElement, filename?: string): Promise<void> {
  const dataUrl = await exportToPng(element);
  const name = filename || `postit-coigre-${Date.now()}.png`;
  const link = document.createElement('a');
  link.download = name;
  link.href = dataUrl;
  link.click();
}
