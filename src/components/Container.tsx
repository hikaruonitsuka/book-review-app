import clsx from 'clsx';

type Props = {
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
};

const Container = ({ size = 'md', children }: Props) => {
  return (
    <div
      className={clsx('mx-auto w-full px-4', {
        'max-w-xl': size === 'sm',
        'max-w-3xl': size === 'md',
        'max-w-6xl': size === 'lg',
      })}
    >
      {children}
    </div>
  );
};

export default Container;
