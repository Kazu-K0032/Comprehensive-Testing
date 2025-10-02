import { Pagination } from "antd";

interface TodoPaginationProps {
  current: number;
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
}

export function TodoPagination({
  current,
  total,
  pageSize,
  onChange,
}: TodoPaginationProps) {
  // 単純な関数呼び出しのためuseCallback不要
  const handleChange = (page: number) => onChange(page);
  const showTotal = (total: number, range: [number, number]) =>
    `${range[0]}-${range[1]} / ${total} 件`;

  const containerStyle = {
    marginTop: "24px",
    marginBottom: "8px",
    display: "flex",
    justifyContent: "flex-end",
    height: "40px",
    alignItems: "center",
  };

  return (
    <div style={containerStyle}>
      <Pagination
        current={current}
        total={total}
        pageSize={pageSize}
        onChange={handleChange}
        showSizeChanger={false}
        showQuickJumper={false} // クイックジャンパーを無効化
        showTotal={showTotal}
        size="small" // サイズを固定
        simple={false} // シンプルモードを無効化
      />
    </div>
  );
}
