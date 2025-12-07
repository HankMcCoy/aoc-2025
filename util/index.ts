export * from "./modulo";
export * from "./range";
export * from "./readLines";
export * from "./str";

export function assertNonNull<T>(arg: T): asserts arg is NonNullable<T> {
  if (arg == null) throw new Error("Non-null invariant failed");
}
