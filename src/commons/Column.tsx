type ColumnProps = {
  children: React.ReactNode;
};

export const Column = ({ children }: ColumnProps) => {
  return (
    <div
      style={{
        width: '33%',
      }}
    >
      {children}
    </div>
  );
};
