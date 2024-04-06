type Props = {
  children: React.ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const FormContainer = ({ children, onSubmit }: Props) => {
  return (
    <form
      className="flex flex-col items-center justify-center gap-y-12"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export default FormContainer;
