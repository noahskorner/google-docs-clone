interface ComponentProps {
  header: string;
  children: JSX.Element | JSX.Element[];
}

const Component = ({ header, children }: ComponentProps) => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{header}</h1>
      <div className="space-y-4">{children}</div>
    </div>
  );
};

export default Component;
