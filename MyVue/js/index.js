function MyVue(options) {
  this.$el = document.querySelector(options.el);
  this.$data == options.data;
  new Observer(this.$data);
  new Compile(this);
}