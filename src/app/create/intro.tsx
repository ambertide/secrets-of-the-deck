import { ConnectionStateType } from "@/lib/features/connections";
import { CopyButton } from "./CopyButton";
import { useAppearingText } from "./useAppearingText";

interface IntroProps {
  offer: string;
  connectionState: ConnectionStateType;
}

const texts = [
  'This game is about knowing a person you care about a lot.',
  'We are now forging a magical link that will bound both of you for the duration of the game',
  'Once forged, a button will appear, click it and send the link to your choosen person',
  'Then, the game can begin.'
];


export const Intro = ({ offer, connectionState }: IntroProps) => {
  const paragraphs = useAppearingText(texts);
  return (
    <>
      {paragraphs}
      <section className=" w-full flex justify-center">
        <CopyButton link={offer}/>
      </section>
    </>
  );
};