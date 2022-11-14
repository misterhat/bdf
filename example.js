import fs from 'fs/promises';
import BDF from './bdf.js';

import CreateCanvasKit from 'canvaskit-wasm';

const DATA_URL_PREFIX = 'data:image/png;base64,';

const CanvasKit = await CreateCanvasKit();
const canvas = CanvasKit.MakeCanvas(200, 200);

//const bdfData = await fs.readFile('./c64.bdf', 'utf8');
const bdfData = await fs.readFile('./cherry-10-r.bdf', 'utf8');
const bdf = new BDF(bdfData);

console.log(bdf.glyphs[62].bytes);

//console.log(bdf.glyphs['f'.charCodeAt(0)]);
//console.log(bdf.writeText('farts'));
bdf.drawText('FARTS', canvas, { kerningBias: 5, colour: '#f0f', x: 50, y: 50, scale: 2 });

const png = Buffer.from(canvas.toDataURL().slice(DATA_URL_PREFIX.length), 'base64');
await fs.writeFile('./farts.png', png);
