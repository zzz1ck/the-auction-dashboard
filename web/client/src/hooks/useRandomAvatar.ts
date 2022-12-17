enum Sprites {
  'adventurer',
  'adventurer-neutral',
  'avataaars',
  'big-ears',
  'big-ears-neutral',
  'big-smile',
  'bottts',
  'croodles',
  'croodles-neutral',
  'identicon',
  'initials',
  'micah',
  'miniavs',
  'open-peeps',
  'personas',
  'pixel-art',
  'pixel-art-neutral',
}

export default function useRandomAvatar(wallet: string): string {
  const SPRITE_INDEX = Math.floor(Math.random() * (Object.keys(Sprites).length / 2));
  return `https://avatars.dicebear.com/api/${Sprites[SPRITE_INDEX]}/${wallet}.svg`;
}
