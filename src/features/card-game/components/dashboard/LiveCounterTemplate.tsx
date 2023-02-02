type Props = {
  title: string;
  value: number;
};

export const LiveCounter = ({ title, value }: Props) => {
  return (
    <div
      style={{
        height: '2.5rem',
      }}
    >
      <span>{title}</span>
      <span
        style={{
          display: 'inline-block',
          width: '3em',
        }}
      >
        {value}
      </span>
    </div>
  );
};
