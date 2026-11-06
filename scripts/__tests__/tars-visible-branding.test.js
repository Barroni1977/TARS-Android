const fs = require('fs');
const path = require('path');

const localeDirectory = path.resolve(__dirname, '..', '..', 'src', 'locales');
const localeFiles = fs
  .readdirSync(localeDirectory)
  .filter(filename => filename.endsWith('.json'));

describe('TARS AI visible branding', () => {
  it.each(localeFiles)(
    'contains no upstream PocketPal or co-pilot labels in %s',
    filename => {
      const locale = JSON.parse(
        fs.readFileSync(path.join(localeDirectory, filename), 'utf8'),
      );
      const visibleCopy = JSON.stringify(locale);

      // Upstream names remain in internal identifiers and required notices;
      // the translated UI must present TARS AI as the product identity.
      expect(visibleCopy).not.toMatch(/pocket[\s-]?pal|co[\s-]?pilot/i);
    },
  );
});
