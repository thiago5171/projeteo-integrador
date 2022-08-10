4
<template>
  <q-page padding>
    <q-card>
      <q-card-section class="q-mt-xl" style="min-height: 60px">
        <div class="text-h6 text-center text-black">
          Visualização de relatórios
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
            class="q-pt-sm"
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
          <q-select
            style="min-width: 250px; position: relative"
            class="q-pt-sm q-pb-sm justify-start"
            outlined
            dense
            v-model="status"
            :options="statusOptions"
            label="Status do item"
          >
            <template v-if="status" v-slot:append>
              <q-icon
                name="cancel"
                @click.stop.prevent="status = null"
                class="cursor-pointer"
              />
            </template>
          </q-select>
          <q-btn
            color="positive"
            icon="archive"
            label="Exportar"
            no-caps
            class="q-ml-sm"
            @click="exportTable"
          />

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
  </q-page>
</template>

<script>
function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`;
}
import { ref, computed, watch, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { exportFile, useQuasar } from "quasar";
export default {
  setup() {
    const $store = useStore();

    $store.dispatch("Item/getValidItemsAction");
    const statusOptions = computed({
      get: () => $store.state.Item.statusList,
    });

    const columns = computed({
      get: () => $store.state.Item.columnsReports,
    });
    const rows = computed({
      get: () => $store.state.Item.items,
    });

    const status = ref("");
    watch(
      () => status.value,
      (val, valPrev) => {
        if (val != null) {
          console.log(1);
          $store.dispatch("Item/getValidItemsByStatusAction", val.value);
        } else {
          console.log(2);

          $store.dispatch("Item/getValidItemsAction");
        }
        const rows = computed({
          get: () => $store.state.Item.items,
        });
      }
    );

    const pagination = ref({
      page: 2,
      rowsPerPage: 10,
      // rowsNumber: xx if getting data from a server
    });

    const references = reactive({
      filter: "",
    });

    let { filter } = toRefs(references);

    const exportTable = () => {
      // naive encoding to csv format
      const content = [columns.value.map((col) => wrapCsvValue(col.label))]
        .concat(
          rows.value.map((row) =>
            columns.value
              .map((col) =>
                wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(",")
          )
        )
        .join("\r\n");

      const status = exportFile("table-export.csv", content, "text/csv");

      if (status !== true) {
        $q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning",
        });
      }
    };
    return {
      pagination,
      exportTable,
      columns,
      rows,
      filter,
      statusOptions,
      status,
      pagesNumber: computed(() => {
        return Math.ceil(rows.length / pagination.value.rowsPerPage);
      }),
    };
  },
};
</script>
