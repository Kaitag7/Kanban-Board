import { DeleteIcon } from '@chakra-ui/icons';
import { TaskModel } from '../utils/models';
import { Box, IconButton, Textarea } from '@chakra-ui/react';
import { AutoResizeTextArea } from './AutoResizeTextArea';
import { useTaskDragAndDrop } from '../hooks/useTaskDragAndDrop';

type TaskProps = {
  index: number;
  task: TaskModel;
  onDelete: (id: TaskModel['id']) => void;
  onUpdate: (id: TaskModel['id'], updatedTask: TaskModel) => void;
  onDropHover: (i: number, j: number) => void;
};

const Task = ({ index, task, onDelete, onUpdate, onDropHover }: TaskProps) => {
  const { ref, isDragging } = useTaskDragAndDrop<HTMLDivElement>({
    task,
    index,
    handleDropHover: onDropHover,
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTitle = e.target.value;
    onUpdate(task.id, { ...task, title: newTitle });
  };

  const handleDeleteClick = () => {
    onDelete(task.id);
  };

  return (
    <Box
      ref={ref}
      as="div"
      role="group"
      position="relative"
      rounded="lg"
      w={200}
      pl={3}
      pr={7}
      pt={3}
      pb={1}
      boxShadow="xl"
      cursor="grab"
      bgColor={task.color}
      opacity={isDragging ? 0.5 : 1}
    >
      <IconButton
        position="absolute"
        top={0}
        right={0}
        zIndex={100}
        aria-label="delete-task"
        size="md"
        colorScheme="solid"
        color="gray.700"
        icon={<DeleteIcon />}
        opacity={0}
        _groupHover={{
          opacity: 1,
        }}
        onClick={handleDeleteClick}
      />

      <AutoResizeTextArea
        value={task.title}
        fontWeight="semibold"
        cursor="inherit"
        border="none"
        p={0}
        resize="none"
        minH={70}
        maxH={200}
        focusBorderColor="none"
        color="gray.700"
        onChange={handleTitleChange}
      />
    </Box>
  );
};

export default Task;
