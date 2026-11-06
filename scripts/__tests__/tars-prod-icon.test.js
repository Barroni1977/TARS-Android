const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');
const prod = path.join(repoRoot, 'android/app/src/prod');
const read = relative => fs.readFileSync(path.join(prod, relative), 'utf8');

describe('TARS AI prod launcher icon', () => {
  it('overrides only the prod app identity, never shared or E2E icon resources', () => {
    const manifest = read('AndroidManifest.xml');
    expect(manifest).toContain('android:icon="@mipmap/tars_launcher"');
    expect(manifest).toContain(
      'android:roundIcon="@mipmap/tars_launcher_round"',
    );
    expect(manifest).toContain(
      'tools:replace="android:icon,android:roundIcon"',
    );
  });

  it('has custom adaptive, monochrome and legacy-compatible launcher variants', () => {
    const adaptive = read('res/mipmap-anydpi-v26/tars_launcher.xml');
    const round = read('res/mipmap-anydpi-v26/tars_launcher_round.xml');
    expect(round).toBe(adaptive);
    expect(adaptive).toContain('@drawable/tars_launcher_foreground');
    expect(adaptive).toContain('@drawable/tars_launcher_monochrome');
    expect(adaptive).toContain('@color/tars_launcher_background');

    expect(read('res/mipmap-anydpi/tars_launcher.xml')).toContain(
      '@drawable/tars_launcher_foreground',
    );
    expect(read('res/mipmap-anydpi/tars_launcher_round.xml')).toContain(
      '@drawable/tars_launcher_foreground',
    );
  });

  it('uses Android-compatible transparent fills for stroke-only vectors', () => {
    const monochrome = read('res/drawable/tars_launcher_monochrome.xml');
    // Android resource linking rejects fillColor="none", even though SVG
    // accepts it. A transparent 8-digit ARGB value retains stroke-only paths.
    expect(monochrome).not.toMatch(/android:fillColor="none"/);
    expect(
      (monochrome.match(/android:fillColor="#00000000"/g) || []).length,
    ).toBe(3);
  });

  it('uses original monolith/amber design rather than old PocketPal artwork', () => {
    const foreground = read('res/drawable/tars_launcher_foreground.xml');
    expect(foreground).toContain('#FFA52D');
    expect(foreground).toContain('#63E8B5');
    expect(foreground).not.toMatch(/pocket|pal-icon|face|mouth|eye-left/i);
    expect(read('res/values/tars_launcher_background.xml')).toContain(
      '#080B0D',
    );
    expect(read('res/drawable/tars_launcher_monochrome.xml')).toContain(
      '#FFFFFFFF',
    );
  });
});
