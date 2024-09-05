import { ListItem, ListItemText, IconButton, Checkbox, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TodoItem = ({ todo, onDelete, onUpdate }) => {
    console.log(todo);
    

    const handleDelete = () => {
        onDelete(todo.id);
    };
    const handleToggleStatus = async () => {
        const updatedTodo = { ...todo, status: !todo.status };
        onUpdate(updatedTodo);
    };

    return (
        <>
        <ListItem
            secondaryAction={
                <>
                    <IconButton edge="end" aria-label="edit" >
                        <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                </>
            }
            divider
        >
            <Checkbox
                edge="start"
                checked={todo.status}
                onChange={handleToggleStatus}
                tabIndex={-1}
                disableRipple
            />
            <ListItemText
                primary={
                    <Typography
                        variant="h6"
                        style={{ textDecoration: todo.status ? 'line-through' : 'none' }}
                    >
                        {todo.title}
                    </Typography>
                }
                secondary={
                    <Box>
                        <Typography variant="body2" color="textSecondary">
                            {todo.description}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                            Status: {todo.status ? 'Completed' : 'Pending'}
                        </Typography>
                    </Box>
                }
            />
        </ListItem>
    </>
    );
};

export default TodoItem;
