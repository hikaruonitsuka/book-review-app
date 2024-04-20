type Props = {
  children: React.ReactNode;
};

const SuccessText = ({ children }: Props) => {
  return <div className="text-green-600">{children}</div>;
};

export default SuccessText;
