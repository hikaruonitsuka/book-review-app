import Container from '@/components/Container';

const NotFound = () => {
  return (
    <div className="grid min-h-full place-items-center">
      <Container>
        <div className="flex flex-col items-center gap-y-8">
          <h2 className="text-4xl font-bold">404 Not Found!</h2>
          <p className="text-red-600">お探しのページが見つかりませんでした。</p>
        </div>
      </Container>
    </div>
  );
};

export default NotFound;
