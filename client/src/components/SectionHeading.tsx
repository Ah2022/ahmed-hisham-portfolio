interface Props {
  number: string;
  label: string;
  title: string;
  description: string;
}
export default function SectionHeading({
  number,
  label,
  title,
  description,
}: Props) {
  return (
    <header className="section-heading">
      <div className="section-index">
        <span>{number}</span> / {label}
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
    </header>
  );
}
