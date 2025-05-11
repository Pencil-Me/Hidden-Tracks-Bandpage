<template>
  <SimpleModal size="sm" title="Test modal">
    <template #footer>
      <button class="btn btn-primary" @click="confirmModal({ value: 'some values' })">
        Confirm
      </button>
      <button class="btn btn-primary" @click="closeModal()">Close</button>
    </template>
  </SimpleModal>
</template>

<script lang="ts" setup>
/* ─────────────────────────────
 * Imports
 * ───────────────────────────── */
import { closeModal, confirmModal, SimpleModal } from '@kolirt/vue-modal';
</script>
