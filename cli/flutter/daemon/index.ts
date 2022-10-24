import Daemon from "@flutter-daemon/server";

export function startFlutterDaemonServer() {
  const server = new Daemon();
  server.listen({});
}
