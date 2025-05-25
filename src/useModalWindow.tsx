import { createPortal } from 'react-dom';

const useModalWindow = () => {
  return createPortal(<div></div>, document.body);
};

export default useModalWindow;
