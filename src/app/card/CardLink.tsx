import "./cardLink.css";
import { Card, CardProps } from "./Card";

export interface CardLinkProps extends CardProps {
    href: string;
    title: string;
};

/**
 * Clickable card.
 */
export const CardLink = ({
  href,
  title,
  ...cardProps
}: CardLinkProps) => (
  <a href={href}
    data-action={title}
    className="card-link">
    <Card {...cardProps}/>
  </a>
);