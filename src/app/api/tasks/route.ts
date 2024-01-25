import Task from "@/models/Task";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { connectionDB } from "@/lib/database";

export async function GET() {
    connectionDB()

    try {
        const tasks = await Task.find().lean();

        return NextResponse.json(tasks);
    } catch (error: any) {
        return NextResponse.json({ err: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    connectionDB()

    try {
        const data = await req.json();

        const task = new Task(data);
        await task.save();
        console.log(task);

        return NextResponse.json({
            msg: "!Se creo la tarea!"
        }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ err: error.message }, { status: 500 });
    }
}