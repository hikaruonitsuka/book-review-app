type Props = {
  children: React.ReactNode;
};

const ErrorText = ({ children }: Props) => {
  return <div className="text-red-600">{children}</div>;
};

export default ErrorText;
