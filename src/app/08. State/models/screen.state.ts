import { MobilePhoneOptions } from './phone.options';

// State
export abstract class MobilePhoneState implements MobilePhoneOptions {
  public get name(): string {
    throw new Error('Invalid operation');
  }
  public get state(): MobilePhoneState {
    throw new Error('Invalid operation');
  }
  public lockScreen(): MobilePhoneState {
    throw new Error('Invalid operation');
  }
  public unlockScreen(): MobilePhoneState {
    throw new Error('Invalid operation');
  }
  public showLowBatteryScreen(): MobilePhoneState {
    throw new Error('Invalid operation');
  }
}

export class LockedScreen extends MobilePhoneState {
  public override get name(): string {
    return 'LockedScreen';
  }

  public override unlockScreen(): MobilePhoneState {
    return new UnLockedScreen();
  }
}

export class UnLockedScreen extends MobilePhoneState {
  public override get name(): string {
    return 'UnLockedScreen';
  }

  public override lockScreen(): MobilePhoneState {
    return new LockedScreen();
  }

  public override showLowBatteryScreen(): MobilePhoneState {
    return new LowBatteryScreen();
  }
}

export class LowBatteryScreen extends MobilePhoneState {
  public override get name(): string {
    return 'LowBatteryScreen';
  }

  public override unlockScreen(): MobilePhoneState {
    return new UnLockedScreen();
  }
}
