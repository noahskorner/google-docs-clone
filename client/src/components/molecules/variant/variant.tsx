interface VariantProps {
  header: string;
  children: JSX.Element | JSX.Element[];
}

const Variant = ({ header, children }: VariantProps) => {
  return (
    <div className="space-y-2">
      <h6 className="font-bold text-xl">{header}</h6>
      <div className="border border-primary p-4 flex flex-wrap items-center justify-center gap-2 rounded-md">
        {children}
      </div>
    </div>
  );
};

export default Variant;
