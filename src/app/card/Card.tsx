import Image from "next/image";
import { resolveImage } from "./image";


export interface CardProps {
  index: number;
  backwards?: boolean;
}

/**
 * Tarot card, can be closed.
 */
export const Card = ({
  index,
  backwards = false
}: CardProps) => (
  <>
    <Image
      src={resolveImage(index, backwards)}
      alt="tarot card"
    />
  </>
);