import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../../redux/actions/AuthActions';
import {socket} from '../../../config';

export default function UseLogoutHook() {
  const dispatch = useDispatch();

  // Store Data
  const currentUserData = useSelector(
    store => store?.AuthReducers?.isUserLogout,
  );
  const currentLoginUserData = useSelector(store => store?.AuthReducers?.user);
  // console.log(currentUserData, "currentUserData in hook");

  useEffect(() => {
    setSuccessMessage(currentUserData);
  }, [currentUserData]);

  // states
  const [loading, setLoading] = useState(false);
  const [logoutHanldeError, setLogoutHanldeError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  // console.log(successMessage,"successMessage");

  // logout handler
  const onLogoutHandler = () => {
    setLogoutHanldeError('');
    socket.emit('logout', currentLoginUserData?._id);
    let newData = {
      userId: currentLoginUserData?._id,
    };
    dispatch(logoutUser(newData, setLoading, setLogoutHanldeError));
  };
  return {
    onLogoutHandler,
    logoutHanldeError,
    loading,
    currentLoginUserData,
  };
}
