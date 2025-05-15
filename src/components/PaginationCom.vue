<script>
import { mapState, mapActions } from 'pinia';
import paginationStore from '@/stores/paginationStore';

export default {
    computed: {
        ...mapState(paginationStore, ['currentPage', 'totalPage', 'nowPageStore'])
    },
    methods: {
        ...mapActions(paginationStore, ['switchPage'])
    },
};
</script>
<template>
    <div class="pageNavigation">
        <ul class="pagination">
          <li class="page-item" :class="{'disabled': currentPage === 1 || totalPage === 0 }">
            <a href="#" @click.prevent="switchPage(currentPage-1)">Previous</a>
          </li>
          <li class="page-item" v-for="(page , key) in totalPage" :key="'page'+ key" :class= "{'active': currentPage === page }" >
            <a href="#" @click.prevent="switchPage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{'disabled': currentPage === totalPage || totalPage === 0}">
            <a href="#" @click.prevent="switchPage(currentPage+1)">Next</a>
          </li>
        </ul>
      </div>
</template>
