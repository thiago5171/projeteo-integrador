import { api } from "boot/axios";
import { axios } from "boot/axios";
import { Notify } from "quasar";
import { store } from "quasar/wrappers";
import { createStore } from "vuex";
export function validatorAction(context, itemBody) {
  console.log(itemBody);
  api
    .post("/api/item/validator", itemBody)
    .then(() => {
      Notify.create({
        color: "green-5",
        textColor: "white",
        icon: "check",
        message: "Item registrado com sucesso!",
        position: "top-right",
        timeout: 3000,
      });
    })
    .catch((error) => {
      if (error.response) {
        Notify.create({
          color: "red-5",
          textColor: "white",
          icon: "priority_high",
          message: "Item não existe, tente realizar o cadastro",
          position: "top-right",
          timeout: 3000,
        });
      } else {
        Notify.create({
          color: "red-5",
          textColor: "white",
          icon: "priority_high",
          message: "Oops, parece que o serviço está indisponível!",
          position: "top-right",
          timeout: 3000,
        });
      }
    });
}

export function createAction(context, itemBody) {
  console.log(itemBody);

  api
    .post("/api/item/new", itemBody)
    .then((response) => {
      console.log(response);

      Notify.create({
        color: "green-5",
        textColor: "white",
        icon: "check",
        message: "Item registrado com sucesso!",
        position: "top-right",
        timeout: 3000,
      });
    })
    .catch((error) => {
      console.log(error);
      Notify.create({
        color: "red-5",
        textColor: "white",
        icon: "priority_high",
        message: "Erro, tente realizar outro cadastro cadastro",
        position: "top-right",
        timeout: 3000,
      });
    });
}

export async function getStatusAction(context) {
  api
    .get("/api/status", options)
    .then((response) => {
      context.commit("getMutation", response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getValidItemsAction(context) {
  api
    .get("/api/item")
    .then((response) => {
      context.commit("getValidItemsMutation", response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getValidItemsByStatusAction(context, id) {
  context.commit("clearItems");

  api
    .get(`/api/item//${id}/status`)
    .then((response) => {
      context.commit("getValidItemsMutation", response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
export async function getNotValidItems(context) {
  api
    .get(`/api/item/find/all`)
    .then((response) => {
      context.commit("getNotValidItemsMutation", response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
