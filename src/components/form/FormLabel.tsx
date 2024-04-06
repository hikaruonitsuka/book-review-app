type Props = {
  htmlFor: string;
  children: React.ReactNode;
};

const FormLabel = ({ children, htmlFor }: Props) => {
  return (
    <label className="font-bold" htmlFor={htmlFor}>
      {children}
    </label>
  );
};

export default FormLabel;
