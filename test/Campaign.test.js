const assert = require('assert');
const ganache = require('ganache');
const Web3 = require('web3');

const web3 = Web3(ganache.provider());

const compileFactory = require('../ethereum/build/CampaignFactory.json');
const compileCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await web3.eth.Contract(JSON.parse(compileFactory.interface))
        .deploy({data: compileFactory.bytecode})
        .send({ from: accounts[0], gas: '1000000'});

    await factory.methods.createCampaign('100').send({
        from: accounts[0],
        gas: '1000000'
    });

    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
    campaign = await web3.rth.Contract(
        JSON.parse(compileCampaign.interface),
        campaignAddress
    );
});