type Props = {
  children: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className="mx-auto w-full max-w-xl px-4">{children}</div>;
};

export default Container;
