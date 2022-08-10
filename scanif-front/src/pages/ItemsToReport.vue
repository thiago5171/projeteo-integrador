<template>
  <q-page padding>
    <q-card>
      <q-card-section class="q-mt-xl">
        <div class="text-h6 text-center text-black">
          <p>
            Items do SIPAC que ainda não foram localizados no processo de
            inventário
          </p>
        </div>
      </q-card-section>
      <q-separator />
      <q-table
        dense
        :rows="rows"
        :columns="columns"
        :filter="filter"
        :v-model:pagination="pagination"
        no-data-label="Não existem dados disponíveis neste momento"
        no-results-label="Dados solicitados não encontrados!"
      >
        <template v-slot:top-left>
          <q-input
            dense
            emit-value
            map-options
            outlined
            debounce="300"
            v-model="filter"
            placeholder="Pesquisar"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:top-right="props">
          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            class="q-ml-md"
          />
        </template>
        <template v-slot:pagination="scope">
          <q-btn
            v-if="scope.pagesNumber > 2"
            icon="first_page"
            color="grey-8"
            round
            dense
            flat
            :disable="scope.isFirstPage"
            @click="scope.firstPage"
          />

          <q-btn
            icon="chevron_left"
            color="grey-8"
            round
            dense
            flat
            :disable="scope.isFirstPage"
            @click="scope.prevPage"
          />

          <q-btn
            icon="chevron_right"
            color="grey-8"
            round
            dense
            flat
            :disable="scope.isLastPage"
            @click="scope.nextPage"
          />

          <q-btn
            v-if="scope.pagesNumber > 2"
            icon="last_page"
            color="grey-8"
            round
            dense
            flat
            :disable="scope.isLastPage"
            @click="scope.lastPage"
          />
        </template>
      </q-table>
    </q-card>
    <p>{{ error }}</p>
  </q-page>
</template>

<script>
import { ref, computed, reactive, toRefs } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const $store = useStore();

    $store.dispatch("Item/getNotValidItems");

    const columns = computed({
      get: () => $store.state.Item.columnsReports,
    });
    const rows = computed({
      get: () => $store.state.Item.withoutValidate,
    });

    const pagination = ref({
      page: 2,
      rowsPerPage: 10,
      // rowsNumber: xx if getting data from a server
    });

    const references = reactive({
      filter: "",
    });

    let { filter } = toRefs(references);

    return {
      pagination,
      columns,
      rows,
      filter,
      pagesNumber: computed(() => {
        return Math.ceil(rows.length / pagination.value.rowsPerPage);
      }),
    };
  },
};
</script>
