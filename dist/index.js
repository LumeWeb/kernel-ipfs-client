import { ipnsPath, ipfsPath } from "is-ipfs";
const IPFS_MODULE = "AQDr2iGYEiMKIdb14w7dxwxFYBo3LaYc0mAuRKXsF2w9OQ";
let callModule, connectModule;
async function loadLibs() {
    if (callModule && connectModule) {
        return;
    }
    if (typeof window !== "undefined" && window?.document) {
        const pkg = await import("libkernel");
        callModule = pkg.callModule;
        connectModule = pkg.connectModule;
    }
    else {
        const pkg = await import("libkmodule");
        callModule = pkg.callModule;
        connectModule = pkg.connectModule;
    }
}
export async function refreshGatewayList() {
    const [resp, err] = await doCall("refreshGatewayList");
    if (err) {
        throw new Error(err);
    }
    return resp;
}
export async function fetchIpfs(hash, path = "", receiveUpdate) {
    if (!ipfsPath(`/ipfs/${hash}`)) {
        throw new Error("Invalid hash");
    }
    return doFetch("fetchIpfs", { hash, path }, receiveUpdate);
}
export async function statIpfs(hash, path = "") {
    if (!ipfsPath(`/ipfs/${hash}`)) {
        throw new Error("Invalid hash");
    }
    return doFetch("statIpfs", { hash, path });
}
export async function fetchIpns(hash, path = "", receiveUpdate) {
    if (!ipnsPath(`/ipns/{${hash}`)) {
        throw new Error("Invalid hash");
    }
    return doFetch("fetchIpns", { hash, path }, receiveUpdate);
}
export async function statIpns(hash, path = "") {
    if (!ipnsPath(`/ipns/{${hash}`)) {
        throw new Error("Invalid hash");
    }
    return doFetch("statIpns", { hash, path });
}
async function doFetch(method, data, receiveUpdate) {
    let [resp, err] = await doCall(method, data, receiveUpdate);
    if (typeof err?.then === "function") {
        [resp, err] = await err;
    }
    if (err) {
        throw new Error(err);
    }
    return resp;
}
async function doCall(method, data, receiveUpdate) {
    await loadLibs();
    if (receiveUpdate) {
        return connectModule(IPFS_MODULE, method, data, receiveUpdate);
    }
    return callModule(IPFS_MODULE, method, data);
}
