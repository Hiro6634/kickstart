import web3 from './web3';
import CampaignFactory  from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xF98A8B373996CA3315E61ED155FC8faf06C688c3'
);

export default instance;
