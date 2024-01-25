import mongoose from "mongoose";

const conn = {
    isConnected: mongoose.ConnectionStates.disconnected
};

export const connectionDB = async () => {
    const uri = process.env.MONGODB_ATLAS_URI;
    if (!uri) {
        console.log("La URI de MongoDB no está definida.");
        return;
    }

    if (conn.isConnected === mongoose.ConnectionStates.connected) return;

    try {
        const db = await mongoose.connect(uri);
        console.log(`Conectado a MongoDB '${db.connection.name}'`);

        conn.isConnected = db.connections[0].readyState;
    } catch (error: any) {
        console.log(error.message);
    }
};