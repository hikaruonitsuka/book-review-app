import clsx from 'clsx';

type Props = {
  type?: 'submit' | 'button';
  color?: 'normal' | 'danger';
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  type = 'submit',
  color = 'normal',
  children,
  ...rest
}: Props) => {
  return (
    <button
      className={clsx('rounded-lg px-4 py-2 font-bold text-white', {
        'bg-cyan-600': color === 'normal',
        'bg-red-600': color === 'danger',
      })}
      type={type}
      data-cy={type}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
