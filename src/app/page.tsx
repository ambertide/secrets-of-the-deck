import { CardButton } from "@/app/card";
import { Yeseva_One } from "next/font/google";
import { Playfair_Display } from "next/font/google";

const titleFont = Yeseva_One({ weight: "400", subsets: [ 'latin' ]});

export default function Home() {
  return (
    <section className="flex flex-col lg:py-32 md:py-16 flex-1 justify-center items-center gap-8">
      <h1 className={`${titleFont.className} text-6xl`}>Secrets of the Deck</h1>
      <section className="flex flex-row justify-center items-center lg:gap-32 md:gap-16">
          <CardButton
            href="/create"
            title="Create"
            index={3}
          />
          <CardButton
            href="/join"
            title="Join"
            index={9}
          />
        </section>
      </section>
  );
}
