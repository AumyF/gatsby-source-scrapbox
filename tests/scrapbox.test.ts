import { Context } from "io-ts";

const last = <T extends readonly any[]>(a: T): T[number] => a[a.length - 1];

const prettifyContext = (context: Context) =>
  context.map((v) =>
    `at key ${v.key}, expected ${v.type.name} but got ${JSON.stringify(
      v.actual
    ).slice(0, 80)}`.slice(0, 160)
  );

test.todo("write later");
