import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "../../validationSchemas";
import { getServerSession } from 'next-auth'
import { authOptions } from "@/app/auth/AuthOptions";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const validation = issueSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }
    // Create the issue
    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description,
        }
    })
    return NextResponse.json(newIssue, { status: 201 });
}

