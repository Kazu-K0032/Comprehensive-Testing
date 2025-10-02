import { NextRequest, NextResponse } from "next/server";
import { setSelectedAccountId, clearSelectedAccountId } from "@/lib/cookies";

/**
 * アカウント選択API
 * POST: アカウントを選択
 * DELETE: アカウント選択を解除
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { accountId } = body;

    if (!accountId) {
      return NextResponse.json(
        {
          success: false,
          error: "アカウントIDが必要です",
        },
        { status: 400 }
      );
    }

    await setSelectedAccountId(accountId);

    return NextResponse.json({
      success: true,
      message: "アカウントが選択されました",
    });
  } catch (error) {
    console.error("アカウント選択エラー:", error);
    return NextResponse.json(
      {
        success: false,
        error: "アカウントの選択に失敗しました",
      },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    await clearSelectedAccountId();

    return NextResponse.json({
      success: true,
      message: "アカウント選択が解除されました",
    });
  } catch (error) {
    console.error("アカウント選択解除エラー:", error);
    return NextResponse.json(
      {
        success: false,
        error: "アカウント選択の解除に失敗しました",
      },
      { status: 500 }
    );
  }
}
