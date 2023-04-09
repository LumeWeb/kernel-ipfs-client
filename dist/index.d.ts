import { Client } from "@lumeweb/libkernel-universal";
import { CatOptions, LsOptions, StatOptions } from "@helia/unixfs";
interface AbortableGenerator {
    abort: () => void;
    iterable: () => AsyncIterable<Uint8Array>;
}
export declare class IPFSClient extends Client {
    ready(): Promise<any>;
    stat(cid: string, options?: Partial<StatOptions>): Promise<any>;
    ls(cid: string, options?: Partial<LsOptions>): AbortableGenerator;
    cat(cid: string, options?: Partial<CatOptions>): AbortableGenerator;
    ipns(cid: string): Promise<string>;
    activePeers(): Promise<number>;
    private connectModuleGenerator;
}
export declare const createClient: (...args: any) => IPFSClient;
export {};
//# sourceMappingURL=index.d.ts.map