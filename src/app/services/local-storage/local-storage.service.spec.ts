import { SpectatorService, createServiceFactory } from '@ngneat/spectator/jest';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let spectator: SpectatorService<LocalStorageService>;
  const createService = createServiceFactory({
    service: LocalStorageService,
  });

  beforeEach(() => {
    spectator = createService();
    spectator.service.setLocalStorage('testKey', 'testValue');
  });

  afterEach(() => {
    spectator.service.removeLocalStorage('testKey');
  })

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should get local storage', () => {
    spectator.service.getLocalStorage('testKey');
    expect(spectator.service.getLocalStorage('testKey')).toBe('testValue');
  });

  it('should return null if local storage key doesnt exist', () => {
    spectator.service.getLocalStorage('nonExistingKey');
    expect(spectator.service.getLocalStorage('nonExistingKey')).toBeNull();
  });

  it('should set local storage', () => {
    spectator.service.setLocalStorage('testKey2', 'testValue2');
    expect(spectator.service.getLocalStorage('testKey2')).toBe('testValue2');
  });


});
