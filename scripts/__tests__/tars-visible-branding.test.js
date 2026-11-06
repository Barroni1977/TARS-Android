const fs = require('fs');
const path = require('path');

const localeDirectory = path.resolve(__dirname, '..', '..', 'src', 'locales');
const localeFiles = fs
  .readdirSync(localeDirectory)
  .filter(filename => filename.endsWith('.json'));

describe('TARS AI visible branding', () => {
  it.each(localeFiles)('contains no upstream PocketPal or co-pilot labels in %s', filename => {
    const locale = JSON.parse(
      fs.readFileSync(path.join(localeDirectory, filename), 'utf8'),
    );
    const visibleCopy = JSON.stringify(locale);

    // Keep upstream names in source identifiers and mandatory legal notices;
    // users should see TARS-AI as the product name in every translated UI.
    expect(visibleCopy).not.toMatch(/pocket[\\s-]?pal|co[\\s-]?pilot/i);
  });
});
