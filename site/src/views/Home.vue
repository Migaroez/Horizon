<template>
  <section>
    <div class="container text-light pt-5">
        <div class="row">
          <div class="col-md bg-gr-blue pr-5">
                <h1>A DeFi platform,<br/> build for everyone</h1>
                
                <div class="my-5 py-3">
                    <p class="mb-1">Projects vetted by professionals </p>
                    <p class="mb-1">and brought to retail investors first.</p>
                    <p class="mb-1">Powerful, easy-to-use, and lightining fast.</p>
                </div>
                
                <button type="button" class="btn btn-dark btn-dark-blue">Get Started</button>
          </div>
          <div class="col-md pl-5">
              <div class="token-statistics">
                <h2 class="h1">Token Statistics</h2>
                <div class="container">
                    <div class="row">
                        <div class="col-sm p-3"><button type="button" class="btn btn-dark btn-dark-blue btn-block">Price:$</button></div>
                        <div class="col-sm p-3"><button type="button" class="btn btn-dark btn-dark-blue btn-block">Mcap:</button></div>
                    </div>
                    <div class="row">
                        <div class="col-sm p-3"><button type="button" class="btn btn-light btn-block">Buy now</button></div>
                        <div class="col-sm p-3"><button type="button" class="btn btn-light btn-block">Chart</button></div>
                    </div>
                </div>
              </div>
          </div>
        </div>
      </div>
  </section>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    // HelloWorld,
  },
};
</script>

<style lang="scss">
.landing-page-main-platform{
    padding-top:120px;
}
.landing-page-main-statistics{
    padding-top:120px;
}

.token-statistics{
    margin-left: 20%;
    margin-right: 20%;
}

.btn.btn-dark.btn-dark-blue{
    background-color:rgb(0, 14, 48);
    border-color:rgb(0, 14, 48);
}

.btn.btn-dark.btn-dark-blue:hover{
    background-color: #343a40;
    border-color: #343a40;
}
</style>