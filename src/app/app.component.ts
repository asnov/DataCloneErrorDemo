import { Component } from '@angular/core';


type Provider = any;
type AsyncSendable = any;

declare global {
  interface Window {
    web3: {
      currentProvider: AsyncSendable;
      eth: {
        sendTransaction: (...x: any) => void;
      };
    };
    ethereum: {     // Provider &
      enable: () => Promise<void>;
    };
  }

  // MetaMask Web3 object
  class Web3 {
    constructor(provider?: Provider | string);
    currentProvider: AsyncSendable;
    eth: {
      sendTransaction: (...x: any) => void;
    };
  }
}
declare const ethereum: typeof window.ethereum;    // MetamaskInpageProvider
declare const web3: typeof window.web3;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'DataCloneErrorDemo';

  constructor() {
    if (window.ethereum) {
      // Modern dapp browsers...
      window.web3 = new Web3(ethereum);
      try {
        // Request account access if needed
        // await
        ethereum.enable()
          .then(res => {
            console.log(`window.ethereum.enable() then:`, res);
            // Acccounts now exposed
            web3.eth.sendTransaction({/* ... */}, (err, data) => {
              console.log(`sendTransaction:`, err, data);
            });
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
      web3.eth.sendTransaction({/* ... */}, (err, data) => {
        console.log(`sendTransaction:`, err, data);
      });
    } else {
      // Non-dapp browsers...
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

}
