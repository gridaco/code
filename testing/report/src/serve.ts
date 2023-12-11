import { createServer } from "http";
import { promisify } from "util";
import handler from "serve-handler";

export function fsserver(path: string) {
  // fileserver for puppeteer to load local files
  const fileserver = createServer((request, response) => {
    return handler(request, response, {
      public: path,
      symlinks: true,
    });
  });

  // Promisify the listen and close methods
  const listen = promisify(fileserver.listen.bind(fileserver));
  const close = promisify(fileserver.close.bind(fileserver));

  return {
    listen,
    close,
  };
}
