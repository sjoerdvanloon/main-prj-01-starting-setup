<template>
  <div>
    <section>
      <base-card
        ><h2>{{ fullName }}</h2>

        <h3>${{ rate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Intrested? Reach out now</h2>
          <base-button link :to="contactLink">Contact</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-badge>
        <p>{{ description }}</p></base-card
      >
    </section>
  </div>
</template>
<script>
// import ProductItem from '../components/products/ProductItem.vue';
// import { mapGetters } from 'vuex';

export default {
  components: {},
  props: ['id'],
  data() {
    return { selectedCoach: null };
  },
  computed: {
    fullName() {
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
    },
    description() {
      return this.selectedCoach.description;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    areas() {
      return this.selectedCoach.areas;
    },
    contactLink() {
      return '/coaches/' + this.id + '/contact';
    },
    // ...mapGetters('products', ['products']),
  },
  created() {
    console.log('created', this.id);
    this.selectedCoach = this.$store.getters['coaches/coaches'].find(
      (c) => c.id === this.id
    );
  },
};
</script>