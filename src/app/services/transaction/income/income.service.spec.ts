import { createServiceFactory, mockProvider, SpectatorService } from '@ngneat/spectator/jest';
import { IncomeService } from './income.services';
import { LocalStorageService } from '../../local-storage/local-storage.service';

describe('IncomeService', () => {
  let spectator: SpectatorService<IncomeService>;
  const createService = createServiceFactory({
    service: IncomeService,
    providers: [
      mockProvider(LocalStorageService, {
        getLocalStorage: jest.fn().mockReturnValue(JSON.stringify([
          {
            name: 'test name 1',
            amount: 200,
            recurringInterval: 'monthly',
          },
          {
            name: 'test name 2',
            amount: 300,
            recurringInterval: 'weekly',
          },
        ])),
        setLocalStorage: jest.fn(),
        removeLocalStorage: jest.fn(),
      }),
    ],
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should create the service', () => {
    expect(spectator.service).toBeTruthy();
  });


  it('should return a single income from getIncome', () => {
    spectator.service.addTransaction({
      name: 'test name 3',
      amount: 200,
      recurringInterval: 'monthly',
    });

    const incomeListIndex = 2;

    expect(spectator.service.getTransaction(incomeListIndex)).toEqual({
      name: 'test name 3',
      amount: 200,
      recurringInterval: 'monthly',
    });
  });

  it('should add an income', () => {
    spectator.service.addTransaction({
      name: 'test name 5',
      amount: 200,
      recurringInterval: 'weekly',
    });

    expect(spectator.service.getTransaction(2)).toEqual({
      name: 'test name 5',
      amount: 200,
      recurringInterval: 'weekly',
    })
  });

  it('should set the default interval to monthly', () => {
    spectator.service.addTransaction({
      name: 'test name 6',
      amount: 200,
    });

    const incomeListIndex = 2;

    expect(spectator.service.getTransaction(incomeListIndex)).toEqual({
      name: 'test name 6',
      amount: 200,
      recurringInterval: 'monthly',
    })
  });

  it('should patch an income with new values', () => {
    const listIndex = 0;
    spectator.service.patchTransaction(listIndex, {
      name: 'test name 6',
      amount: 200,
      recurringInterval: 'monthly',
    });

    expect(spectator.service.getTransaction(listIndex)).toEqual({
      name: 'test name 6',
      amount: 200,
      recurringInterval: 'monthly',
    });

  });


  it('should recalculate the total income if incomeList changes', () => {
    expect(spectator.service.incomeTotal()).toEqual(1499);

    const listIndex = 0;

    spectator.service.patchTransaction(listIndex, {
      name: 'test name 6',
      amount: 900,
      recurringInterval: 'monthly',
    });

    expect(spectator.service.incomeTotal()).toEqual(2199);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

});
