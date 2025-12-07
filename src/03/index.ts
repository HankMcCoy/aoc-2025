import { readLines, assertNonNull } from "util/index";

type BatteryInfo = { voltage: number; idx: number };
export function getBankJoltage(bank: string): number {
  const numBatteries = bank.length;
  const batteries = bank
    .split("")
    .map((voltage, idx): BatteryInfo => ({ voltage: parseInt(voltage), idx }))
    .sort((a, b) => b.voltage - a.voltage);

  const firstBattery = batteries.find(({ idx }) => idx !== numBatteries - 1);
  assertNonNull(firstBattery);
  const secondBattery = batteries.find(({ idx }) => idx > firstBattery.idx);
  assertNonNull(secondBattery);

  return firstBattery.voltage * 10 + secondBattery.voltage;
}

// Part 1
export function part1(lines: string[]) {
  return lines.map(getBankJoltage).reduce((a, b) => a + b, 0);
}

// Part 2
export function part2(lines: string[]) {
  return 0;
}

export function run() {
  const lines = readLines(__dirname + "/input.txt");
  console.log("Part 1:", part1(lines));
  console.log("Part 2:", part2(lines));
}
