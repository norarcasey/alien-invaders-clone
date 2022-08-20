export type Shooter = {
  index: number;
  className: string;
};

const currentShooterIndex: number = 202;

export function InitializeShooter(): Shooter {
  return { index: currentShooterIndex, className: 'shooter' };
}
