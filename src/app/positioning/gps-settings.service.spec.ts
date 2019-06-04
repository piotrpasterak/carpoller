import { TestBed } from '@angular/core/testing';

import { GpsSettingsService } from './gps-settings.service';

describe('GpsSettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GpsSettingsService = TestBed.get(GpsSettingsService);
    expect(service).toBeTruthy();
  });
});
