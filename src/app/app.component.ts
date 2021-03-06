import { Component } from '@angular/core';
// import { ethers } from 'ethers';

import { LiquidLong } from '@keydonix/liquid-long-client-library';

import { environment } from '../environments/environment';

import Web3type from 'web3';
import { Provider } from 'web3/providers';


declare global {
  interface Window {
    web3: Web3type;
    Web3: typeof Web3type;
    ethereum: Provider & {
      enable: () => Promise<void>;
    };
  }
}
declare const ethereum: typeof window.ethereum;    // MetamaskInpageProvider
declare const web3: Web3type;
declare const Web3: typeof Web3type;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'DataCloneErrorDemo';

  constructor() {
    // debugger;

    if (window.ethereum) {
      // Modern dapp browsers...
      window.web3 = new Web3(ethereum);
      try {
        // Request account access if needed
        ethereum.enable()
          .then(res => {
            console.log(`window.ethereum.enable() then:`, res);
            // Acccounts now exposed
            this.initMiddleware();
          })
          .catch(x => console.log(`window.ethereum.enable() catch:`, x));
      } catch (error) {
        // User denied account access...
        console.error(`catched error:`, error);
      }
    } else if (window.web3) {
      // Legacy dapp browsers...
      window.web3 = new Web3(web3.currentProvider);
      // Acccounts always exposed
      this.initMiddleware();
    } else {
      // Non-dapp browsers...
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

  }

  private initMiddleware() {
    web3.eth.sendTransaction({/* ... */}, (err, data) => {
      console.log(`sendTransaction:`, err, data);
    });

    const defaultEthPriceInUsd = 120;
    const defaultProviderFeeRate = 0.21;

    // this.provider: JsonRpcProvider = new JsonRpcProvider('http://localhost:8545');
    // const provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
    // const provider: ethers.providers.Web3Provider = null;
    // const provider: ethers.providers.AsyncSendable = null;

    // const provider = new ethers.providers.Web3Provider(new Web3(ethereum).currentProvider);
    const provider = ethereum;

    const liquidLong: LiquidLong = LiquidLong.createWeb3(
      provider,                                                       // should be AsyncSendable
      environment.liquidLongContractAddress,
      defaultEthPriceInUsd,
      defaultProviderFeeRate,
      10,                                               // ???
      environment.ethPricePollingFrequency,
      environment.providerFeePollingFrequency,
    );

    liquidLong.getEthPriceInUsd()
      .then(price => console.log(`liquidLong.getEthPriceInUsd() then:`, price))
      .catch(err => console.log(`liquidLong.getEthPriceInUsd() catch:`, err));

  }
}
