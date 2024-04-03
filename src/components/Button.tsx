type Props = {
  type?: 'submit' | 'button';
  children: React.ReactNode;
};

const Button = ({ type = 'submit', children }: Props) => {
  return (
    <button
      className="rounded-lg bg-cyan-600 px-4 py-2 font-bold text-white"
      type={type}
      data-cy={type}
    >
      {children}
    </button>
  );
};

export default Button;
