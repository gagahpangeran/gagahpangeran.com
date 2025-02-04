// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

type Modifiers = string | { [key: string]: boolean } | undefined;

export default function classModifiers(
  className: string,
  ...modifiers: Modifiers[]
) {
  let withModifiers = className;

  modifiers.forEach(mod => {
    if (mod !== undefined) {
      if (typeof mod === "string") {
        withModifiers += ` ${className}--${mod}`;
      } else {
        Object.entries(mod).map(([mod, isValid]) => {
          if (isValid) {
            withModifiers += ` ${className}--${mod}`;
          }
        });
      }
    }
  });

  return withModifiers;
}

export function classAll(...classNames: Array<string | string[]>) {
  return classNames.flat().join(" ");
}
