import {
  CREATE_POST,
  GET_ALL_POSTS,
  SOCKET_LIKES,
  GET_MY_ALL_POSTS,
  GET_MY_ALL_BOOKMARKS,
  GET_USER_BOOKMARKS,
  DELETE_USER_POST,
  UPDATE_POST,
  SPAM_POST,
  SPAM_USER,
  GET_COMMENT_POST,
  INNER_COMMENT_LIKE,
  SEARCH_POST,
  SHARE_POST,
  GET_FEED_PREFERENCES,
  ADD_FEED_PREFERENCES,
  POSTING,
  GET_BOOST_POST,
  GET_ALL_POST_LIKES,
  LOGOUT_USER,
} from '../types/ActionsTypes';

// initial state
const initialState = {
  isCreatePostUser: null,
  isGetAllPostsUser: [],
  isGetUserBookmarks: null,
  spamPost: null,
  spamUser: null,
  isFeedPreferences: null,
  isAddFeedPreferences: null,
  isPosting: false,
  isGetBoostPosts: null,
  isGetAllPostLikes: [],
};

export default function PostsReducers(state = initialState, action) {
  switch (action.type) {
    // create posts User
    case CREATE_POST:
      // console.log(action?.payload, "my data in reducers");
      return {
        ...state,
        isGetAllPostsUser: [action?.payload, ...state?.isGetAllPostsUser],
      };

    // update post
    case UPDATE_POST:
      // console.log(action?.payload, 'my data in reducers');
      const updateData = state?.isGetAllPostsUser?.map(post => {
        if (post?._id === action?.payload?._id) {
          return action?.payload;
        } else {
          return post;
        }
      });
      return {
        ...state,
        isGetAllPostsUser: updateData,
      };

    // get all posts User
    case GET_ALL_POSTS:
      // console.log(action?.payload?.data, 'my data in reducers');
      if (action?.payload?.page == 1) {
        return {
          ...state,
          isGetAllPostsUser: action?.payload?.data,
        };
      } else {
        let allData = [];
        const updatePostsData = action?.payload?.data?.map(post => {
          const isPostAlreadyAdded = state?.isGetAllPostsUser?.some(
            item => item?._id === post?._id,
          );
          if (!isPostAlreadyAdded) {
            allData.push(post);
          }
        });
        return {
          ...state,
          isGetAllPostsUser: [...state?.isGetAllPostsUser, ...allData],
        };
      }

    // get all posts User
    case GET_MY_ALL_POSTS:
      if (action?.payload?.page == 1) {
        let allData = [];
        const updatePostsData = action?.payload?.data?.map(post => {
          const isPostAlreadyAdded = state?.isGetAllPostsUser?.some(
            item => item?._id === post?._id,
          );
          if (!isPostAlreadyAdded) {
            allData.push(post);
          }
        });
        return {
          ...state,
          isGetAllPostsUser: [...state?.isGetAllPostsUser, ...allData],
        };
      } else {
        let allData = [];
        const updatePostsData = action?.payload?.data?.map(post => {
          const isPostAlreadyAdded = state?.isGetAllPostsUser?.some(
            item => item?._id === post?._id,
          );
          if (!isPostAlreadyAdded) {
            allData.push(post);
          }
        });
        return {
          ...state,
          isGetAllPostsUser: [...state?.isGetAllPostsUser, ...allData],
        };
      }

    // get all bookmark User
    case GET_MY_ALL_BOOKMARKS:
      // console.log(action?.payload, "action?.payload");
      if (action?.payload?.isBookmarked) {
        const updatePosts = state?.isGetAllPostsUser?.map(post => {
          if (post?._id === action?.payload?.saveId) {
            return {
              ...post,
              bookmarks: [action?.payload?.userId, ...post?.bookmarks],
            };
          }
          return post;
        });
        return {
          ...state,
          isGetAllPostsUser: updatePosts,
        };
      } else {
        const updatePosts = state?.isGetAllPostsUser?.map(post => {
          if (post?._id === action?.payload?.saveId) {
            let removeId = post?.bookmarks?.filter(
              l => l !== action?.payload?.userId,
            );
            return {
              ...post,
              bookmarks: removeId,
            };
          }
          return post;
        });
        return {
          ...state,
          isGetAllPostsUser: updatePosts,
        };
      }

    // get user bookmark
    case GET_USER_BOOKMARKS:
      if (action?.payload?.page == 1) {
        let allBookmarks = [];
        const updateBookmarkData = action?.payload?.data?.map(post => {
          const isPostAlreadyAdded = state?.isGetAllPostsUser?.some(
            item => item?._id === post?._id,
          );
          if (!isPostAlreadyAdded) {
            allBookmarks?.push(post);
          }
        });
        return {
          ...state,
          isGetAllPostsUser: [...state?.isGetAllPostsUser, ...allBookmarks],
        };
      } else {
        let allBookmarks = [];
        const updateBookmarkData = action?.payload?.data?.map(post => {
          const isPostAlreadyAdded = state?.isGetAllPostsUser?.some(
            item => item?._id === post?._id,
          );
          if (!isPostAlreadyAdded) {
            allBookmarks?.push(post);
          }
        });
        return {
          ...state,
          isGetAllPostsUser: [...state?.isGetAllPostsUser, ...allBookmarks],
        };
      }

    // delete post user
    case DELETE_USER_POST:
      // console.log(action?.payload?._id,"delete post id");
      const updatedPosts = state?.isGetAllPostsUser?.filter(
        item => item?._id !== action?.payload?._id,
      );
      // console.log(updatedPosts,"updatedPosts");
      return {
        ...state,
        isGetAllPostsUser: updatedPosts,
      };

    // get comment post
    case GET_COMMENT_POST:
      // console.log(action?.payload, "action?.payload");
      if (action?.payload?.parentComment) {
        const updatedPosts = state?.isGetAllPostsUser?.map(post => {
          if (post?._id === action?.payload?.postId) {
            const updatedComments = post?.comments?.map(comment => {
              if (comment?._id === action?.payload?.parentComment) {
                return {
                  ...comment,
                  replyComments: [
                    ...comment?.replyComments,
                    {...action?.payload},
                  ],
                };
              }
              return comment; // Return the comment as is if it doesn't match the parentComment ID
            });
            return {
              ...post,
              comments: updatedComments,
            };
          }
          return post; // Return the post as is if it doesn't match the postId
        });

        // Now you need to return the updatedPosts array to update the Redux state.
        return {
          ...state,
          isGetAllPostsUser: updatedPosts,
        };
      } else {
        // ... The rest of your code for handling the else case remains the same.
        const updatedPosts = state?.isGetAllPostsUser?.map(item => {
          if (item?._id === action?.payload?.postId) {
            // Create a new copy of the post object with updated comments
            return {
              ...item,
              comments: [...item?.comments, {...action?.payload}],
            };
          }
          return item;
        });

        // Return a new state object with the updated posts array
        // console.log(updatedPosts, "updatedPosts");
        return {
          ...state,
          isGetAllPostsUser: [...updatedPosts],
        };
      }

    // spam post
    case SPAM_POST:
      return {
        ...state,
        spamPost: action?.payload,
      };

    // spam user
    case SPAM_USER:
      return {
        ...state,
        spamUser: action?.payload,
      };

    // socket like
    case SOCKET_LIKES:
      // console.log(action?.payload, 'action?.payload');
      if (action?.payload?.isLiked) {
        const updatedPosts = state?.isGetAllPostsUser?.map(post => {
          if (post?._id === action?.payload?.postId) {
            let newlikeId = [...post?.likes, {_id: action?.payload?.userId}];
            return {
              ...post,
              likes: newlikeId,
            };
          }
          return post;
        });

        return {
          ...state,
          isGetAllPostsUser: updatedPosts,
        };
      } else {
        const updatedPosts = state?.isGetAllPostsUser?.map(post => {
          if (post?._id === action?.payload?.postId) {
            let isNewLike = post?.likes?.filter(
              l => l?._id !== action?.payload?.userId,
            );
            return {
              ...post,
              likes: isNewLike,
            };
          }
          return post;
        });

        return {
          ...state,
          isGetAllPostsUser: updatedPosts,
        };
      }

    case INNER_COMMENT_LIKE:
      // console.log(action?.payload,"action?.payload INNER_COMMENT_LIKE");
      if (action?.payload?.isLiked) {
        const updatedPosts = state?.isGetAllPostsUser?.map(item => {
          if (item?._id === action?.payload?.postId) {
            const updatedComments = item?.comments?.map(comment => {
              if (comment?._id === action?.payload?.commentId) {
                return {
                  ...comment,
                  likes: [...comment?.likes, action?.payload?.userId],
                };
              } else {
                const replyComment = comment?.replyComments?.map(item => {
                  if (item?._id === action?.payload?.commentId) {
                    return {
                      ...item,
                      likes: [...item?.likes, action?.payload?.userId],
                    };
                  }
                  return item;
                });
                return {
                  ...comment,
                  replyComments: replyComment,
                };
              }
            });
            return {
              ...item,
              comments: updatedComments,
            };
          }
          return item;
        });

        return {
          ...state,
          isGetAllPostsUser: updatedPosts,
        };
      } else {
        const updatedPosts = state?.isGetAllPostsUser?.map(post => {
          if (post?._id === action?.payload?.postId) {
            const updatedComments = post?.comments?.map(comment => {
              if (comment?._id === action?.payload?.commentId) {
                let isUperLike = comment?.likes?.filter(
                  item => item !== action?.payload?.userId,
                );
                return {
                  ...comment,
                  likes: isUperLike,
                };
              } else {
                const replyComment = comment?.replyComments?.map(item => {
                  if (item?._id === action?.payload?.commentId) {
                    let isNewLike = item?.likes?.filter(
                      item => item !== action?.payload?.userId,
                    );
                    return {
                      ...item,
                      likes: isNewLike,
                    };
                  }
                  return item;
                });
                return {
                  ...comment,
                  replyComments: replyComment,
                };
              }
            });
            return {
              ...post,
              comments: updatedComments,
            };
          }
          return post;
        });

        return {
          ...state,
          isGetAllPostsUser: updatedPosts,
        };
      }

    // SEARCH POST
    case SEARCH_POST:
      if (action?.payload?.page == 1) {
        let allSearchsPosts = [];
        const updateSearchData = action?.payload?.data?.map(post => {
          const isPostAlreadyAdded = state?.isGetAllPostsUser?.some(
            item => item?._id === post?._id,
          );
          if (!isPostAlreadyAdded) {
            allSearchsPosts?.push(post);
          }
        });
        return {
          ...state,
          isGetAllPostsUser: [...state?.isGetAllPostsUser, ...allSearchsPosts],
        };
      } else {
        let allSearchsPosts = [];
        const updateSearchData = action?.payload?.data?.map(post => {
          const isPostAlreadyAdded = state?.isGetAllPostsUser?.some(
            item => item?._id === post?._id,
          );
          if (!isPostAlreadyAdded) {
            allSearchsPosts?.push(post);
          }
        });
        return {
          ...state,
          isGetAllPostsUser: [...state?.isGetAllPostsUser, ...allSearchsPosts],
        };
      }

    // share post
    case SHARE_POST:
      return {
        ...state,
        isGetAllPostsUser: [action?.payload, ...state?.isGetAllPostsUser],
      };

    // feed preferences
    case GET_FEED_PREFERENCES:
      return {
        ...state,
        isFeedPreferences: action?.payload,
      };

    // add ADD_FEED_PREFERENCES
    case ADD_FEED_PREFERENCES:
      return {
        ...state,
        isAddFeedPreferences: action?.payload,
      };

    // is posting
    case POSTING:
      return {
        ...state,
        isPosting: action?.payload,
      };

    // is get boost posts
    case GET_BOOST_POST:
      return {
        ...state,
        isGetBoostPosts: action?.payload,
      };

    // get all post likes
    case GET_ALL_POST_LIKES:
      if (action?.payload?.page == 1) {
        return {
          ...state,
          isGetAllPostLikes: action?.payload?.data,
        };
      } else {
        let allLikes = [];
        const updateLikesData = action?.payload?.data?.map(like => {
          const isLikeAlreadyAdded = state?.isGetAllPostLikes?.some(
            item => item?._id === like?._id,
          );
          if (!isLikeAlreadyAdded) {
            allLikes?.push(like);
          }
        });
        return {
          ...state,
          isGetAllPostLikes: [...state?.isGetAllPostLikes, ...allLikes],
        };
      }

    // User Logout
    case LOGOUT_USER:
      return initialState;

    default:
      return state;
  }
}
