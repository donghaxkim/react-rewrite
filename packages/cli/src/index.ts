// packages/cli/src/index.ts
import { program } from "commander";
import chalk from "chalk";
import open from "open";
import { detect, healthCheck } from "./detect.js";
import { createProxyServer } from "./inject.js";
import { createSketchServer } from "./server.js";
import { getAvailablePort } from "./utils.js";

program
  .name("sketch-ui")
  .description("Visual overlay for React dev servers")
  .argument("[port]", "Dev server port override")
  .option("--no-open", "Don't open browser automatically")
  .option("--host <host>", "Dev server host", "localhost")
  .action(async (portArg?: string) => {
    try {
      const opts = program.opts();
      const host = opts.host || "localhost";

      console.log(chalk.cyan("\n  SketchUI") + chalk.dim(" — Phase 1\n"));

      // Detect framework
      const detection = await detect();
      const targetPort = portArg ? parseInt(portArg, 10) : detection.port;

      console.log(
        chalk.dim("  Framework: ") + chalk.white(detection.framework)
      );
      console.log(
        chalk.dim("  Dev server: ") +
          chalk.white(`http://${host}:${targetPort}`)
      );

      // Health check
      console.log(chalk.dim("  Checking dev server..."));
      await healthCheck(targetPort, host);

      // Start WebSocket server
      const wsPort = await getAvailablePort(3457);
      const sketchServer = createSketchServer(wsPort);

      // Start proxy server
      const proxyPort = await getAvailablePort(3456);
      const proxyServer = createProxyServer({
        targetPort,
        targetHost: host,
        proxyPort,
        wsPort,
        getActiveClient: sketchServer.getActiveClient,
      });

      proxyServer.listen(proxyPort, () => {
        console.log(
          chalk.dim("  Proxy: ") +
            chalk.green(`http://localhost:${proxyPort}`)
        );
        console.log(
          chalk.dim("  WebSocket: ") + chalk.green(`ws://localhost:${wsPort}`)
        );
        console.log(
          chalk.dim("\n  Press ") +
            chalk.white("Ctrl+C") +
            chalk.dim(" to stop\n")
        );

        if (program.opts().open !== false) {
          open(`http://localhost:${proxyPort}`);
        }
      });

      // Graceful shutdown
      const shutdown = () => {
        console.log(chalk.dim("\n  Shutting down...\n"));
        proxyServer.close();
        sketchServer.close();
        process.exit(0);
      };

      process.on("SIGINT", shutdown);
      process.on("SIGTERM", shutdown);
    } catch (err) {
      console.error(
        chalk.red("\n  Error: ") +
          (err instanceof Error ? err.message : String(err)) +
          "\n"
      );
      process.exit(1);
    }
  });

program.parse();
