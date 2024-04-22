const FormLabel = ({
  children,
  htmlFor,
}: React.LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label className="font-bold" htmlFor={htmlFor}>
      {children}
    </label>
  );
};

export default FormLabel;
