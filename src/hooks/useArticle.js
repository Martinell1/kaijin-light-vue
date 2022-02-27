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

  const fetchArticles = async (per_page, page) => {
    const { data: result } = await getArticles(per_page, page)
    article_list.value = [...article_list.value, ...result]
  }

  return { article_list, article_detail,fetchArticles, fetchArticleDetail }
}
