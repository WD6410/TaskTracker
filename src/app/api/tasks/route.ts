import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import prisma from "@/lib/database"
import { auth } from "@clerk/nextjs";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const { userId } = auth();
        data.uid = userId;

        let task = await prisma.task.findUnique({
            where: { title: data.title }
        });

        if (task) return NextResponse.json({ msg: "Task already exist" }, { status: 409 });

        task = await prisma.task.create({ data });

        return NextResponse.json({
            msg: "!Task created successfully!"
        }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ err: error.message }, { status: 500 });
    }
}