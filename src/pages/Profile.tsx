import Container from '@/components/Container';
import ProfileForm from '@/features/profile/ProfileForm';
import { useAuth } from '@/hooks/useAuth';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid min-h-full place-items-center">
      <Container size="sm">
        <section className="flex w-full flex-col gap-y-14">
          <h2 className="text-center text-2xl font-bold">ユーザー名の変更</h2>
          <ProfileForm defaultValues={user} />
        </section>
      </Container>
    </div>
  );
};

export default Profile;
