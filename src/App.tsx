import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  Grow,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./app/store";
import {
  increment,
  usePomodoroSelector,
  create,
  deleteOne,
} from "./features/pomodoro/pomodoroSlice";
import { AiTwotoneDelete } from "react-icons/ai";
import { TransitionGroup } from "react-transition-group";
const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pomodoro = usePomodoroSelector();
  const handleNewPomodoro = () => {
    dispatch(create());
  };

  useEffect(() => {
    let timer: any;
    if (pomodoro.currentTime === 180 && pomodoro.status === "idle") {
      clearInterval(timer);
      console.log("here");
      dispatch(create());
    } else {
      timer = setInterval(() => {
        dispatch(increment());
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [pomodoro]);

  const handleDelete = (id: string) => {
    dispatch(deleteOne({ id }));
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      minHeight="100vh"
      justifyContent="center"
      gap={2}
    >
      <Box
        sx={{ position: "relative", height: "200px" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress
          variant="determinate"
          value={(pomodoro.currentTime / 180) * 100}
          size={200}
          sx={{ position: "absolute", top: 0 }}
        />
        <Typography variant="h1">{pomodoro.currentTime}</Typography>
      </Box>
      <Grow in={pomodoro.status !== "loading"}>
        <Button variant="contained" onClick={handleNewPomodoro}>
          Start Pomodoro Timer
        </Button>
      </Grow>
      <Grow in={pomodoro.status === "loading"}>
        <CircularProgress />
      </Grow>

      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <TransitionGroup>
          {pomodoro.list.map(({ time, id }) => (
            <Collapse>
              <ListItem
                secondaryAction={
                  <IconButton
                    onClick={() => handleDelete(id)}
                    edge="end"
                    aria-label="delete"
                  >
                    <AiTwotoneDelete />
                  </IconButton>
                }
              >
                <ListItemText
                  primary="Ciclo de pomodoro"
                  secondary={`Tempo: ${time}s`}
                />
              </ListItem>
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
    </Box>
  );
};

export default App;
