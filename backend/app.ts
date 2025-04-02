import express from "express";
import { getPort } from "./utils/getSecrets";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";
import router from "./routers";
const PORT = getPort();
const app = express();

app.use(express.json());

app.use("/api", router);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
