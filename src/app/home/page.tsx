// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import Image from "next/image";
import icon from "@/app/icon.png";

const email = "gpr@gagahpangeran.com";

export default function HomePage() {
  return (
    <main className="home">
      <div>
        <Image src={icon} alt="GPR Logo" width={360} className="home__image" />
        <h1 className="home__title">Gagah Pangeran Rosfatiputra</h1>
        <h2 className="home__desc">Low Budget Programmer</h2>
        <h3 className="home__email">
          <a href={`mailto:${email}`}>{email}</a>
        </h3>
      </div>
    </main>
  );
}
