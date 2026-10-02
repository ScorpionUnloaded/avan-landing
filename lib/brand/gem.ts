/**
 * The gem — AVAN Group's primary mark — as data: the 29 strokes of the master
 * vector (tokens/brand/avan-gem-mark.svg), in drawing order. Every rendering of
 * the mark (GemMark, app icons, Open Graph cards, the overture) draws from this
 * list; a unit test keeps it identical to the master file. Never redraw the gem.
 */
export const GEM_VIEWBOX = { width: 461, height: 1000 } as const;

/** [x1, y1, x2, y2] per stroke, in master-file units. */
export const GEM_STROKES: ReadonlyArray<readonly [number, number, number, number]> = [
  [230.5, 40.0, 400.4, 239.3],
  [230.5, 40.0, 60.6, 239.3],
  [230.5, 40.0, 329.0, 273.8],
  [230.5, 40.0, 132.0, 273.8],
  [230.5, 40.0, 230.5, 340.3],
  [400.4, 239.3, 329.0, 273.8],
  [400.4, 239.3, 420.4, 483.2],
  [60.6, 239.3, 132.0, 273.8],
  [60.6, 239.3, 40.6, 483.2],
  [329.0, 273.8, 230.5, 340.3],
  [132.0, 273.8, 230.5, 340.3],
  [329.0, 273.8, 420.4, 483.2],
  [132.0, 273.8, 40.6, 483.2],
  [230.5, 340.3, 40.6, 483.2],
  [230.5, 340.3, 420.4, 483.2],
  [230.5, 340.3, 353.0, 669.7],
  [230.5, 340.3, 108.1, 669.7],
  [230.5, 340.3, 230.5, 746.0],
  [40.6, 483.2, 12.0, 685.0],
  [420.4, 483.2, 449.0, 685.0],
  [449.0, 685.0, 353.0, 669.7],
  [353.0, 669.7, 230.5, 746.0],
  [353.0, 669.7, 230.5, 960.0],
  [12.0, 685.0, 108.1, 669.7],
  [108.1, 669.7, 230.5, 746.0],
  [108.1, 669.7, 230.5, 960.0],
  [12.0, 685.0, 230.5, 960.0],
  [449.0, 685.0, 230.5, 960.0],
  [230.5, 746.0, 230.5, 960.0],
];

/** Master stroke weight, in master-file units. */
export const GEM_STROKE_WIDTH = 6;
