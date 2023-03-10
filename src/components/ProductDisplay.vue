<template>
  <div
    v-if="!isLoading"
    v-bind:class="{ background__men: isMen, background__women: !isMen }"
  >
    <div class="container">
      <!-- product image -->
      <img :src="product.image" alt="product picture" class="image__product" />

      <!-- product descriptions -->
      <div class="desc__product">
        <!-- title -->
        <h1
          v-bind:class="{
            'title__product-men': isMen,
            'title__product-women': !isMen,
          }"
        >
          {{ product.title }}
        </h1>
        <!-- category and rating -->
        <div class="category__product">
          <p>{{ product.category }}</p>
          <div class="rating-product">
            <p>{{ product.rating.rate }}/5</p>
          </div>
        </div>
        <!-- description -->
        <p class="description__product">
          {{ shortenDesc(product.description) }}
        </p>
        <!-- price -->
        <h3
          :class="{
            'price__product-men': isMen,
            'price__product-women': !isMen,
          }"
        >
          ${{ product.price }}
        </h3>
        <!-- button -->
        <div class="button">
          <button
            v-bind:class="{
              'buy__button-men': isMen,
              'buy__button-women': !isMen,
            }"
          >
            Buy now
          </button>
          <button
            :class="{
              'next__button-men': isMen,
              'next__button-women': !isMen,
            }"
            @click="nextProduct"
          >
            Next product
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="isLoading">
    <div class="loader"></div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductDisplay',
  data() {
    return {
      product: {}, // data api
      index: 1, // index
      isMen: true, // category
      isLoading: true, // laoding
    };
  },
  methods: {
    // function to fetch API from FakeStore API
    async fetchApiData() {
      const response = await axios.get('https://fakestoreapi.com/products/1');

      return response.data;
    },
    // function to fetch next index product of FakeStore API
    async nextProduct() {
      // setting index product fakestore api
      this.index += 1;
      if (this.index > 20) {
        this.index = 1;
      }

      // fetch api fakestore
      const response = await axios.get(
        `https://fakestoreapi.com/products/${this.index}`
      );
      this.isLoading = true;
      // filtering and checking the category, only save data of men or women
      if (
        response.data.category === "men's clothing" ||
        response.data.category === "women's clothing"
      ) {
        // creating state based on category
        if (response.data.category === "men's clothing") {
          this.isMen = true;
        } else if (response.data.category === "women's clothing") {
          this.isMen = false;
        }
        // save data responses api
        this.product = response.data;
        this.isLoading = false;
      } else {
        this.nextProduct();
      }
    },
    // function to shortening description, only 450 words
    shortenDesc(s) {
      return s.substr(0, 200).concat('...');
    },
  },
  async created() {
    const data = await this.fetchApiData();

    if (
      data.category === "men's clothing" ||
      data.category === "women's clothing"
    ) {
      // creating state based on category
      if (data.category === "men's clothing") {
        this.isMen = true;
      } else if (data.category === "women's clothing") {
        this.isMen = false;
      }
      // save data responses api
      this.isLoading = false;
      this.product = data;
    } else {
      this.nextProduct();
    }
  },
};
</script>

<style scoped>
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.background__women {
  width: 100%;
  height: 50vh;
  position: absolute;
  top: 0;
  right: 0;
  background-color: #fde2ff;
}
.background__men {
  width: 100%;
  height: 50vh;
  position: absolute;
  top: 0;
  right: 0;
  background-color: #d6e6ff;
}
.container {
  position: relative;

  margin: 40px;
  padding: 20px;
  background: #ffffff;
  box-shadow: 1px 1px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  min-width: 70%;
  min-height: 80vh;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 0px;
}

.image__product {
  flex: 2;
  height: 400px;
  width: 100%;
}

.desc__product {
  display: flex;
  flex: 4;
  flex-direction: column;
  padding: 0px 20px;
  min-height: 400px;
  height: 400px;
}

.title__product-women {
  font-weight: 600;
  font-size: 28px;
  line-height: 34px;
  color: #720060;
}
.title__product-men {
  font-weight: 600;
  font-size: 28px;
  line-height: 34px;
  color: #002772;
}

.category__product {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: 400;
  font-size: 18px;
  color: #3f3f3f;
}

.description__product {
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  font-weight: 400;
  font-size: 20px;
  color: var(--black);
  min-height: 125px;
  max-height: 125px;
  margin: 0;
}

.price__product-women {
  font-weight: 600;
  font-size: 28px;
  text-align: left;
  color: #720060;
}
.price__product-men {
  font-weight: 600;
  font-size: 28px;
  text-align: left;
  color: #002772;
}

.button {
  display: flex;
  flex-direction: row;

  justify-content: flex-start;
}

.buy__button-women {
  width: 259px;
  height: 42px;
  background-color: #720060;
  border-radius: 4px;
  margin-right: 20px;

  font-weight: 600;
  font-size: 24px;
  color: #ffffff;
}
.buy__button-men {
  width: 259px;
  height: 42px;
  background-color: #002772;
  border-radius: 4px;
  margin-right: 20px;

  font-weight: 600;
  font-size: 24px;
  color: #ffffff;
}

.next__button-women {
  width: 259px;
  height: 42px;

  border: 3px solid #720060;
  background-color: #ffffff;
  border-radius: 4px;

  font-weight: 600;
  font-size: 24px;
  color: #720060;
}
.next__button-men {
  width: 259px;
  height: 42px;

  border: 3px solid #002772;
  background-color: #ffffff;
  border-radius: 4px;

  font-weight: 600;
  font-size: 24px;
  color: #002772;
}
</style>
