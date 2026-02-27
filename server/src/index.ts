import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"
import cors from "cors"
import express from "express"
import http from "http"
import { resolvers } from "./resolvers"
import { typeDefs } from "./typeDefs"

const startServer = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    formatError: err => {
      console.error("GraphQL error:", err)
      return {
        message: err.message,
        code: err.extensions?.code || "INTERNAL_SERVER_ERROR",
        path: err.path,
        locations: err.locations,
      }
    },
  })

  await server.start()

  // CORS middleware for preflight requests
  app.options("*", cors())

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server)
  )

  // Global error handling middleware (must come after routes)
  app.use(
    (
      err: Error,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      console.error("Unhandled error:", err)
      res.status(500).json({
        error: "Internal server error",
        message:
          process.env.NODE_ENV === "development"
            ? err.message
            : "Something went wrong",
      })
    }
  )

  // 404 handler (must come last)
  app.use("*", (req, res) => {
    res.status(404).json({
      error: "Not found",
      message: `Route ${req.originalUrl} not found`,
    })
  })

  const PORT = process.env.PORT || 4000

  await new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve))

  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`)
}

// Handle uncaught exceptions
process.on("uncaughtException", err => {
  console.error("Uncaught Exception:", err)
  process.exit(1)
})

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason)
  process.exit(1)
})

// Handle graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully")
  process.exit(0)
})

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully")
  process.exit(0)
})

startServer().catch(err => {
  console.error("Error starting server:", err)
  process.exit(1)
})
