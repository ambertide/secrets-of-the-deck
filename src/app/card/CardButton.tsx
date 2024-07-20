import "./cardButton.css";
import { Card, CardProps } from "./Card";
import Link from 'next/link';
import fonts from "../utils/fonts";
export interface CardLinkProps extends CardProps {
    href: string;
    title: string;
};

/**
 * Clickable card.
 */
export const CardButton = ({
  href,
  title,
  ...cardProps
}: CardLinkProps) => (
  <div className={`${fonts.body.className} card-button flex items-center justify-center`}>
    <Link href={href}
      className=" font-extrabold text-3xl">
      {title}
    </Link>
  </div>
);