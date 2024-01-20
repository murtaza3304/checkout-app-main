import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  userFeedback,
  userRating,
  getUserFeedback,
} from '../../redux/actions/Actions';

export default function UseProfileBUserHooks({navigation, route}) {
  // hook
  const dispatch = useDispatch();
  // console.log(route?.params?.cardData, "navigation");

  // store data
  const currentUserData = useSelector(
    store => store?.AuthReducers?.isUserAlreadySignUp,
  );
  const currentUserLoginData = useSelector(store => store?.AuthReducers.user);
  const currentUserRatingData = useSelector(
    store => store?.Reducers.isUserRating,
  );
  const currentUserFeedbackData = useSelector(
    store => store?.Reducers.isUserFeedback,
  );
  const getUserFeedbackData = useSelector(
    store => store?.Reducers.isGetUserFeedback,
  );
  // console.log(getUserFeedbackData,"getUserFeedbackData");
  // console.log(currentUserData?.user, 'currentUserData');
  // console.log(currentUserLoginData, "currentUserLoginData");
  // console.log(currentUserRatingData, "currentUserRatingData");
  // console.log(currentUserFeedbackData, "currentUserFeedbackData");

  // states
  const [isFocusedOne, setIsFocusedOne] = useState(true);
  const [isFocusedTwo, setIsFocusedTwo] = useState(true);
  const [isFocusedThree, setIsFocusedThree] = useState(true);
  const [isFocusedFour, setIsFocusedFour] = useState(true);
  const [isFocusedFive, setIsFocusedFive] = useState(true);
  const [isFocusedSix, setIsFocusedSix] = useState(true);
  const [isFocusedSeven, setIsFocusedSeven] = useState(true);
  const [isFocusedEight, setIsFocusedEight] = useState(true);
  const [isFocusedNine, setIsFocusedNine] = useState(true);
  const [isFocusedTen, setIsFocusedTen] = useState(true);
  const [isFocusedEleven, setIsFocusedEleven] = useState(true);
  const [loading, setLoading] = useState(false);
  const [feedbackInput, setFeedbackInput] = useState('');
  const [feedbackInputError, setFeedbackInputError] = useState('');
  const [feedbackHandlerError, setFeedbackHandlerError] = useState('');
  const [feedbackRating, setFeedbackRating] = useState('');

  // One Handler
  const isFocusedOneHandler = () => {
    setIsFocusedOne(!isFocusedOne);
  };

  // Two Handler
  const isFocusedTwoHandler = () => {
    setIsFocusedTwo(!isFocusedTwo);
  };

  // Three Handler
  const isFocusedThreeHandler = () => {
    setIsFocusedThree(!isFocusedThree);
  };

  // Four Handler
  const isFocusedFourHandler = () => {
    setIsFocusedFour(!isFocusedFour);
  };

  // Five Handler
  const isFocusedFiveHandler = () => {
    setIsFocusedFive(!isFocusedFive);
  };

  // Six Handler
  const isFocusedSixHandler = () => {
    setIsFocusedSix(!isFocusedSix);
  };

  // Seven Handler
  const isFocusedSevenHandler = () => {
    setIsFocusedSeven(!isFocusedSeven);
  };

  // Eight Handler
  const isFocusedEightHandler = () => {
    setIsFocusedEight(!isFocusedEight);
  };

  // Nine Handler
  const isFocusedNineHandler = () => {
    setIsFocusedNine(!isFocusedNine);
  };

  // Ten Handler
  const isFocusedTenHandler = () => {
    setIsFocusedTen(!isFocusedTen);
  };

  // Ten Handler
  const isFocusedElevenHandler = () => {
    setIsFocusedEleven(!isFocusedEleven);
  };

  // rating handler
  const ratingHandler = ratingInput => {
    setFeedbackRating(ratingInput);
    if (currentUserLoginData?._id) {
      let ratingData = {
        userID: currentUserLoginData?._id,
        ratingID: route?.params?.cardData._id,
        ratingValue: ratingInput,
      };
      // console.log(ratingData, "ratingData login");
      dispatch(userRating(ratingData));
    } else {
      let ratingData = {
        userID: currentUserData?.user?._id,
        ratingID: route?.params?.cardData._id,
        ratingValue: ratingInput,
      };
      // console.log(ratingData, "ratingData sign up");
      dispatch(userRating(ratingData));
    }
  };

  // validate feedback
  const validateFeedbackInput = e => {
    setFeedbackInput(e);
    if (e === '') {
      setFeedbackInputError('*Required!');
    } else {
      setFeedbackInputError('');
    }
  };

  // feedback handler
  const feedbackHandler = () => {
    if (!feedbackInput) {
      setFeedbackInputError('*Required!');
      return;
    } else {
      if (feedbackInput && !feedbackInputError) {
        if (currentUserLoginData?._id) {
          let feedbackData = {
            userId: currentUserLoginData?._id,
            feedback: feedbackInput,
            feederId: route?.params?.cardData._id,
            rating: feedbackRating,
          };
          // console.log(feedbackData, "feedbackData login");
          dispatch(
            userFeedback(feedbackData, setLoading, setFeedbackHandlerError),
          );
        } else {
          let feedbackData = {
            userId: currentUserData?.user?._id,
            feedback: feedbackInput,
            feederId: route?.params?.cardData._id,
            rating: feedbackRating,
          };
          // console.log(feedbackData, "feedbackData sign up");
          dispatch(
            userFeedback(feedbackData, setLoading, setFeedbackHandlerError),
          );
        }
      }
    }
    setFeedbackInput('');
  };

  // get feedback handler
  const getFeedbackHandler = (userId, setIsLoading) => {
    dispatch(getUserFeedback(userId, setIsLoading));
  };
  return {
    isFocusedOneHandler,
    isFocusedOne,
    isFocusedTwoHandler,
    isFocusedTwo,
    isFocusedThreeHandler,
    isFocusedThree,
    isFocusedFourHandler,
    isFocusedFour,
    isFocusedFiveHandler,
    isFocusedFive,
    isFocusedSixHandler,
    isFocusedSix,
    isFocusedSevenHandler,
    isFocusedSeven,
    isFocusedEightHandler,
    isFocusedEight,
    isFocusedNineHandler,
    isFocusedNine,
    isFocusedTenHandler,
    isFocusedTen,
    isFocusedElevenHandler,
    isFocusedEleven,
    ratingHandler,
    validateFeedbackInput,
    feedbackInput,
    feedbackHandler,
    loading,
    feedbackInputError,
    feedbackHandlerError,
    currentUserData,
    currentUserLoginData,
    getFeedbackHandler,
    getUserFeedbackData,
    currentUserFeedbackData,
  };
}
