import Head from 'next/head';
import FddBtn from '@/components/buttons/fddBtn.js';
import DefaultLayout from '@/components/layout/default'
import { useState } from 'react'
import { DiApple } from 'react-icons/di';
import { IconContext } from 'react-icons';
import Modal from '@/components/common/modal';

export default function galleryModal() {
  /**
   * @type {boolean[]} Whether modal is active
   */
  const initState = Array(5).fill(false);
  const [modalState, setModalState] = useState(initState);
  const gene = index => {
    const arr = [false, false, false, false, false];
    arr[index] = true;
    return arr;
  }
  return (
    <>
      <Head>
        <title>Modal 圖鑑 | 翻肚肚元件</title>
      </Head>
      <div className="container">
        <div className="row jc-center">
          <div className="col-12 col-lg-6">
            <h2>彈出式視窗</h2>
            <p>點擊下列按鈕以啟動 modal</p>
            <div>
              <FddBtn color="primary" outline icon callback={() => setModalState(gene(0))}>
                <IconContext.Provider value={{ size: '2.5rem' }}>
                  <DiApple />
                </IconContext.Provider>
              </FddBtn>
              <FddBtn color="primary" outline icon callback={() => setModalState(gene(3))}>
                <IconContext.Provider value={{ size: '2.5rem' }}>
                  <DiApple />
                </IconContext.Provider>
              </FddBtn>
            </div>
          </div>
        </div>
      </div>
      <Modal
        mode={1}
        active={modalState[0]}
        onClose={() => setModalState(initState)}
      >
        <h1>確認成功！</h1>
        <span>拉不拉多拉不拉多拉布拉布拉布拉布拉布拉布拉布拉不拉多拉布拉布拉布拉布拉布拉布拉不拉多拉布拉布拉布拉布拉布拉不拉多拉布拉布拉布拉布拉不拉多拉布拉布拉布拉</span>
      </Modal>
      <Modal
        mode={2}
        active={modalState[3]}
        onClose={() => setModalState(initState)}
        confirmText='確定'
        cancelText='算了'
      >
        <h1>你確定這樣的行為是正確的嗎？</h1>
        <p>拉不拉多拉不拉多拉布拉布拉布拉布拉布拉布拉布拉不拉多拉布拉布拉布拉布拉布拉布拉不拉多拉布拉布拉布拉布拉布拉不拉多拉布拉布拉布拉布拉不拉多拉布拉布拉布拉</p>
      </Modal>
    </>
  )
}

galleryModal.layout = DefaultLayout;
