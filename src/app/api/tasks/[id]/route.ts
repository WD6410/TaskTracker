import Task from "@/models/Task";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { connectionDB } from "@/lib/database";
import { auth } from "@clerk/nextjs";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    connectionDB();

    try {
        const { userId } = auth();

        const taskId = params.id;
        const task = await Task.findById(taskId);

        if (!task) return NextResponse.json({ msg: "Task not found" }, { status: 404 });

        if (!userId || userId !== task.uid) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        return NextResponse.json(task);
    } catch (error: any) {
        return NextResponse.json({ err: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    connectionDB();

    try {
        const { userId } = auth();

        const taskId = params.id;
        const task = await Task.findById(taskId);

        if (!task) return NextResponse.json({ msg: "Task not found" }, { status: 404 });

        if (!userId || userId !== task.uid) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        await Task.deleteOne({ _id: taskId })

        return NextResponse.json({
            msg: `!Tarea eliminada!`
        });
    } catch (error: any) {
        return NextResponse.json({ err: error.message }, { status: 500 });
    }
}


export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    connectionDB();

    try {
        const { userId } = auth();

        const taskId = params.id;
        const data = await request.json();
        const task = await Task.findById(taskId);

        if (!task) return NextResponse.json({ msg: "Task not found" }, { status: 404 });

        if (!userId || userId !== task.uid) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (task.title !== data.title && await Task.findOne({ title: data.title })) {
            return NextResponse.json({ msg: "Task already exist" }, { status: 409 });
        }

        await Task.findByIdAndUpdate(taskId, data);

        return NextResponse.json({
            msg: `!Tarea actualizada!`
        });
    } catch (error: any) {
        return NextResponse.json({ err: error.message }, { status: 500 });
    }
}