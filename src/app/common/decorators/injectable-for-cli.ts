import { Injectable, InjectableOptions, Scope } from '@nestjs/common';
import { basename } from 'path';

export function InjectableForCli(options?: InjectableOptions): ClassDecorator {
  if (
    basename(process.argv[1]) === 'nestjs-command' &&
    options?.scope === Scope.REQUEST
  ) {
    options.scope = Scope.DEFAULT;
  }

  return Injectable(options);
}
