import { ref } from 'vue';
import { getHotQuestions } from '@/api/question'
import { getHotArticles } from '@/api/article'

export default function useHots(){
  const hot_questions = ref([])
  const hot_articles = ref([])

  const fetchHotQuestions = async()=>{
    const {data:result} = await getHotQuestions()
    hot_questions.value = result
  }

  const fetchHotArticles = async()=>{
    const {data:result} = await getHotArticles()
    hot_articles.value = result
  }


  return { hot_questions, hot_articles, fetchHotQuestions,fetchHotArticles }
}
