import { Card, Space, Input, Button } from "antd";

const { TextArea } = Input;

interface AddFormProps {
  newTitle: string;
  newDescription: string;
  setNewTitle: (title: string) => void;
  setNewDescription: (description: string) => void;
  handleAddTodo: () => void;
}

export function AddForm({
  newTitle,
  newDescription,
  setNewTitle,
  setNewDescription,
  handleAddTodo,
}: AddFormProps) {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewTitle(e.target.value);
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setNewDescription(e.target.value);

  return (
    <Card
      title="新しいTODOを追加"
      style={{ marginBottom: "24px", width: "100%" }}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Input
          placeholder="TODOのタイトルを入力"
          value={newTitle}
          onChange={handleTitleChange}
          onPressEnter={handleAddTodo}
        />
        <TextArea
          placeholder="TODOの詳細を入力（任意）"
          value={newDescription}
          onChange={handleDescriptionChange}
          rows={3}
        />
        <Button type="primary" onClick={handleAddTodo}>
          追加
        </Button>
      </Space>
    </Card>
  );
}
