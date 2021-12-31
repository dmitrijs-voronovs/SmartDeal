export function getWei(drizzle, balance) {
    try {
        return drizzle.web3.utils.toWei(String(balance), "ether");
    } catch (e) {
        return "0"
    }
}

export function getEth(drizzle, balance) {
    try {
        return drizzle.web3.utils.fromWei(String(balance), "ether");
    } catch(e) {
        return "0"
    }
}

export function getEthValue(drizzle, balance) {
    return `${(getEth(drizzle, balance))} ETH`;
}

