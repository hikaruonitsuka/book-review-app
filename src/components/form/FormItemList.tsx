type Props = {
  children: React.ReactNode;
};

const FormItemList = ({ children }: Props) => {
  return <div className="flex w-full flex-1 flex-col gap-y-4">{children}</div>;
};

export default FormItemList;
