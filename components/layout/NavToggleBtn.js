import FddBtn from '@/components/buttons/fddBtn';
import s from './navHeader.module.scss';

export default function NavToggleBtn({ showMenu = false, setShowMenu = () => { } }) {
  return (
    <FddBtn
      color='white'
      pill={false}
      icon
      className={[s.hbgBtn, showMenu ? s.active : ''].join(' ')}
      callback={() => setShowMenu(!showMenu)}
    >
      {/* <GiHamburgerMenu /> */}
      <div className={s.bar}></div>
    </FddBtn>
  )
}
