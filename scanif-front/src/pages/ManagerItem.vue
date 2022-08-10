<template>
  <q-card class="q-ma-sm border-radius-inherit">
    <q-card-section class="q-mt-l" style="min-height: 60px">
      <div class="text-h6 text-center text-black">
        Gerenciamento doa dados fornecidos pelo SIPAC
      </div>
    </q-card-section>
    <q-separator />
    <div class="q-pt-md column items-center">
      <div>
        <q-file
          class="relative-position container bg-grey-3 text-black flex flex-center"
          style="min-width: 23rem"
          v-model="files"
          filled
          flat
          multiple
          use-chips
          label="Insira ou arraste um  arquivo .CSV"
        >
          <template v-slot:append>
            <q-icon class="q-mr-sm" name="vertical_align_top" />
          </template>
        </q-file>
      </div>
      <div>
        <q-btn
          class="relative-position container text-white flex flex-center q-mt-sm"
          label="Resgistrar"
          style="height: 50px; min-width: 23rem"
          @click="onSubmit($event)"
          type="submit"
          color="primary"
        />
      </div>
      <q-card-section class="q-mt-xl">
        <div class="text-center text-black">
          <li>
            Ao realizar a seguinte operação todos seus items anteriormente
            <br />
            cadastrados atráves de um arquivo serão excluidos
          </li>
        </div>
      </q-card-section>
      <div>
        <q-btn
          class="relative-position container text-white flex flex-center q-mb-xl"
          label="Excluir todos items"
          style="height: 50px; min-width: 23rem"
          @click="onSubmit($event)"
          type="submit"
          color="red"
        />
      </div>
    </div>
  </q-card>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    let files = ref(null);
    let onSubmit = function (evt) {
      console.log(files.value[0]);
      let lines = "";
      let currentline = "";
      let csv = "";
      let headers = [];
      let result = [];
      let reader = new FileReader();
      reader.readAsBinaryString(files.value[0]);
      reader.onload = (evt) => {
        csv = reader.result;
        lines = csv.split("\r" + "\n");
        headers = lines[0].split(",");
        for (var i = 1; i < lines.length; i++) {
          if (!lines[i]) continue;
          let obj = {};
          currentline = lines[i];
          var re = /"/g;
          currentline = re[Symbol.replace](currentline, "");
          currentline = currentline.split(",");
          for (var j = 0; j < headers.length; j++) {
            let head = headers[j].trim();
            let value = currentline[j].trim();
            obj[head] = value;
          }
          result.push(obj);
        }
        result = JSON.stringify(result);
        console.log(result);
      };
    };
    return {
      files,

      onSubmit,
    };
  },
};
</script>
<!-- <q-input
      type="file"
      ref="myFile"
      v-model="files"
      @change="onSubmit($event)"
      filled
      multiple
      use-chips
      label="Insira ou arraste um .CSV"
    /> -->
