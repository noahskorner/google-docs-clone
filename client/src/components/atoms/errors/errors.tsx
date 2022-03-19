interface ErrorsProps {
  errors: Array<string>;
}

const Errors = ({ errors }: ErrorsProps) => {
  return errors.length ? (
    <div>
      {errors.map((error) => {
        return (
          <p key={error} className="text-red-500 font-medium">
            {error}
          </p>
        );
      })}
    </div>
  ) : (
    <></>
  );
};

export default Errors;
