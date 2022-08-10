<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-green">
      <q-toolbar>
        <q-btn
          class="q-mr-md"
          flat
          dense
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-avatar size="sm">
          <q-img
            src="https://play-lh.googleusercontent.com/DxVKD8i1OlpLwBIt8LtI5zLZqp0afABhdWbHs0Sq0lOEacRmr5HGfZsoiJmDysrnXLCo=w240-h480-rw"
          />
        </q-avatar>
        <q-toolbar-title>ScanIF</q-toolbar-title>

        <div>v 1.0.0</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Atividades disponíveis do sistema </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Inventário",
    caption: "Registro e validação de items",
    icon: "checklist",
    link: "/#/inventario",
  },
  {
    title: "Relatórios",
    caption: "Visualizar items registrados",
    icon: "summarize",
    link: "/#/relatorios",
  },
  {
    title: "Items cadastrados do SIPAC",
    caption: "Listagem de itens para comparação",
    icon: "drive_file_move_outline",
    link: "/#/items-SIPAC",
  },
  {
    title: "Gerenciamento de items do SIPAC",
    caption: "Inserir e limpar os dados",
    icon: "add_box",
    link: "/#/gerenciamento/items",
  },
];
export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

<!-- 





<template>
  <q-layout view="hHh lpr lfr">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      drawer content
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
}
</script> -->
