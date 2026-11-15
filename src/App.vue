<script setup>
import { ref, computed } from 'vue'
import {
  project,
  steps,
  tools,
  stack,
  timeline,
  bundleRules,
} from './data/project.js'

const activeStep = ref(0)

const currentStep = computed(() => steps[activeStep.value])

const separator = '='.repeat(80)

const sampleBundle = computed(() =>
  [
    separator,
    'FILE: src/App.vue',
    separator,
    '',
    '<script setup> ... full file content ... </scr' + 'ipt>',
    '',
    separator,
    'FILE: src/data/project.js',
    separator,
    '',
    'export const project = { ... }',
  ].join('\n')
)

function nextStep() {
  activeStep.value = (activeStep.value + 1) % steps.length
}

function prevStep() {
  activeStep.value = (activeStep.value - 1 + steps.length) % steps.length
}
</script>

<template>
  <header class="site-header">
    <p class="eyebrow">{{ project.eyebrow }}</p>
    <h1>{{ project.name }}</h1>
    <p class="tagline">{{ project.tagline }}</p>

    <div class="stats">
      <div class="stat">
        <span class="stat-value">{{ steps.length }}</span>
        <span class="stat-label">Workflow steps</span>
      </div>
      <div class="stat">
        <span class="stat-value">{{ tools.length }}</span>
        <span class="stat-label">Custom tools</span>
      </div>
      <div class="stat">
        <span class="stat-value">1</span>
        <span class="stat-label">Phone</span>
      </div>
    </div>
  </header>

  <main class="content">
    <section class="section">
      <h2>What this is</h2>
      <p v-for="(para, i) in project.about" :key="i" class="prose">
        {{ para }}
      </p>
    </section>

    <section class="section">
      <h2>How it works</h2>
      <p class="section-intro">
        Tap a step to see what happens at that stage.
      </p>

      <ol class="steps">
        <li v-for="(step, i) in steps" :key="step.title">
          <button
            type="button"
            class="step"
            :class="{ active: activeStep === i }"
            :aria-pressed="activeStep === i"
            @click="activeStep = i"
          >
            <span class="step-num">{{ i + 1 }}</span>
            <span class="step-title">{{ step.title }}</span>
          </button>
        </li>
      </ol>

      <div class="step-detail">
        <p class="step-where">{{ currentStep.where }}</p>
        <h3>{{ currentStep.title }}</h3>
        <p>{{ currentStep.detail }}</p>
        <div class="step-nav">
          <button type="button" class="chip" @click="prevStep">Previous</button>
          <button type="button" class="chip active" @click="nextStep">
            Next
          </button>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>The tools</h2>
      <div class="grid">
        <article v-for="tool in tools" :key="tool.name" class="card">
          <p class="card-tag">{{ tool.tag }}</p>
          <h3 class="mono">{{ tool.name }}</h3>
          <p>{{ tool.description }}</p>
          <p class="card-io">
            <span class="label">In:</span> <code>{{ tool.input }}</code>
          </p>
          <p class="card-io">
            <span class="label">Out:</span> <code>{{ tool.output }}</code>
          </p>
        </article>
      </div>
    </section>

    <section class="section">
      <h2>The bundle format</h2>
      <p class="section-intro">
        Every file in a bundle sits under a header like this:
      </p>
      <pre class="code-sample">{{ sampleBundle }}</pre>
      <ul class="rules">
        <li v-for="rule in bundleRules" :key="rule">{{ rule }}</li>
      </ul>
    </section>

    <section class="section">
      <h2>Built with</h2>
      <div class="chips">
        <span v-for="item in stack" :key="item" class="chip static">
          {{ item }}
        </span>
      </div>
    </section>

    <section class="section">
      <h2>Project history</h2>
      <ol class="timeline">
        <li v-for="entry in timeline" :key="entry.title" class="timeline-item">
          <p class="timeline-label">{{ entry.label }}</p>
          <h3>{{ entry.title }}</h3>
          <p>{{ entry.detail }}</p>
        </li>
      </ol>
    </section>
  </main>

  <footer class="site-footer">
    <p>{{ project.footer }}</p>
  </footer>
</template>
