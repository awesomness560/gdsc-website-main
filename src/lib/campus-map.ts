/** Approximate coordinates for common UTD campus buildings (lat, lon). */
const UTD_BUILDING_COORDS: Record<string, { lat: number; lon: number }> = {
  'engineering and computer science west': { lat: 32.9869, lon: -96.7518 },
  'engineering and computer science south': { lat: 32.9875, lon: -96.7495 },
  'green hall': { lat: 32.982, lon: -96.7545 },
  'student union': { lat: 32.9815, lon: -96.752 },
}

const UTD_CAMPUS_CENTER = { lat: 32.9855, lon: -96.7501 }

export function resolveCampusCoordinates(buildingFullName: string) {
  const key = buildingFullName.trim().toLowerCase()
  return UTD_BUILDING_COORDS[key] ?? UTD_CAMPUS_CENTER
}

/**
 * Interactive OpenStreetMap embed (no API key; allows iframe embedding).
 * staticmap.openstreetmap.de thumbnails are unreliable and often fail to load.
 */
export function getCampusMapEmbedUrl(
  buildingFullName: string,
  room: string,
  options?: { lat?: number; lon?: number },
) {
  const { lat, lon } =
    options?.lat != null && options?.lon != null
      ? { lat: options.lat, lon: options.lon }
      : resolveCampusCoordinates(buildingFullName)

  const pad = 0.007
  const bbox = [lon - pad, lat - pad, lon + pad, lat + pad].join(',')
  const marker = `${lat}%2C${lon}`
  const label = encodeURIComponent(
    `${buildingFullName} ${room}, University of Texas at Dallas`,
  )

  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}&title=${label}`
}

/** External link — Google Maps search for the room + building. */
export function getCampusMapsLinkUrl(buildingFullName: string, room: string) {
  const query = encodeURIComponent(
    `${buildingFullName} ${room}, University of Texas at Dallas`,
  )
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}
