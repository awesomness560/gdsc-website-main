/** Static OpenStreetMap preview for UTD campus locations (no API key). */
export function getCampusMapThumbnailUrl(
  buildingFullName: string,
  room: string,
): string {
  const query = encodeURIComponent(`${buildingFullName} ${room} UT Dallas`)
  const center = '32.9855,-96.7501'
  return `https://staticmap.openstreetmap.de/staticmap.php?center=${center}&zoom=16&size=640x280&maptype=mapnik&markers=${center},lightblue1&title=${query}`
}
