import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CreateTaskRequest } from "@/types/task.types";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get("accountId");

    if (!accountId) {
      return NextResponse.json(
        {
          success: false,
          error: "accountIdが必要です",
        },
        { status: 400 }
      );
    }

    const tasks = await prisma.task.findMany({
      where: {
        accountId,
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error("タスク取得エラー:", error);
    return NextResponse.json(
      {
        success: false,
        error: "タスクの取得に失敗しました",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateTaskRequest = await request.json();
    const { title, description, accountId } = body;

    if (!title || !description || !accountId) {
      return NextResponse.json(
        {
          success: false,
          error: "title, description, accountIdが必要です",
        },
        { status: 400 }
      );
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        accountId,
        status: "TODO",
      },
    });

    return NextResponse.json({
      success: true,
      task,
    });
  } catch (error) {
    console.error("タスク作成エラー:", error);
    return NextResponse.json(
      {
        success: false,
        error: "タスクの作成に失敗しました",
      },
      { status: 500 }
    );
  }
}
