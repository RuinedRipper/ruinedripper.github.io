var app = new Vue({
  el: "#app",
  data: {
    btnVisible: 0,
    order: 0,
    products: [
      {
        id: 1,
        title: "Carolina Reaper",
        short_text: "Жгучий Каролинский жнец",
        image: "Perec_1.jpg",
        desc: "В переводе означает Каролинский жнец, это самый жгучий перец в мире, по шкале Сковилла - 2,2 млн ЕШС.  Вид занесен в Книгу Рекордов Гиннеса. Этот сорт был выведен садоводом-профессионалом из Южной Каролины. На данный момент каролинский перец по жгучести уступает лишь капсаицину в чистом виде и перцовому баллончику для самозащиты.",
      },
      {
        id: 2,
        title: "Trinidad Moruga Scorpion",
        short_text: "Острый перчик с необычной формой",
        image: "Perec_2.jpg",
        desc: "Trinidad Moruga Scorpion содержит чуть больше  2 млн сковиллей. Отличается необычной формой, за что и получил свое название -  из-за вздернутого хвостика напоминает скорпиона. Этот сорт - выходец с Карибских островов, и еще около 10 лет назад делил первое место с Carolina Reaper.",
      },
      {
        id: 3,
        title: "Komodo Dragon",
        short_text: "Жгучий Комодский варан",
        image: "Perec_3.jpg",
        desc: "Степень жгучести - также 2,2 млн SHU. Такое название сорт получил за сходство с мордой варана. Выведен в Великобритании и необычайно популярен там. Уникальность этого вида в том, что наиболее ярко острота раскрывается через 10 секунд после дегустации, поэтому считается перцем замедленного действия.",
      },
      {
        id: 4,
        title: "Naga Morich",
        short_text: "Индийская Нага Морич",
        image: "Perec_4.jpg",
        desc: "Наиболее популярен в Индии и Бангладеш. Еще несколько лет назад занимал лидирующие позиции рейтинга за 1.5 млн Сковиллей и длительное очень острое послевкусие.",
      },
      {
        id: 5,
        title: "Naga Viper",
        short_text: "Нага Вайпер 3в1",
        image: "Perec_5.jpg",
        desc: "Этот сорт выведен на основе трех видов перца чили и тоже отмечен в Книге Гиннеса. Выращивается этот перец в Великобритании, показатель жгучести - 1,38 млн сковиллей.",
      },
    ],
    product: [],
    cart: [],
    contactFields: [],
  },
  mounted: function () {
    console.log(window.localStorage.getItem("prod"));
    this.getProduct();
    this.checkInCart();
    this.getCart();
  },
  methods: {
    addItem(id) {
      window.localStorage.setItem("prod", id);
    },
    getProduct() {
      if (window.location.hash) {
        var id = window.location.hash.replace("#", "");
        if (this.products && this.products.length > 0) {
          for (i in this.products) {
            if (
              this.products[i] &&
              this.products[i].id &&
              id == this.products[i].id
            )
              this.product = this.products[i];
          }
        }
      }
    },
    addToCart(id) {
      var cart = [];
      if (window.localStorage.getItem("cart")) {
        cart = window.localStorage.getItem("cart").split(",");
      }
      if (cart.indexOf(String(id)) == -1) {
        cart.push(id);
        window.localStorage.setItem("cart", cart.join());
        this.btnVisible = 1;
      }
    },
    checkInCart() {
      if (
        this.product &&
        this.product.id &&
        window.localStorage
          .getItem("cart")
          .split(",")
          .indexOf(String(this.product.id)) != -1
      )
        this.btnVisible = 1;
    },
    getCart() {
      if (window.localStorage.getItem("cart") != null) {
        if (this.products != null && this.products.length > 0) {
          for (let i in this.products) {
            if (
              this.products[i] != null &&
              this.products[i].id != null &&
              window.localStorage
                .getItem("cart")
                .split(",")
                .indexOf(String(this.products[i].id)) != -1
            )
              this.cart.push(this.products[i]);
          }
        }
      }
    },
    removeFromCart(id) {
      let cart = [];
      if (window.localStorage.getItem("cart") != null) {
        cart = window.localStorage.getItem("cart").split(",");
      }

      if (cart.indexOf(String(id)) != -1) {
        cart.splice(cart.indexOf(String(id)), 1);
        window.localStorage.setItem("cart", cart.join(","));
        this.cart = [];
        this.getCart();
      }
    },
    makeOrder() {
      this.cart = [];
      window.localStorage.setItem("cart", "");
      this.order = 1;
    },
  },
});
