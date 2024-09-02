import scss from './aside.module.scss';

export default function MobileFilter() {
  return (
    <>
      <div className={[scss.mobileFilter, 'd-md-none d-flex'].join(' ')}>
        <div>篩選</div>
        <div>飼料分類</div>
        <div>排序</div>
      </div>
    </>

  )
}
