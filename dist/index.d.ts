import { Client } from "@lumeweb/libkernel-universal";
interface AbortableGenerator {
    abort: () => void;
    iterable: AsyncGenerator<object>;
}
export declare class IPFSClient extends Client {
    ready(): Promise<any>;
    stat(cid: string): Promise<any>;
    ls(cid: string): AbortableGenerator;
    cat(cid: string): AbortableGenerator;
    ipns(cid: string): Promise<string>;
    activePeers(): Promise<number>;
    private connectModuleGenerator;
}
export declare const createClient: (...args: any) => IPFSClient;
export {};
//# sourceMappingURL=index.d.ts.map