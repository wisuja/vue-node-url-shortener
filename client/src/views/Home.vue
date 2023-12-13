<template>
  <div class="container p-3 main-container">
    <div class="row mb-3">
      <div class="col-12">
        <h1 class="text-center">URL Shortener</h1>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12 col-md-9">
        <div class="form-group">
          <input
            type="url"
            class="form-control"
            placeholder="Place your URL here..."
            style="flex: 3"
            v-model="url"
          />
        </div>
      </div>
      <div class="col-12 col-md-3">
        <div class="form-group">
          <select class="form-control" v-model="type">
            <option value="random">Random Generator</option>
            <option value="custom">Custom URL</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row mb-3" v-show="type == 'custom'">
      <div class="col-12">
        <div class="form-group">
          <input
            type="url"
            class="form-control"
            placeholder="Place your Custom URL here..."
            v-model="custom_url"
          />
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <div class="form-group">
          <button class="btn btn-success w-100" type="button" @click="generate">
            Submit
          </button>
        </div>
      </div>
    </div>
    <div class="row" v-show="error">
      <div class="col-12">
        <div class="alert alert-danger" v-text="error"></div>
      </div>
    </div>
    <div class="row" v-show="result_url">
      <div class="col-12">
        <div class="alert alert-success">
          Your new URL is
          <a :href="result_url" v-text="result_url" target="_blank"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      url: '',
      custom_url: '',
      type: 'random',
      result_url: '',
      error: '',
    };
  },
  methods: {
    async generate() {
      this.error = '';
      this.result_url = '';
      
      if (this.url == '') {
        this.error = 'Please fill in the URL';
        return;
      }

      if (
        this.url.match(
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi
        ) == null
      ) {
        this.error = 'Please fill in a valid URL';
        return;
      }

      if (this.type == 'custom' && this.custom_url == '') {
        this.error = 'Please fill in the custom URL';
        return;
      }

      axios
        .post(this.server_url, {
          url: this.url,
          custom_url: this.custom_url,
        })
        .then(
          ({
            data: {
              data: { slug },
            },
          }) => {
            this.result_url = window.location.origin + '/' + slug;
          }
        )
        .catch((error) => (this.error = 'Error occured. Try again.'));
    },
  },
};
</script>

<style scoped>
.main-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
