// packages/cli/src/index.ts
import { program } from "commander";
import chalk from "chalk";
import open from "open";
import { detect, healthCheck } from "./detect.js";
import { createProxyServer } from "./inject.js";
import { createSketchServer } from "./server.js";
import { getAvailablePort } from "./utils.js";
import { logger, setLogLevel } from "./logger.js";

program
  .name("react-rewrite")
  .description("Visual overlay for React dev servers")
  .argument("[port]", "Dev server port override")
  .option("--no-open", "Don't open browser automatically")
  .option("--host <host>", "Dev server host", "localhost")
  .option("--verbose", "Enable debug logging")
  .action(async (portArg?: string) => {
    try {
      const opts = program.opts();
      if (opts.verbose || process.env.LOG_LEVEL === "debug") {
        setLogLevel("debug");
      }
      const host = opts.host || "localhost";

      logger.info(chalk.cyan("\n  ReactRewrite") + chalk.dim(" — React visual overlay\n"));

      // Detect framework
      const detection = await detect();
      const targetPort = portArg ? parseInt(portArg, 10) : detection.port;

      logger.info(
        chalk.dim("  Framework: ") + chalk.white(detection.framework)
      );
      logger.info(
        chalk.dim("  Dev server: ") +
          chalk.white(`http://${host}:${targetPort}`)
      );

      // Health check
      logger.info(chalk.dim("  Checking dev server..."));
      await healthCheck(targetPort, host);

      // Start WebSocket server
      const wsPort = await getAvailablePort(3457);
      const sketchServer = createSketchServer({ port: wsPort });

      // Start proxy server
      const proxyPort = await getAvailablePort(3456);
      const proxyServer = createProxyServer({
        targetPort,
        targetHost: host,
        proxyPort,
        wsPort,
        projectRoot: detection.projectRoot,
        getActiveClient: sketchServer.getActiveClient,
      });

      proxyServer.listen(proxyPort, () => {
        logger.info(
          chalk.dim("  Proxy: ") +
            chalk.green(`http://localhost:${proxyPort}`)
        );
        logger.info(
          chalk.dim("  WebSocket: ") + chalk.green(`ws://localhost:${wsPort}`)
        );
        logger.info(
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
        logger.info(chalk.dim("\n  Shutting down...\n"));
        proxyServer.close();
        sketchServer.close();
        process.exit(0);
      };

      process.on("SIGINT", shutdown);
      process.on("SIGTERM", shutdown);
    } catch (err) {
      logger.error(
        chalk.red("\n  Error: ") +
          (err instanceof Error ? err.message : String(err)) +
          "\n"
      );
      process.exit(1);
    }
  });

program.parse();
