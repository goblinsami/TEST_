<template>
  <section @click="alert = true" style="width: 200px">
    <article class="row justify-center">
    <div :style="imgUrl(player, '100')" class="q-mr-md col-12" />
    <div class="col-12 text-center row justify-center">
      <span class="col-12"> {{ player.name }}</span>
      <span class="text-bold col-12">  {{ player.sign }}</span>
    </div>
    </article>

    <q-dialog v-model="alert">
      <q-card class="row q-pa-lg bg-info justify-center" style="width: 300px">
        <q-card-section>
          <div class="text-h6 text-secondary">{{ player.name }}</div>
        </q-card-section>

        <q-card-section class="q-mt-md" align="center">
          <div :style="imgUrl(player, '200')" class="q-mb-md" />
          <div class="text-h6 text-secondary">{{ player.birthday }}</div>
          <div class="text-h6 text-primary">{{ player.sign }}</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="secondary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </section>
</template>

<script>
export default {
  name: "Player",

  data() {
    return {
      alert: false,
    };
  },
  props: {
    player: {
      type: Object,
      default: () => ({}),
    },
  },

  methods: {
    imgUrl(url, size) {
      return `width: ${size}px; height: ${size}px; border-radius: 50%; background-image: url(${url.image}); background-size: cover`;
    },
  },
};
</script>

<style></style>
