<template>
  <q-page class="row items-center justify-evenly">
    <q-img :src="require('../assets/logo.jpeg')" />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
});
</script>
<!-- <template>
  <q-page padding>
    <q-card>
      <p>{{ error }}</p>
      <p>{{ decodeString }}</p>

      <qrcode-stream @init="onInit" @decode="onDecode"></qrcode-stream>
    </q-card>
  </q-page>
</template>

<script>
import { QrcodeStream } from "vue3-qrcode-reader";

export default {
  data() {
    return {
      error: "",
      decodeString: "",
    };
  },
  components: {
    QrcodeStream,
  },
  methods: {
    async onInit(promise) {
      try {
        const { capabilities } = await promise;

        // successfully initialized
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "Permissão da camera negada";
        } else if (error.name === "NotFoundError") {
          this.error = "Nenhuma camera instalada neste dispositivo";
        } else if (error.name === "NotSupportedError") {
          this.error = "page is not served over HTTPS (or localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "Talvez sua camera já esteja em uso";
        } else if (error.name === "OverconstrainedError") {
          this.error =
            "did you requested the front camera although there is none?";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "browser seems to be lacking features";
        }
      } finally {
        // hide loading indicator
      }
    },
    onDecode(decodeString) {
      this.decodeString = decodeString;
    },
  },
};
</script> -->
