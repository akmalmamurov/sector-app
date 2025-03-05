let data = [
  {
    "id": "e860c744-708b-453b-8aa2-dec8dfbd9673",
    "title": "Сетевое оборудование",
    "slug": "setevoe-oborudovanie",
    "subcatalogs": [
      {
        "id": "3aaa9bdd-7bd6-4a7b-a71e-a7e30e2bc1f0",
        "title": "Коммутаторы",
        "slug": "kommutatory",
        "categories": [
          {
            "id": "30089060-4e68-46dc-895f-f1e5c3a97726",
            "title": "Коммутаторы Fibre Channel",
            "slug": "kommutatory-fibre-channel"
          },
          {
            "id": "e3269590-4800-442d-b14f-4e9b3ddf71ad",
            "title": "Модульные коммутаторы",
            "slug": "modulnye-kommutatory"
          },
          {
            "id": "3e0b0a8b-d7fb-43b5-b8d6-efce9313021b",
            "title": "Bare metal коммутаторы",
            "slug": "bare-metal-kommutatory"
          },
          {
            "id": "ae4297b7-7162-42c2-93a3-e3e2b8b703bd",
            "title": "Аксессуары для коммутаторов",
            "slug": "aksessuary-dlya-kommutatorov"
          },
          {
            "id": "e60ecbb9-5cff-408c-abe2-351c2716c396",
            "title": "Фиксированные коммутаторы",
            "slug": "fiksirovannye-kommutatory"
          }
        ]
      },
      {
        "id": "0a07e501-cf54-4054-8c29-f3af6a45c5ec",
        "title": "Маршрутизаторы",
        "slug": "marshrutizatory",
        "categories": [
          {
            "id": "121478d2-f72a-418f-813e-326db38ce89b",
            "title": "Маршрутизаторы для домашнего использования",
            "slug": "marshrutizatory-dlya-domashnego-ispolzovaniya"
          },
          {
            "id": "289deeec-5ce0-42bc-823e-79c6bf6950c9",
            "title": "Маршрутизаторы для провайдеров услуг связи",
            "slug": "marshrutizatory-dlya-provayderov-uslug-svyazi"
          },
          {
            "id": "d98722e1-e6c8-4eb1-9eec-c998076904f6",
            "title": "Аксессуары для маршрутизаторов",
            "slug": "aksessuary-dlya-marshrutizatorov"
          },
          {
            "id": "44eaf200-b617-49b6-b54f-cbbc27f3c969",
            "title": "Блоки питания для маршрутизаторов",
            "slug": "bloki-pitaniya-dlya-marshrutizatorov"
          },
          {
            "id": "e78f70a3-b0cb-4869-a271-2bad21a6d579",
            "title": "Маршрутизаторы для корпоративных клиентов",
            "slug": "marshrutizatory-dlya-korporativnykh-klientov"
          }
        ]
      }
    ]
  }
]

function findSubElements(data, name) {
  for (const item of data) {
    if (item.title === name) {
      return item.subcatalogs || item.categories || [];
    }
    if (item.subcatalogs || item.categories) {
      const result = findSubElements(item.subcatalogs || item.categories, name);
      if (result) return result;
    }
  }
  return null;
}

const nameToSearch = "Маршрутизаторы";
const result = findSubElements(data, nameToSearch);
console.log(result);
