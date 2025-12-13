import { readLines, assertNonNull } from "util/index";

type BatteryInfo = { voltage: number; idx: number };

function parseBatteries(bank: string): Array<BatteryInfo> {
  return bank
    .split("")
    .map((voltage, idx): BatteryInfo => ({ voltage: parseInt(voltage), idx }));
}

// Part 1
export function getBankJoltage(bank: string): number {
  const batteries = parseBatteries(bank);
  const numBatteries = batteries.length;
  const batteriesByVoltage = batteries.sort((a, b) => b.voltage - a.voltage);

  const firstBattery = batteriesByVoltage.find(
    ({ idx }) => idx !== numBatteries - 1
  );
  assertNonNull(firstBattery);
  const secondBattery = batteriesByVoltage.find(
    ({ idx }) => idx > firstBattery.idx
  );
  assertNonNull(secondBattery);

  return firstBattery.voltage * 10 + secondBattery.voltage;
}
export function part1(lines: string[]) {
  return lines.map(getBankJoltage).reduce((a, b) => a + b, 0);
}

// Part 2
const NUM_BATTERIES_TO_TURN_ON = 12;
export function getBankJoltageWithSafetyOverride(bank: string): number {
  const batteries = parseBatteries(bank);
  const numBatteries = batteries.length;

  function getBestBatteries(
    searchIdx: number,
    numLeftToTurnOn: number
  ): Array<BatteryInfo> {
    const bestBattery = batteries
      .slice(searchIdx, -(numLeftToTurnOn - 1) || undefined)
      .sort((a, b) => b.voltage - a.voltage)[0];

    return numLeftToTurnOn === 1
      ? [bestBattery]
      : [
          bestBattery,
          ...getBestBatteries(bestBattery.idx + 1, numLeftToTurnOn - 1),
        ];
  }
  const bestBatteries = getBestBatteries(0, NUM_BATTERIES_TO_TURN_ON);

  return parseInt(bestBatteries.map((b) => b.voltage).join(""), 10);
}

export function part2(lines: string[]) {
  return lines.map(getBankJoltageWithSafetyOverride).reduce((a, b) => a + b, 0);
}

export function run() {
  const lines = readLines(__dirname + "/input.txt");
  console.log("Part 1:", part1(lines));
  console.log("Part 2:", part2(lines));
}
