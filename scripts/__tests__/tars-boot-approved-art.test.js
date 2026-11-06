const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const artPath = path.resolve(
  __dirname,
  '..',
  '..',
  'android',
  'app',
  'src',
  'prod',
  'res',
  'drawable-nodpi',
  'tars_boot_approved.png',
);

describe('exact user-approved TARS startup artwork', () => {
  it('bundles the PNG under the resource name used by Android', () => {
    expect(fs.existsSync(artPath)).toBe(true);
    const bytes = fs.readFileSync(artPath);

    expect(bytes.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a');
    expect(bytes.readUInt32BE(16)).toBe(941);
    expect(bytes.readUInt32BE(20)).toBe(1672);
  });

  it('preserves the clean approved image byte for byte', () => {
    const sha256 = crypto
      .createHash('sha256')
      .update(fs.readFileSync(artPath))
      .digest('hex');
    expect(sha256).toBe(
      '0cc6b52856ec84f7a7de0a5a3dea55c542988d4facd34147ed1024ced0133e40',
    );
  });
});
