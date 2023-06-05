import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Auth from '@/shared/axios';

const Index = () => {
  const router = useRouter();
  const token = router.query.token as string;

  useEffect(() => {
    if (!token) return;
    Auth.defaults.headers.common['authorization'] = `Bearer ${token}`;
    router.replace('/calendar');
  }, []);

  return <div>카카오 로그인 처리중입니다.</div>;
};

export default Index;
