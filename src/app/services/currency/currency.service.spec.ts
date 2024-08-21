import { CurrencyService } from './currency.service';
import { mockProvider, SpectatorService, createServiceFactory } from '@ngneat/spectator/jest';
import { LocalStorageService } from '../local-storage/local-storage.service';

describe('CurrencyService', () => {
  let spectator: SpectatorService<CurrencyService>;
  const createService = createServiceFactory({
    service: CurrencyService,
    providers: [
      mockProvider(LocalStorageService),
    ],
  });

  beforeEach(() => {
    spectator = createService();
  });
});
