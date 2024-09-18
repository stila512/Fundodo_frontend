import FddBtn from '@/components/buttons/fddBtn'
import { useShip711StoreCallback } from '@/hooks/use-ship711'

export default function Callback() {
  // 呼叫回送到母視窗用的勾子函式
  useShip711StoreCallback()

  //以下為保險機制，在自動關閉功能出意外時供手動使用
  return (
    <>
      <div className="d-flex j-c-center">
        <div className="d-flex flex-c">
          <p className="tx-center">
            <FddBtn
              color='primary'
              size='lg'
              callback={() => window.close()}
            >
              關閉視窗
            </FddBtn>
          </p>
        </div>
      </div>
    </>
  )
}

// 去除上下選單的版型，套用layout用
Callback.getLayout = function (page) {
  return (
    <main className="flex-shrink-0 mt-3">
      <div className="container-fluid m-0 p-0">{page}</div>
    </main>
  )
}