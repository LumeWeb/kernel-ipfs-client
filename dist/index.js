import { Client, factory } from "@lumeweb/libkernel-universal";
import defer from "p-defer";
export class IPFSClient extends Client {
    async ready() {
        return this.callModuleReturn("ready");
    }
    async stat(cid, options) {
        return this.callModuleReturn("stat", { options });
    }
    ls(cid, options) {
        return this.connectModuleGenerator("ls", { cid, options });
    }
    cat(cid, options) {
        return this.connectModuleGenerator("cat", { cid, options });
    }
    async ipns(cid) {
        return this.callModuleReturn("ipnsResolve");
    }
    async activePeers() {
        return this.callModuleReturn("getActivePeers");
    }
    connectModuleGenerator(method, data) {
        const pipe = defer();
        let done = false;
        const [update, result] = this.connectModule(method, data, (item) => {
            pipe.resolve(item);
        });
        (async () => {
            const ret = await result;
            done = true;
            this.handleError(ret);
        })();
        return {
            abort() {
                update();
            },
            // @ts-ignore
            iterable: async function* () {
                // @ts-ignore
                const iterator = (await pipe.promise)[Symbol.asyncIterator]();
                for await (const value of iterator) {
                    yield value;
                }
            },
        };
    }
}
export const createClient = factory(IPFSClient, "AAADHtX7m4wC7kFA8wMqFzowlgweBG1FgQjGTabVOMRqBA");
