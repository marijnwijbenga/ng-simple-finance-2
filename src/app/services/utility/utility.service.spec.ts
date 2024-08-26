import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { UtilityService } from './utility.service';
import { TransactionItemInterface } from '../../interfaces/transaction/transaction-item.interface';

describe('UtilityService', () => {
  let spectator: SpectatorService<UtilityService>;
  const createService = createServiceFactory({
    service: UtilityService,
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should create the service', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should convert a string with a string and number in it to a seperate string and number ', () => {
    const testValue = 'testIncome; 3000';

    expect(spectator.service.parseFormValues(testValue)).toStrictEqual(['testIncome', 3000]);
  });

  it('should return null if the number is not a number', () => {
    const testValue = 'testIncome; testValue';

    expect(spectator.service.parseFormValues(testValue)).toBeNull();
  });

  it('should return null if splitter character (;) is missing', () => {
    const testValue = 'testIncome 3000';

    expect(spectator.service.parseFormValues(testValue)).toBeNull();
  });

  it('should multiply with 30.5 when recurringInterval is daily', () => {
    const testTransaction: TransactionItemInterface = {
      name: 'testTransaction',
      amount: 100,
      recurringInterval: 'daily',
    };

    expect(spectator.service.calculateMonthlyAmount(testTransaction)).toEqual(3050);
  });

  it('should multiply with 8.66 when recurringInterval is biweekly', () => {
    const testTransaction: TransactionItemInterface = {
      name: 'testTransaction',
      amount: 100,
      recurringInterval: 'biweekly',
    };

    expect(spectator.service.calculateMonthlyAmount(testTransaction)).toEqual(866);
  });

  it('should multiply with 4.33 when recurringInterval is weekly', () => {
    const testTransaction: TransactionItemInterface = {
      name: 'testTransaction',
      amount: 100,
      recurringInterval: 'weekly',
    };

    expect(spectator.service.calculateMonthlyAmount(testTransaction)).toEqual(433);
  });

  it('should multiply with 2 when recurringInterval is bimonthly', () => {
    const testTransaction: TransactionItemInterface = {
      name: 'testTransaction',
      amount: 100,
      recurringInterval: 'bimonthly',
    };

    expect(spectator.service.calculateMonthlyAmount(testTransaction)).toEqual(200);
  });

  it('should return income.amount recurringInterval is monthly', () => {
    const testTransaction: TransactionItemInterface = {
      name: 'testTransaction',
      amount: 100,
      recurringInterval: 'monthly',
    };

    expect(spectator.service.calculateMonthlyAmount(testTransaction)).toEqual(100);
  });

  it('should return income.amount recurringInterval is biyearly', () => {
    const testTransaction: TransactionItemInterface = {
      name: 'testTransaction',
      amount: 100,
      recurringInterval: 'biyearly',
    };

    expect(spectator.service.calculateMonthlyAmount(testTransaction)).toEqual(16.666666666666664);
  })

  it('should return income.amount recurringInterval is yearly', () => {
    const testTransaction: TransactionItemInterface = {
      name: 'testTransaction',
      amount: 100,
      recurringInterval: 'yearly',
    };

    expect(spectator.service.calculateMonthlyAmount(testTransaction)).toEqual(8.333333333333332);
  })





});
