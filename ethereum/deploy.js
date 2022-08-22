const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
    'armed shaft biology square fog pond uncover drop decade upgrade negative gasp',
    'https://rinkeby.infura.io/v3/7c9773b0fc3f4486a21cb7840ac685ea'
);   
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account ', accounts[0]);

    try {
        const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
            .deploy({ data: compiledFactory.bytecode })
            .send({ gas: '1000000', from: accounts[0] });

        console.log('Contract deployed to', result.options.address);
        provider.engine.stop();
    }
    catch(err){
        console.log(err);
    }
};
deploy();
