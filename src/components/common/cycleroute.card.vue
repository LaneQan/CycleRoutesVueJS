<template>
  <div>
    <img class="card-img-top" src="~/img/1.jpg" alt="Card image cap">
    <div class="card-body">
      <div class="tour-statistic">
        <a class="view-statistic">
          <span>
            <i class="fa fa-eye" aria-hidden="true"></i>
          </span>13216</a>
        <a class="view-comments">
          <span>
            <i class="fa fa-comment" aria-hidden="true"></i>
          </span>23</a>
      </div>
      <h4 class="card-title">Название маршрута</h4>
      <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus risus massa, pretium eget massa aliquet, porttitor
        blandit nibh. </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "cycleroutes.card",
    data() {
      return {};
    }
  };
</script>

<style>
  .view-statistic {
    margin-right: 10px;
    border-right: 1px solid #cccccc;
    padding-right: 10px;
}
.tour-statistic {
    text-align: right;
}
.card-body {
    padding: 1.05rem;
}
</style>