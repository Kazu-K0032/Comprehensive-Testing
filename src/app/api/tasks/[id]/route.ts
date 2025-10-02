import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { UpdateTaskRequest } from "@/types/task.types";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const task = await prisma.task.findFirst({
      where: {
        id: params.id,
        deletedAt: null,
      },
    });

    if (!task) {
      return NextResponse.json(
        {
          success: false,
          error: "タスクが見つかりません",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      task,
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body: UpdateTaskRequest = await request.json();

    const task = await prisma.task.update({
      where: {
        id: params.id,
      },
      data: body,
    });

    return NextResponse.json({
      success: true,
      task,
    });
  } catch (error) {
    console.error("タスク更新エラー:", error);
    return NextResponse.json(
      {
        success: false,
        error: "タスクの更新に失敗しました",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // ソフトデリート（deletedAtを設定）
    await prisma.task.update({
      where: {
        id: params.id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("タスク削除エラー:", error);
    return NextResponse.json(
      {
        success: false,
        error: "タスクの削除に失敗しました",
      },
      { status: 500 }
    );
  }
}
