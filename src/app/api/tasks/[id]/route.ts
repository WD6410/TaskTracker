import Task from "@/models/Task";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { connectionDB } from "@/lib/database";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    connectionDB();

    try {
        const taskId = params.id;

        const task = await Task.findById(taskId);

        if (!task) return NextResponse.json({ message: "Task not found" }, { status: 404 });

        return NextResponse.json(task);
    } catch (error: any) {
        return NextResponse.json({ err: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    connectionDB();

    try {
        const taskId = params.id;
        const task = await Task.findByIdAndDelete(taskId);

        if (!task) return NextResponse.json({ message: "Task not found" }, { status: 404 });

        return NextResponse.json({
            msg: `!Tarea '${params.id}' eliminada!`
        });
    } catch (error: any) {
        return NextResponse.json({ err: error.message }, { status: 500 });
    }
}


export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    connectionDB();

    try {
        const taskId = params.id;
        const data = await request.json();

        const task = await Task.findByIdAndUpdate(taskId, data);

        if (!task) return NextResponse.json({ message: "Task not found" }, { status: 404 });

        return NextResponse.json({
            msg: `!Tarea '${params.id}' actualizada!`
        });
    } catch (error: any) {
        return NextResponse.json({ err: error.message }, { status: 500 });
    }
}