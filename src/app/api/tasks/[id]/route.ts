import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import prisma from "@/lib/database";
import { auth } from "@clerk/nextjs";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { userId } = auth();

        const taskId = params.id;
        const task = await prisma.task.findUnique({
            where: { id: taskId }
        });

        if (!task) return NextResponse.json({ msg: "Task not found" }, { status: 404 });

        if (!userId || userId !== task.uid) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        return NextResponse.json(task);
    } catch (error: any) {
        return NextResponse.json({ err: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { userId } = auth();

        const taskId = params.id;
        const task = await prisma.task.findUnique({
            where: { id: taskId }
        });

        if (!task) return NextResponse.json({ msg: "Task not found" }, { status: 404 });

        if (!userId || userId !== task.uid) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await prisma.task.delete({
            where: { id: taskId }
        });

        return NextResponse.json({
            msg: `Task deleted successfully`
        });
    } catch (error: any) {
        return NextResponse.json({ err: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { userId } = auth();

        const taskId = params.id;
        const data = await request.json();
        const task = await prisma.task.findUnique({
            where: { id: taskId }
        });

        if (!task) return NextResponse.json({ msg: "Task not found" }, { status: 404 });

        if (!userId || userId !== task.uid) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (task.title !== data.title && await prisma.task.findUnique({ where: { title: data.title } })) {
            return NextResponse.json({ msg: "Task already exist" }, { status: 409 });
        }

        await prisma.task.update({
            where: { id: taskId },
            data: data
        });

        return NextResponse.json({
            msg: `Task updated successfully`
        });
    } catch (error: any) {
        return NextResponse.json({ err: error.message }, { status: 500 });
    }
}