<template>
  <aside>
    <div class="card">
      <h2 class="mx-1 mb-2 text-lg font-semibold text-rose-500">热门问题</h2>

      <div
        v-for="(question, index) in hot_questions"
        :key="question._id"
        class="flex h-9 items-center relative hover:bg-stone-200"
      >
        <router-link :to="{ name: 'QuestionDetail', params: { id: question._id } }">
          <span class="inline-block w-4 text-center mr-4 font-semibold">{{ index + 1 }}</span>
          <span>{{ question.title }}</span>
          <span
            class="inline-block w-7 h-7 bg-stone-200 rounded text-center leading-7 absolute right-0"
          >{{ question.voteCount }}</span>
        </router-link>
      </div>
    </div>
    <div class="card mt-5">
      <h2 class="mx-1 mb-2 text-lg font-semibold text-rose-500">热门文章</h2>
      <div
        v-for="(article, index) in hot_articles"
        :key="article._id"
        class="flex h-9 items-center relative hover:bg-stone-200"
      >
        <router-link :to="{ name: 'ArticleDetail', params: { id: article._id } }">
          <span class="inline-block w-4 text-center mr-4 font-semibold">{{ index + 1 }}</span>
          <span>{{ article.title }}</span>
          <span
            class="inline-block w-7 h-7 bg-stone-200 rounded text-center leading-7 absolute right-0"
          >{{ article.voteCount }}</span>
        </router-link>
      </div>
    </div>
  </aside>
</template>

<script setup>
import useHots from './useHots';
const { hot_questions, hot_articles, fetchHotQuestions, fetchHotArticles } = useHots()
fetchHotQuestions()
fetchHotArticles()
</script>
<style scoped>
.card {
  @apply w-[280px] shadow rounded bg-zinc-50 ml-5 border p-4 text-stone-500;
}
</style>