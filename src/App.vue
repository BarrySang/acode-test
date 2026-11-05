<script setup>
import { ref, computed } from 'vue'
import BookCard from './components/BookCard.vue'
import { books } from './data/books.js'

const search = ref('')
const activeGenre = ref('All')
const readIds = ref(new Set())

const genres = computed(() => {
  const set = new Set(books.map((b) => b.genre))
  return ['All', ...Array.from(set).sort()]
})

const filteredBooks = computed(() => {
  const q = search.value.trim().toLowerCase()
  return books.filter((b) => {
    const matchesGenre =
      activeGenre.value === 'All' || b.genre === activeGenre.value
    const matchesSearch =
      q === '' ||
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q)
    return matchesGenre && matchesSearch
  })
})

const readCount = computed(() => readIds.value.size)

const totalPagesRead = computed(() =>
  books
    .filter((b) => readIds.value.has(b.id))
    .reduce((sum, b) => sum + b.pages, 0)
)

function toggleRead(id) {
  const next = new Set(readIds.value)
  if (next.has(id)) {
    next.delete(id)
  } else {
    next.add(id)
  }
  readIds.value = next
}

function clearFilters() {
  search.value = ''
  activeGenre.value = 'All'
}
</script>

<template>
  <header class="site-header">
    <p class="eyebrow">My Reading List</p>
    <h1>The Bookshelf</h1>
    <p class="tagline">
      A small collection of classics and modern favourites. Tap a book to mark
      it as read.
    </p>

    <div class="stats">
      <div class="stat">
        <span class="stat-value">{{ books.length }}</span>
        <span class="stat-label">Books</span>
      </div>
      <div class="stat">
        <span class="stat-value">{{ readCount }}</span>
        <span class="stat-label">Read</span>
      </div>
      <div class="stat">
        <span class="stat-value">{{ totalPagesRead.toLocaleString() }}</span>
        <span class="stat-label">Pages read</span>
      </div>
    </div>
  </header>

  <section class="controls">
    <input
      v-model="search"
      type="search"
      class="search"
      placeholder="Search by title or author"
      aria-label="Search books"
    />
    <div class="genres" role="group" aria-label="Filter by genre">
      <button
        v-for="genre in genres"
        :key="genre"
        type="button"
        class="chip"
        :class="{ active: activeGenre === genre }"
        @click="activeGenre = genre"
      >
        {{ genre }}
      </button>
    </div>
  </section>

  <main class="shelf">
    <div v-if="filteredBooks.length" class="grid">
      <BookCard
        v-for="book in filteredBooks"
        :key="book.id"
        :book="book"
        :is-read="readIds.has(book.id)"
        @toggle-read="toggleRead(book.id)"
      />
    </div>

    <div v-else class="empty">
      <p>No books match your search.</p>
      <button type="button" class="chip active" @click="clearFilters">
        Clear filters
      </button>
    </div>
  </main>

  <footer class="site-footer">
    <p>Built with Vue + Vite</p>
  </footer>
</template>
