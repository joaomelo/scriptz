export function createTag(taggable: Taggable): string {
  const bgColor = taggable.bgColor || Reset;
  const textColor = taggable.textColor || Reset;
  const { name } = taggable;
  const tag = `${bgColor}${textColor}[${name}]${Reset} `;
  return tag;
}