/**
 * LoadingSpinnerコンポーネントのテスト
 * pnpm test src/components/LoadingSpinner.test.tsx
 * ウォッチモード
 * pnpm test src/components/LoadingSpinner.test.tsx --watch
 * レポート作成
 * pnpm test src/components/LoadingSpinner.test.tsx --coverage
 */

import { render, screen } from "@testing-library/react";
import { LoadingSpinner } from "./LoadingSpinner";

describe("LoadingSpinner", () => {
  test("基本表示", () => {
    render(<LoadingSpinner />);
    // 要素がDOMに存在するかどうか
    expect(screen.getByText("読み込み中...")).toBeInTheDocument();
  });

  test("サイズ指定", () => {
    render(<LoadingSpinner size="small" />);
    expect(screen.getByText("読み込み中...")).toBeInTheDocument();
  });

  test("ティップ指定", () => {
    render(<LoadingSpinner tip="ローディング中..." />);
    expect(screen.getByText("ローディング中...")).toBeInTheDocument();
  });

  test("スピニング指定", () => {
    render(<LoadingSpinner spinning={false} />);
    expect(screen.getByText("読み込み中...")).toBeInTheDocument();
    expect(screen.queryByText("ローディング中...")).not.toBeInTheDocument();
  });

  test("子要素指定", () => {
    render(<LoadingSpinner>ローディング中...</LoadingSpinner>);
    expect(screen.getByText("ローディング中...")).toBeInTheDocument();
  });

  test("異常系 - 無効なサイズ", () => {
    // @ts-ignore
    render(<LoadingSpinner size="invalid" />);
    expect(screen.getByText(/読み込み中/)).toBeInTheDocument();
  });

  test("異常系 - 無効なtip", () => {
    // @ts-ignore
    render(<LoadingSpinner tip="invalid" />);
    expect(screen.getByText(/invalid/)).toBeInTheDocument();
  });

  test("異常系 - spinning=false", () => {
    // @ts-ignore
    render(<LoadingSpinner spinning={false} />);
    expect(screen.getByText(/読み込み中/)).toBeInTheDocument();
  });
});
