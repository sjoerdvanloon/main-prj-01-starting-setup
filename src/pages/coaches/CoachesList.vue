<template>
  <div>
    <base-dialog :show="!!error" title="An error occured" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section><coach-filter @change-filter="setFilters"></coach-filter></section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="refresh">Refresh</base-button
          ><base-button link to="/register" v-if="!isCoach && !isLoading"
            >Register as coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          >
          </coach-item>
        </ul>
        <h3 v-else>No coaches yet</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from './../../components/coaches/CoachItem.vue';
import CoachFilter from './../../components/coaches/CoachFilter.vue';

export default {
  components: {
    CoachItem,
    CoachFilter,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilter: { frontend: true, backend: true, career: true },
    };
  },
  computed: {
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];
      //return coaches;
      return coaches.filter((c) => {
        if (this.activeFilter.frontend && c.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilter.backend && c.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilter.career && c.areas.includes('career')) {
          return true;
        }

        return false;
      });
    },
    hasCoaches() {
      //console.log('hasCoaches');

      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
  },
  methods: {
    handleError() {
      console.log('handleError');
      this.error = null;
    },
    async refresh() {
      this.loadCoaches(true);
    },
    async loadCoaches(forceRefresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches', {
          forceRefresh: forceRefresh,
        });
      } catch (error) {
        console.log(error);
        this.error = error.message || 'Somethine went wrong';
      }
      this.isLoading = false;
    },

    setFilters(updatedFilter) {
      //console.log('setFilters', updatedFilter);
      this.activeFilter = updatedFilter;
    },
  },
  created() {
    this.loadCoaches(false);

    //console.warn('KOEENENE', this.$axios.get('fskfds'));
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>