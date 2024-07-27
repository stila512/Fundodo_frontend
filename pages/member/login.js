import NavHeader from '@/components/common/navHeader';
import scss from './member.module.scss';
import loginP from '@/public/login.png';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <>
      <main className={scss.container}>
        <loginP />
      </main>
    </>
  );
}
