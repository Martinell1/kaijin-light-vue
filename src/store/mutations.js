const mutations = {
  setUserInfo(state,userInfo){
    state.userInfo = JSON.stringify(userInfo)
  },
  setId(state,id){
    state.userInfo.id = id
  },
  setNickname(state,nickname){
    state.userInfo.nickname = nickname
  },
  setGender(state,gender){
    state.userInfo.gender = gender
  },
  setHeadline(state,headline){
    state.userInfo.headline = headline
  },
  setAvatarUrl(state,avatar_url){
    state.userInfo.avatar_url = avatar_url
  },
  setLocations(state,locations){
    state.userInfo.locations = locations
  },
  setEmployments(state,employments){
    state.userInfo.employments = employments
  },
  setEducation(state,education){
    state.userInfo.education = education
  },
  setFollowings(state,followings){
    state.userInfo.followings = followings
  },
  setFollowingTopics(state,followingTopics){
    state.userInfo.followingTopics = followingTopics
  },
  setFollowingArticles(state,followingArticles){
    state.userInfo.followingArticles = followingArticles
  },
  setFollowingQuestions(state,followingQuestions){
    state.userInfo.followingQuestions = followingQuestions
  },
  setFollowingAnswers(state,followingAnswers){
    state.userInfo.followingAnswers = followingAnswers
  },
  setLikingAnswers(state,likingAnswers){
    state.userInfo.likingAnswers = likingAnswers
  },
  setLikingQuestions(state,likingQuestions){
    state.userInfo.likingQuestions = likingQuestions
  },
  setLikingArticles(state,likingArticles){
    state.userInfo.likingArticles = likingArticles
  },
  setLikingComments(state,likingComments){
    state.userInfo.likingComments = likingComments
  },
  setLikingTalks(state,likingTalks){
    state.userInfo.likingTalks = likingTalks
  },
  setLikingMoments(state,likingMoments){
    state.userInfo.likingMoments = likingMoments
  },

}

export default mutations