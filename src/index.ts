import { Client, factory } from "@lumeweb/libkernel-universal";
import defer from "p-defer";
import { CatOptions, LsOptions, StatOptions } from "@helia/unixfs";

interface AbortableGenerator {
  abort: () => void;
  iterable: AsyncGenerator<object>;
}

export class IPFSClient extends Client {
  public async ready() {
    return this.callModuleReturn("ready");
  }

  public async stat(cid: string, options?: Partial<StatOptions>) {
    return this.callModuleReturn("stat", { options });
  }

  public ls(cid: string, options?: Partial<LsOptions>): AbortableGenerator {
    return this.connectModuleGenerator("ls", { cid, options });
  }

  public cat(cid: string, options?: Partial<CatOptions>): AbortableGenerator {
    return this.connectModuleGenerator("cat", { cid, options });
  }

  public async ipns(cid: string): Promise<string> {
    return this.callModuleReturn("ipnsResolve");
  }

  public async activePeers(): Promise<number> {
    return this.callModuleReturn("getActivePeers");
  }

  private connectModuleGenerator(
    method: string,
    data: any
  ): AbortableGenerator {
    const pipe = defer();

    let done = false;

    const [update, result] = this.connectModule(method, data, (item: any) => {
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
      iterable: async function* (): AsyncGenerator<object> {
        // @ts-ignore
        const iterator = (await pipe.promise)[Symbol.asyncIterator]();
        for await (const value of iterator) {
          yield value as object;
        }
      },
    };
  }
}

export const createClient = factory<IPFSClient>(
  IPFSClient,
  "AAChdANbL0wYGNUJsH7zfa6tCSnhGQItgCeGf-KJlw2Pew"
);
