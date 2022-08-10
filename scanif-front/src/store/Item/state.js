export default function () {
  let genericSelect = {
    value: 0,
    label: "",
  };
  return {
    validatorItem: {},
    withoutValidate: [],
    completeItem: {},
    items: [],
    columnsReports: [
      {
        name: "tombamento",
        required: true,
        field: "tombamento",
        label: "Tombamento",
        align: "left",
        sortable: true,
      },
      {
        name: "denominacao",
        align: "left",
        label: "Denominação",
        field: "denominacao",
        sortable: true,
      },
      {
        name: "localidade",
        label: "Localidade",
        align: "center",
        field: "localidade",
        sortable: true,
      },
      { name: "termo", label: "Termo", field: "termo", align: "center" },

      {
        name: "valor",
        sortable: true,
        label: "Valor(R$)",
        field: "valor",
        align: "center",
      },
      {
        name: "tomb_antigo",
        label: "Tombamento Antigo",
        field: "tomb_antigo",
        sortable: true,

        align: "center",
      },
      {
        sortable: true,

        name: "estado",
        label: "Estado do Bem",
        field: "estado",
        sortable: true,
        align: "center",
      },
      {
        name: "situacao",
        label: "Situação",
        field: "situacao",
        align: "center",
      },
      {
        name: "n_serie",
        align: "center",
        label: "Número de Série",
        field: "n_serie",
      },
      {
        name: "observacao",
        align: "center",
        label: "Observação",
        align: "center",
        field: "observacao",
      },
      { name: "nome", label: "Status", align: "left", field: "nome" },
    ],
    statusList: [
      {
        value: 1,
        label: "encontrado e na lista",
        sigla: "el",
      },
      {
        value: 2,
        label: "encontrado e não esta na lista",
        sigla: "enl",
      },
      {
        value: 3,
        label: "encontrado, ausente na lista e com identificação",
        sigla: "eali",
      },
      {
        value: 4,
        label: "encontrado, ausente na lista e sem identificação",
        sigla: "ealsi",
      },
    ],
  };
}
