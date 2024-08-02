import "dotenv/config";
import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes/index";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/products";
const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

const corsOptions = {
    AccessControlAllowOrigin: "*",
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server running on http://localhost:${PORT}`)
        )
    )
    .catch((error) => {
        throw error;
    });

routes(app);
app.use(productRoutes)
