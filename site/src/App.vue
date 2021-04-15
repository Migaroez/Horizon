<template>
  <div id="app">
    <div id=body-wrapper>
      <div id="bank-notes"></div>
      <div id="hideout"></div>
      <div id="visual-wrapper">
        <nav id="nav" class="navbar navbar-expand-lg navbar-light">
            <a class="navbar-brand js-scroll-trigger text-light title pl-5" href="/">Horizon</a>
                <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto my-2 my-lg-0">
                        <li class="nav-item"><span class="nav-link js-scroll-trigger" v-on:click="connectweb3"><div class="col-sm"><button type="button" class="btn btn-outline-light" id="web3Connect"><span id="address">{{connectString}}</span></button></div></span></li>
                        <li class="nav-item"><router-link class="nav-link js-scroll-trigger" to="#services"><div class="col-sm"><button type="button" class="btn btn-dark btn-dark-blue">Launchpad</button></div></router-link></li>
                        <li class="nav-item"><router-link class="nav-link js-scroll-trigger" to="/about"><div class="col-sm"><button type="button" class="btn btn-dark btn-dark-blue">About</button></div></router-link></li>
                    </ul>
                </div>
          </nav>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

import Web3 from 'web3'
import DetectEthereumProvider from '@metamask/detect-provider'
let web3;

export default {
  name: "App",
  data: function(){ return{
    isInitialized: false,
    isMetaMaskInstalled: false,
    connectMessage: "initializing",
    accounts: [],
    web3: null
  }},
  components: {
    // HelloWorld,
  },
  computed:{
    connectString : function(){
      return this.isInitialized === false 
        ? "Initializing"
        : this.isMetaMaskInstalled === false
          ? "Please install metamask"
          : !this.accounts || this.accounts.length < 1
            ? "Connect"
            : this.accounts[0].substring(0,12) + "...";
    }
  },
  methods:{
    connectweb3 : function(){
      console.log("connect triggered")
      if(this.isInitialized != true || this.isMetaMaskInstalled != true){
        console.log("cant connect | not initialized")
        return;
      }
      // window.ethereum.request({ method: 'eth_requestAccounts' }).then(
        window.ethereum.enable().then(
          web3.eth.getAccounts().then(this.handleAccountsResponse)
      );
    },
    handleAccountsResponse: function(accountResponse){
        console.log("got response from getAccounts",accountResponse)
        this.accounts = accountResponse;
    }
  },
  mounted: async function(){
    console.log("mount triggered")
    let provider;
    DetectEthereumProvider().then((result)=> {
      provider = result;
      console.log(provider);
        
      if (provider) {
          web3 = new Web3();
          web3.setProvider(provider);
          this.isMetaMaskInstalled = true;
      }
      else{
        console.log('MetaMask is not installed');
      }

      //subscribe to events
      window.ethereum.on('accountsChanged', this.handleAccountsResponse);

      this.isInitialized = true
    }); 
  }
};
</script>


<style lang="scss">
html, body, #body-wrapper, #app{
    height: 100%;
    margin:0;
}

#body-wrapper{
    background: rgb(89,7,111);
    background: linear-gradient(90deg,rgba(7,7,111,1) 0%, rgba(0,132,205,1) 30%, rgba(140,67,207,1) 30%,rgba(96,25,179,1) 100%);
}

#visual-wrapper{
    position: absolute;
    width: 100%;
    background: url("~@/assets/Svg/bg.svg") no-repeat;
    background-size: cover;
    min-height: 100%;
    z-index: 1;
}

.title{
    font-size: 3rem !important;
}

#bank-notes{
    position: absolute;
    top: 7%;
    left: 42%;
    /* right: 20%; */
    z-index: 0;
    
    height: 6rem;
    width: 20rem;

    background-color:red ;
    background: url("~@/assets/Svg/bank-note.svg");
    background-size: 37.5%;
    
    -webkit-clip-path: polygon(0% 11%, 17% 0%, 34% 12%, 53% 0, 72% 12%, 89% 0, 100% 0%, 100% 87%, 73% 100%, 54% 89%, 34% 100%, 17% 89%, 0% 99%);
    clip-path: polygon(0% 11%, 17% 0%, 34% 12%, 53% 0, 72% 12%, 89% 0, 100% 0%, 100% 87%, 73% 100%, 54% 89%, 34% 100%, 17% 89%, 0% 99%);

    /* -webkit-clip-path: polygon(15% 0, 85% 0, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0 85%, 0 15%);
    clip-path: polygon(15% 0, 85% 0, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0 85%, 0 15%); */
}

#hideout{
    position: absolute;
    top: 55%;
    right: 5%;
    z-index: 0;

    height: 15rem;
    width: 15rem;

    background: url("~@/assets/Svg/hideout.svg");
    background-size: 10%;
    -webkit-clip-path: polygon(1% 1%, 99% 1%, 99% 99%, 1% 99%);
    clip-path: polygon(1% 1%, 99% 1%, 99% 99%, 1% 99%)
}
</style>
