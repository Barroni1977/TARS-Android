const fs = require('fs');
const os = require('os');
const path = require('path');

const {generate} = require('../generate-app-icons');

describe('TARS launcher artwork protection', () => {
  it('refuses legacy PocketPal artwork generation in a TARS repo', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'tars-icons-'));
    try {
      fs.mkdirSync(path.join(root, 'docs'), {recursive: true});
      fs.writeFileSync(path.join(root, 'docs/TARS_ONBOARDING.md'), 'TARS');
      expect(() => generate({root})).toThrow(
        'Legacy PocketPal icon generation is disabled for TARS-AI',
      );
      expect(fs.existsSync(path.join(root, 'android'))).toBe(false);
      expect(fs.existsSync(path.join(root, 'ios'))).toBe(false);
    } finally {
      fs.rmSync(root, {recursive: true, force: true});
    }
  });
});
