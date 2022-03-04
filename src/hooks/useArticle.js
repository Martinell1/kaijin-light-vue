import { ref } from 'vue';
import { getArticles } from '@/api/article'
import { getArticleDetail } from '@/api/article'

export default function useArticle(){
  const article_detail = ref({})

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

  const setArticlePage = ()=>{
    page = 1
  }

  return { article_list, article_detail,fetchArticles, fetchArticleDetail,setArticlePage }
}
