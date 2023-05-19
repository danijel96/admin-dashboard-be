import { connect } from "mongoose";

const connectDB = async (): Promise<void> => {
    //@ts-ignore
    const conn = await connect(process.env.MONGO_URL);

    /* eslint-disable no-console*/
    console.log(
        `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
    );
};

export default connectDB;
