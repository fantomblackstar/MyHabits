import { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Header from './components/Header/Header';
import MyModal from './components/MyModal/MyModal';
import { MyContext } from './context';
import './styles/App.css'

function App() {
  const [userUid, setUserUid] = useState('')
  const [isLight, setIsLight] = useState(false)
  const [habitsObj, setHabitsObj] = useState({})
  const [allFolders, setAllFolders] = useState([])
  const [modal, setModal] = useState({ visible: false, modalCtx: null })

  return (
    <MyContext.Provider value={{
      userUid,
      setUserUid,
      isLight,
      setIsLight,
      habitsObj,
      setHabitsObj,
      allFolders,
      setAllFolders,
      modal,
      setModal
    }}>
      <HashRouter>
        <Header />
        <AppRouter isAuth={userUid}/> 
        <MyModal>
          {modal.modalCtx}
        </MyModal>
      </HashRouter>
    </MyContext.Provider>
  );
}

export default App;
