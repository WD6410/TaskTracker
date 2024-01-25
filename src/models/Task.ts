import { Schema, model, Document, models, Model } from "mongoose";

export interface ITask extends Document {
    title: string;
    description: string;
    dtc: Date;
    createdAt: Date;
    done: boolean;
}

const taskSchema: Schema<ITask> = new Schema({
    title: {
        type: String,
        required: [true, "El título es requerido"],
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: [true, "La descripción es requerida"],
        trim: true,
    },
    dtc: {
        type: Date,
        required: [true, "La fecha a completar es requerida"]
    },
    done: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});

const Task: Model<ITask> = models.Task as Model<ITask> || model<ITask>("Task", taskSchema);

export default Task;
