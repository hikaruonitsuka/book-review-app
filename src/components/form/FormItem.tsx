type Props = {
  children: React.ReactNode;
};

const FormItem = ({ children }: Props) => {
  return <div className="flex flex-col items-start gap-y-2">{children}</div>;
};

export default FormItem;
