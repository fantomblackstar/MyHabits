import { useEffect, useState } from 'react';
import { HashRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Header from './components/Header/Header';
import MyModal from './components/MyModal/MyModal';
import { MyContext } from './context';
import { getDataDb, getHabitsDataDb } from './db/firebase';
import './styles/App.css'

function App() {
  const [userUid, setUserUid] = useState(window.localStorage.getItem('myHabitsUserUid'))
  const [isLight, setIsLight] = useState(false)
  const [habitsObj, setHabitsObj] = useState({})
  const [allFolders, setAllFolders] = useState([])
  const [showPreloader, setShowPreloader] = useState(true)
  const [modal, setModal] = useState({ visible: false, modalCtx: null })
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    if (!!userUid) getUserInfo()
  }, [userUid])

  async function getUserInfo() {
    setHabitsObj(await getHabitsDataDb(userUid))
    const {allFolders, email} = await  getDataDb(`Users/${userUid}`)
    setAllFolders(allFolders)
    setUserEmail(email)
    setShowPreloader(false)
  }

  return (
    <MyContext.Provider value={{
      userUid, setUserUid,
      isLight, setIsLight,
      habitsObj, setHabitsObj,
      allFolders, setAllFolders,
      modal, setModal,
      showPreloader,
      userEmail, setUserEmail
    }}>
      <HashRouter>
        <Header />
        <AppRouter isAuth={userUid} />
        <MyModal>
          {modal.modalCtx}
        </MyModal>
      </HashRouter>
    </MyContext.Provider>
  );
}

export default App;
