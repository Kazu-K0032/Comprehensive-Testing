import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const accounts = await prisma.account.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      accounts,
    });
  } catch (error) {
    console.error("アカウント取得エラー:", error);
    return NextResponse.json(
      {
        success: false,
        error: "アカウントの取得に失敗しました",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { accountName, icon } = body;

    if (!accountName || !icon) {
      return NextResponse.json(
        {
          success: false,
          error: "アカウント名とアイコンは必須です",
        },
        { status: 400 }
      );
    }

    const account = await prisma.account.create({
      data: {
        accountName,
        icon,
      },
    });

    return NextResponse.json({
      success: true,
      account,
    });
  } catch (error) {
    console.error("アカウント作成エラー:", error);
    return NextResponse.json(
      {
        success: false,
        error: "アカウントの作成に失敗しました",
      },
      { status: 500 }
    );
  }
}
