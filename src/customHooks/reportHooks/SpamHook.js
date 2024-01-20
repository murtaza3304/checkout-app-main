import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { spamPost, spamUser } from "../../redux/actions/PostAction";

export default function SpamHook({ navigation, route }) {
    const dispatch = useDispatch();
    // console.log(route?.params?.postCardData, "navigation post data");

    // store
    const currentSpamPostData = useSelector((store) => store?.PostsReducers?.spamPost);
    const currentSpamUserData = useSelector((store) => store?.PostsReducers?.spamUser);
    // console.log(currentSpamPostData,"currentSpamPostData");
    // console.log(currentSpamUserData, "currentSpamUserData");

    const [postInput, setPostInput] = useState('')
    const [postInputError, setPostInputError] = useState('')
    const [onSpamHandlerError, setOnSpamHandlerError] = useState('')
    const [loading, setLoading] = useState(false)


    // validate text
    const validatePostText = e => {
        setPostInput(e)
        if (e === '') {
            setPostInputError('*Required!')
        } else {
            setPostInputError('')
        }
    }

    const onSpamHandler = () => {
        if (!postInput) {
            setPostInputError('*Required!')
            return
        } else {
            if (postInput && !postInputError) {
                if (route?.params?.postCardData?.scammerId) {
                    let newSpamData = {
                        label: route?.params?.postCardData?.label,
                        heading: route?.params?.postCardData?.heading,
                        description: postInput,
                        scammerId: route?.params?.postCardData?.scammerId,
                        reporterId: route?.params?.postCardData?.reporterId
                    }
                    // console.log(newSpamData,"newSpamData");
                    dispatch(spamPost(newSpamData, setLoading, navigation, setOnSpamHandlerError))
                } else {
                    let newSpamData = {
                        label: route?.params?.postCardData?.label,
                        heading: route?.params?.postCardData?.heading,
                        description: postInput,
                        reportedUser: route?.params?.postCardData?.reportedUser,
                        reporterId: route?.params?.postCardData?.reporterId
                    }
                    // console.log(newSpamData,"newSpamData");
                    dispatch(spamUser(newSpamData, setLoading, navigation, setOnSpamHandlerError))
                }
            }
        }
        setPostInput('')
    }
    return {
        postInput,
        postInputError,
        validatePostText,
        onSpamHandlerError,
        loading,
        onSpamHandler
    }
}