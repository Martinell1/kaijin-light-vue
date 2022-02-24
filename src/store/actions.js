import {getUserDetail} from '@/api/user'

export async function fetchUserInfo ({ commit, state }, id) {
  const params = "locations;education;employments;following;followingTopics;followingArticles;followingQuestions;followingAnswers;likingAnswers;dislikingAnswers;likingQuestions;likingArticles;likingComments;dislikingComments;likingTalks;dislikingTalks"
  const { data: userInfo } = await getUserDetail(id, params)
  commit('setUserInfo',userInfo)
  localStorage.setItem('userInfo',JSON.stringify(userInfo))
}


