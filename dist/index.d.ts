import type { DataFn } from "libskynet";
export declare function refreshGatewayList(): Promise<any>;
export declare function fetchIpfs(hash: string, path: string | undefined, headers: {} | undefined, receiveUpdate: DataFn): Promise<any>;
export declare function statIpfs(hash: string, path?: string, headers?: {}): Promise<any>;
export declare function fetchIpns(hash: string, path: string | undefined, headers: {} | undefined, receiveUpdate: DataFn): Promise<any>;
export declare function statIpns(hash: string, path?: string, headers?: {}): Promise<any>;
//# sourceMappingURL=index.d.ts.map