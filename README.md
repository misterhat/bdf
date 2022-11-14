# BDF.js

Library for reading and drawing Adobe Glyph Bitmap Distribution font files.
Read more about this format on
[Wikipedia](https://en.wikipedia.org/wiki/Glyph_Bitmap_Distribution_Format).

## Example
```javascript
// TODO
```
An example Commodore 64 8x8 point font is included.

## API

* **`bdf = new BDF(data)`**__

Initializes a BDF font instance and optionally loads font data string.

* __**`bdf.load(data)`**__

Loads font data string. Throws if unable to parse.

* __**`bdf.meta`**__ (property)

An object containing metadata about the font once loaded. This includes the font version, name, size and several other properties.

Example meta object:
```javascript
{
  version: '2.1',
  name: 'c64',
  size: { points: 8, resolutionX: 75, resolutionY: 75 },
  boundingBox: { width: 8, height: 8, x: 0, y: -2 },
  properties: { fontDescent: 2, fontAscent: 6, defaultChar: 0 },
  totalChars: 95
}
```

* __**`bdf.glyphs`**__ (property)

An object containing data for every glyph in the font. Each key in this object
represents the character encoding.

Example glyphs object:
```javascript
{
  ...
  '64': { ... }
  '65': {
    name: 'C0001',
    bytes: [Object],
    bitmap: [Object],
    code: 65,
    char: 'A',
    scalableWidthX: 666,
    scalableWidthY: 0,
    deviceWidthX: 8,
    deviceWidthY: 0,
    boundingBox: { x: 0, y: -2, width: 8, height: 8 }
  }
  '66': { ... }
  ...
}
```
The `bitmap` object corresponding to each glyph contains a matrix of
`1`s and `0`s defining the shape of the glyph in the bounding box.
Example bitmap object, for the character `'A'` with code `65`:
(the spaces are `0`s, left out in the example below to make it clearer)
```javascript
[
  [       1 1       ],
  [     1 1 1 1     ],
  [   1 1     1 1   ],
  [   1 1 1 1 1 1   ],
  [   1 1     1 1   ],
  [   1 1     1 1   ],
  [   1 1     1 1   ],
  [                 ]
]
```
The `bytes` object corresponding to each glyph is similar to the bitmap
object, but each series of eight `1`s and `0`s on a row is encoded in a byte,
instead of being laid out as `1`s and `0`s in an array.
Example bytes object, for the character `'A'` with code `65`:
`[ 24, 60, 102, 126, 102, 102, 102, 0 ]`

* __**`bdf.writeText(text, options)`**__

Convenient way of creating a matrix concatenating bitmap information for
several glyphs in this font.

`text` is a string containing the text to convert to a bitmap.

The optional `options` object contains the properties:

* `kerningBias` a number consistently added to the glyph width when building the
bitmap.

This method returns an object with a property called `grid`, containing
bitmap rows, which are arrays of bits. It also contains `width` and `height`
properties defining the bitmap bounds.

* __**`bdf.drawText(text, canvas, options)`**__
Renders a string of text to a canvas.

`text` is a string containing the text to convert to a bitmap.

`canvas` is the desired `Canvas` element or shim to render to.

The optional `options` object contains the properties:

* `colour` a CSS colour string. default is '#000'.
* `x` a number describing x offset to draw at. default is 0.
* `y` a number describing y offset to draw at. default is 0.
* `scale` a number describing the scale multiplier to apply to each glyph.
default is 1.0.
* `kerningBias` a number consistently added to the glyph width when building the
bitmap.

## License
This Source Code Form is subject to the terms of the Mozilla Public License, v.
2.0. If a copy of the MPL was not distributed with this file, You can obtain one
at http://mozilla.org/MPL/2.0/.
