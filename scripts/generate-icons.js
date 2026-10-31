import fs from 'fs';
import path from 'path';

// Generate a valid solid/gradient PNG buffer without native dependencies
// Standard PNG creation via minimal uncompressed IDAT or SVG data URI
function createPngIcon(size, isMaskable = false) {
  // We can write an SVG-backed HTML or minimal 1-pixel or structured RGBA PNG
  // Even simpler: create valid PNG using pure JS
  const width = size;
  const height = size;
  
  // Minimal PNG header & chunk writer
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  function crc32(buf) {
    let table = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let k = 0; k < 8; k++) {
        c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
      }
      table[i] = c;
    }
    let crc = 0 ^ (-1);
    for (let i = 0; i < buf.length; i++) {
      crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
    }
    return (crc ^ (-1)) >>> 0;
  }

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crcBuf = Buffer.alloc(4);
    const combined = Buffer.concat([typeBuf, data]);
    crcBuf.writeUInt32BE(crc32(combined), 0);
    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type: RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace
  const ihdrChunk = makeChunk('IHDR', ihdr);

  // Uncompressed raw scanlines: each line starts with filter byte 0
  const lineLength = 1 + width * 4;
  const rawData = Buffer.alloc(lineLength * height);

  const cx = width / 2;
  const cy = height / 2;
  const radius = width * 0.45;

  for (let y = 0; y < height; y++) {
    const lineOffset = y * lineLength;
    rawData[lineOffset] = 0; // Filter: none
    for (let x = 0; x < width; x++) {
      const pxOffset = lineOffset + 1 + x * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Deep romantic luxury gradient
      const ratioY = y / height;
      const r = Math.round(30 + ratioY * 180);
      const g = Math.round(15 + ratioY * 40);
      const b = Math.round(50 + (1 - ratioY) * 120);

      if (dist < radius) {
        // Inner heart glow area
        rawData[pxOffset] = Math.min(255, r + 40);
        rawData[pxOffset + 1] = Math.min(255, g + 20);
        rawData[pxOffset + 2] = Math.min(255, b + 60);
        rawData[pxOffset + 3] = 255;
      } else {
        rawData[pxOffset] = 20;
        rawData[pxOffset + 1] = 15;
        rawData[pxOffset + 2] = 30;
        rawData[pxOffset + 3] = isMaskable ? 255 : (dist < radius + 15 ? 180 : 0);
      }
    }
  }

  // Deflate rawData using zlib
  import('zlib').then(zlib => {
    const compressed = zlib.deflateSync(rawData);
    const idatChunk = makeChunk('IDAT', compressed);
    const iendChunk = makeChunk('IEND', Buffer.alloc(0));
    const png = Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);

    const publicDir = path.resolve('public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    if (size === 192) {
      fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), png);
      console.log('Generated pwa-192x192.png');
    } else if (size === 512 && isMaskable) {
      fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), png);
      console.log('Generated pwa-maskable-512x512.png');
    } else if (size === 512) {
      fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), png);
      console.log('Generated pwa-512x512.png');
    } else if (size === 180) {
      fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), png);
      console.log('Generated apple-touch-icon.png');
    }
  });
}

createPngIcon(192);
createPngIcon(512);
createPngIcon(512, true);
createPngIcon(180);
