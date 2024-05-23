import { Container, VStack, Heading, Text, Button, useToast, Input, Textarea, Select, Box, FormControl, FormLabel } from "@chakra-ui/react";
import { useState } from "react";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");
  const toast = useToast();

  const addTask = () => {
    if (!title || !description || !dueDate) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newTask = { title, description, dueDate, priority };
    setTasks([...tasks, newTask]);
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("Low");

    toast({
      title: "Task Added",
      description: "Your task has been added to the list.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container centerContent maxW="container.sm" py={8}>
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl">Task Management App</Heading>
        <Text fontSize="lg">Decide the most important task for the day.</Text>

        <Box width="100%" p={4} borderWidth={1} borderRadius="lg">
          <VStack spacing={4} width="100%">
            <FormControl id="title">
              <FormLabel>Title</FormLabel>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task Title" />
            </FormControl>
            <FormControl id="description">
              <FormLabel>Description</FormLabel>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Task Description" />
            </FormControl>
            <FormControl id="dueDate">
              <FormLabel>Due Date</FormLabel>
              <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </FormControl>
            <FormControl id="priority">
              <FormLabel>Priority Level</FormLabel>
              <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Select>
            </FormControl>
            <Button colorScheme="blue" onClick={addTask}>Add Task</Button>
          </VStack>
        </Box>

        <Box width="100%" p={4} borderWidth={1} borderRadius="lg">
          <Heading as="h2" size="md" mb={4}>Task List</Heading>
          {tasks.length === 0 ? (
            <Text>No tasks added yet.</Text>
          ) : (
            tasks.map((task, index) => (
              <Box key={index} p={4} borderWidth={1} borderRadius="lg" mb={2} width="100%">
                <Heading as="h3" size="sm">{task.title}</Heading>
                <Text>{task.description}</Text>
                <Text>Due Date: {task.dueDate}</Text>
                <Text>Priority: {task.priority}</Text>
              </Box>
            ))
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;