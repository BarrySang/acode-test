<script setup>
import { computed } from 'vue'

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['toggle-read'])

const initials = computed(() =>
  props.book.title
    .split(' ')
    .filter((w) => w.length > 0)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')
)
</script>

<template>
  <article class="book" :class="{ read: isRead }">
    <div class="cover" :style="{ background: book.color }">
      <span class="cover-initials">{{ initials }}</span>
      <span v-if="isRead" class="badge">Read</span>
    </div>

    <div class="book-body">
      <p class="genre">{{ book.genre }}</p>
      <h2 class="title">{{ book.title }}</h2>
      <p class="author">{{ book.author }} · {{ book.year }}</p>
      <p class="summary">{{ book.summary }}</p>

      <div class="book-footer">
        <span class="pages">{{ book.pages }} pages</span>
        <button
          type="button"
          class="read-btn"
          :aria-pressed="isRead"
          @click="emit('toggle-read')"
        >
          {{ isRead ? 'Mark unread' : 'Mark as read' }}
        </button>
      </div>
    </div>
  </article>
</template>
