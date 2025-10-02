import { Modal, Form, Input, Button } from "antd";
import { useMemo } from "react";

const { TextArea } = Input;

interface TodoEditModalProps {
  visible: boolean;
  editTitle: string;
  editDescription: string;
  setEditTitle: (title: string) => void;
  setEditDescription: (description: string) => void;
  onClose: () => void;
  onUpdate: () => void;
}

export function TodoEditModal({
  visible,
  editTitle,
  editDescription,
  setEditTitle,
  setEditDescription,
  onClose,
  onUpdate,
}: TodoEditModalProps) {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEditTitle(e.target.value);
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setEditDescription(e.target.value);

  const footer = useMemo(
    () => [
      <Button key="cancel" onClick={onClose}>
        キャンセル
      </Button>,
      <Button key="update" type="primary" onClick={onUpdate}>
        変更
      </Button>,
    ],
    [onClose, onUpdate]
  );

  return (
    <Modal
      title="TODO編集"
      open={visible}
      onCancel={onClose}
      footer={footer}
    >
      <Form layout="vertical">
        <Form.Item label="タイトル">
          <Input
            value={editTitle}
            onChange={handleTitleChange}
            placeholder="TODOのタイトルを入力"
          />
        </Form.Item>
        <Form.Item label="詳細">
          <TextArea
            value={editDescription}
            onChange={handleDescriptionChange}
            placeholder="TODOの詳細を入力"
            rows={4}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
