import { URLSearchParams } from "url";
const isNonNullish = <T>(t: T): t is NonNullable<T> => t != null;

export const constructUrlParams = (
  a: Record<string, string | number | undefined>
): URLSearchParams =>
  new URLSearchParams(
    Object.entries(a)
      .filter(([, value]) => isNonNullish(value))
      .map(([key, value]): [string, string] => [key, String(value)])
  );
