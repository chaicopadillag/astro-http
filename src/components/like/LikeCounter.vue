<template>
  <div>
    <h2 v-if="isLoading">Loading...</h2>
    <button v-else-if="likeCount === 0" type="button" @click="likeCounter">
      Like
      <span>Sin Likes </span>
    </button>
    <button v-else type="button" @click="likeCounter">
      Like
      <span>{{ likeCount }} </span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { actions } from 'astro:actions';
import debounce from 'lodash.debounce';
import { ref, watch } from 'vue';

const { postId } = defineProps<{ postId: string }>();

const likeCount = ref(0);
const likeClicks = ref(0);
const isLoading = ref(false);

const likeCounter = () => {
  likeCount.value++;
  likeClicks.value++;
  console.log('Like button clicked', likeClicks.value);
};

const updatedLike = async (likes: number) => {
  console.log('Like count changed', likes);

  const { data, error } = await actions.updatePostLikes({ postId, likes });

  if (error) {
    console.error('Error updating post likes', error);
    return;
  }

  console.log('Post likes updated', data);
};

watch(
  likeCount,
  debounce(async () => {
    await updatedLike(likeClicks.value);
    likeClicks.value = 0;
  }, 500)
);

const getPostLikes = async (postId: string) => {
  const { data, error } = await actions.getLikesPost({
    postId
  });

  if (error) {
    console.error('Error getting post likes', error);
    return;
  }

  likeCount.value = data.likes;
  isLoading.value = false;
};

getPostLikes(postId);
</script>

<style scoped>
button {
  background-color: #007bff;
  color: white;
  padding: 10px 24px;
  cursor: pointer;
  border-radius: 5px;
}
</style>
