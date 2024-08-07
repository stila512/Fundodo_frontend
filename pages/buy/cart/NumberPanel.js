import { LuPlus, LuMinus } from "react-icons/lu";

export const NumberPanel = ({
  quantity = 1,
  setFunc = () => { },
  index = -1
}) => (
  <div className='hstack mx-auto p-2' style={{ width: '8rem', height: '3rem', border: '1px solid #787473' }}>
    <div className='fx-center' onClick={() => setFunc(arr => arr.map((d, j) => (j === index) ? d - 1 : d))}>
      <LuMinus />
    </div>
    <div className='flex-grow-1'>{quantity}</div>
    <div className='fx-center' onClick={() => setFunc(arr => arr.map((d, j) => (j === index) ? d + 1 : d))}>
      <LuPlus />
    </div>
  </div>
);