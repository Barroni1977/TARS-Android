const {audit} = require('../audit-tars-branding');

describe('TARS-AI complete identity audit', () => {
  it('passes app registration, onboarding, strings, assets and native resources', () => {
    expect(audit()).toBe(5);
  });
});
