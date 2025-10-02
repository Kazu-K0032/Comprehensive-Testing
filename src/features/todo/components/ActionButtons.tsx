import { Button } from "antd";

interface ActionButtonsProps {
  completedCount: number;
  onDeleteCompleted: () => void;
}

export function ActionButtons({
  completedCount,
  onDeleteCompleted,
}: ActionButtonsProps) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <Button
        danger
        onClick={onDeleteCompleted}
        disabled={completedCount === 0}
      >
        完了済みTODOを削除
      </Button>
    </div>
  );
}
