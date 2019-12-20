export default (name: string): string =>
  name
    .replace('Metadata/Items/Gems/', '')
    .replace('SupportGem', '')
    .replace(/([A-Z])/g, ' $1')
    .trim()
