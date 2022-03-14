import { ref } from 'vue';
import { getArticles,getArticleDetail,getArticlesByFolow ,getRecommandArticles} from '@/api/article'

export default function useArticle(){
  const article_detail = ref({
    title:'',
    description:'',
    content:'',
    avatar_url:'',
    topics:[]
  })

  const fetchArticleDetail = async (id) => {
    const { data: result } = await getArticleDetail(id)
    article_detail.value = result
  }

  const article_list = ref([])
  let page = 1
  const fetchArticles = async (per_page,q) => {
    const { data: result } = await getArticles(per_page, page++,q)
    article_list.value = [...article_list.value, ...result]
  }

  const fetchArticlesByFolow = async (per_page) => {
    const { data: result } = await getArticlesByFolow(per_page, page++)
    article_list.value = [...article_list.value, ...result]
  }
  const fetchRecommandArticles = async(per_page) => {
    const { data: result } = await getRecommandArticles(per_page, page++)
    article_list.value = [...article_list.value, ...result]
  }

  const setArticlePage = ()=>{
    article_list.value = []
    page = 1
  }



  return { article_list, article_detail,fetchArticles,fetchArticlesByFolow,fetchRecommandArticles, fetchArticleDetail,setArticlePage }
}
