import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { format } from "date-fns";
import {
  Edit2,
  Trash2,
  Plus,
  Calendar,
  RefreshCw,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { RootState } from "@/store/store";
import {
  setTasks,
  addTask,
  updateTask,
  deleteTask,
} from "@/store/slices/taskSlice";
import { Task } from "@/types";
import * as TaskAPI from "@/api/tasks";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoggedIn, isLoading: isAuthLoading } = useAppSelector(
    (state: RootState) => state.user
  );
  const tasks = useAppSelector((state: RootState) => state.tasks);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "title">("newest");

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [editTaskTitle, setEditTaskTitle] = useState("");
  const [editTaskDescription, setEditTaskDescription] = useState("");
  const [editTaskStatus, setEditTaskStatus] = useState(false);

  useEffect(() => {
    if (!isAuthLoading) {
      if (!isLoggedIn) {
        navigate("/login");
      } else {
        fetchTasks();
      }
    }
  }, [isLoggedIn, isAuthLoading, navigate]);

  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);
    console.log("Fetching tasks...");

    try {
      const response = await TaskAPI.getTasks();

      if (response.success) {
        dispatch(setTasks(response.data));
      } else {
        setError(response.message);
      }
      console.log("Tasks fetched successfully");
    } catch (err) {
      setError("Failed to fetch tasks. Please try again.");
    } finally {
      setIsLoading(false);
      console.log("Tasks fetching finally");
    }
  };

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await TaskAPI.addTask({
        title: newTaskTitle.trim(),
        description: newTaskDescription.trim() || null,
      });

      if (response.success) {
        dispatch(addTask(response.data));
        setNewTaskTitle("");
        setNewTaskDescription("");
        setOpenAddDialog(false);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Failed to add task. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenEditDialog = (task: Task) => {
    setEditingTask(task);
    setEditTaskTitle(task.title);
    setEditTaskDescription(task.description || "");
    setEditTaskStatus(task.status);
  };

  const handleEditTask = async () => {
    if (!editingTask || !editTaskTitle.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await TaskAPI.editTask(
        {
          title: editTaskTitle.trim(),
          description: editTaskDescription.trim() || null,
          status: editTaskStatus,
        },
        editingTask.id
      );

      if (response.success) {
        dispatch(updateTask(response.data));
        setEditingTask(null);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Failed to update task. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await TaskAPI.deleteTask(taskId);

      if (response.success) {
        dispatch(deleteTask(taskId));
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Failed to delete task. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (task: Task) => {
    try {
      const response = await TaskAPI.editTask(
        {
          title: task.title,
          description: task.description,
          status: !task.status,
        },
        task.id
      );

      if (response.success) {
        dispatch(updateTask(response.data));
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Failed to update task status. Please try again.");
    }
  };

  const filteredTasks = () => {
    let filtered = [...tasks];

    if (filter === "active") {
      filtered = filtered.filter((task) => !task.status);
    } else if (filter === "completed") {
      filtered = filtered.filter((task) => task.status);
    }

    return filtered.sort((a, b) => {
      if (sortBy === "newest") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (sortBy === "oldest") {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  };

  const completedTasksCount = tasks.filter((task) => task.status).length;
  const activeTasksCount = tasks.length - completedTasksCount;
  const completionPercentage =
    tasks.length > 0
      ? Math.round((completedTasksCount / tasks.length) * 100)
      : 0;

  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{tasks.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Task Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end space-x-2">
                <div className="text-3xl font-bold">
                  {completionPercentage}%
                </div>
                <div className="text-sm text-gray-500 mb-1">
                  ({completedTasksCount}/{tasks.length})
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Tasks Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <div>
                  <div className="text-sm text-gray-500">Active</div>
                  <div className="text-xl font-semibold">
                    {activeTasksCount}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Completed</div>
                  <div className="text-xl font-semibold">
                    {completedTasksCount}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {error && (
          <Alert className="mb-6 bg-red-50 text-red-800 border-red-200">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>My Tasks</CardTitle>
              <CardDescription>Manage your tasks</CardDescription>
            </div>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={fetchTasks}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>

              <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" /> Add Task
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                    <DialogDescription>
                      Create a new task to keep track of your work.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label htmlFor="title" className="text-sm font-medium">
                        Title
                      </label>
                      <Input
                        id="title"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        placeholder="Task title"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="description"
                        className="text-sm font-medium"
                      >
                        Description (optional)
                      </label>
                      <Textarea
                        id="description"
                        value={newTaskDescription}
                        onChange={(e) => setNewTaskDescription(e.target.value)}
                        placeholder="Add more details about this task"
                        rows={4}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setOpenAddDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddTask}
                      disabled={!newTaskTitle.trim() || isLoading}
                    >
                      {isLoading ? "Adding..." : "Add Task"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
              <Tabs
                value={filter}
                onValueChange={(value) =>
                  setFilter(value as "all" | "active" | "completed")
                }
                className="w-full sm:w-auto"
              >
                <TabsList className="grid w-full sm:w-auto grid-cols-3">
                  <TabsTrigger value="all">All ({tasks.length})</TabsTrigger>
                  <TabsTrigger value="active">
                    Active ({activeTasksCount})
                  </TabsTrigger>
                  <TabsTrigger value="completed">
                    Completed ({completedTasksCount})
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Sort by <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Sort options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSortBy("newest")}>
                    Newest first
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("oldest")}>
                    Oldest first
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("title")}>
                    By title
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {isLoading && tasks.length === 0 ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : filteredTasks().length === 0 ? (
              <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500">
                  {tasks.length === 0
                    ? "You don't have any tasks yet. Add one to get started!"
                    : "No tasks match your current filter."}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTasks().map((task) => (
                  <Card
                    key={task.id}
                    className={`overflow-hidden transition-all ${
                      task.status ? "border-green-100 bg-green-50/30" : ""
                    }`}
                  >
                    <div className="flex p-4">
                      <div className="mr-4 mt-1">
                        <Checkbox
                          checked={task.status}
                          onCheckedChange={() => handleToggleStatus(task)}
                          className={`${
                            task.status ? "bg-green-600 border-green-600" : ""
                          }`}
                        />
                      </div>
                      <div className="flex-grow">
                        <h3
                          className={`font-medium ${
                            task.status ? "line-through text-gray-500" : ""
                          }`}
                        >
                          {task.title}
                        </h3>
                        {task.description && (
                          <p
                            className={`mt-1 text-sm ${
                              task.status ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {task.description}
                          </p>
                        )}
                        <div className="mt-2 flex items-center text-xs text-gray-500 space-x-4">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {format(new Date(task.createdAt), "MMM d, yyyy")}
                          </div>
                          {task.status && (
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200"
                            >
                              Completed
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-start space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenEditDialog(task)}
                        >
                          <Edit2 className="h-4 w-4 text-gray-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteTask(task.id)}
                          disabled={isLoading}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <Dialog
        open={!!editingTask}
        onOpenChange={(open) => !open && setEditingTask(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Make changes to your task here.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="edit-title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="edit-title"
                value={editTaskTitle}
                onChange={(e) => setEditTaskTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-description" className="text-sm font-medium">
                Description (optional)
              </label>
              <Textarea
                id="edit-description"
                value={editTaskDescription}
                onChange={(e) => setEditTaskDescription(e.target.value)}
                rows={4}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="edit-status"
                checked={editTaskStatus}
                onCheckedChange={(checked) =>
                  setEditTaskStatus(checked === true)
                }
              />
              <label htmlFor="edit-status" className="text-sm font-medium">
                Mark as completed
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingTask(null)}>
              Cancel
            </Button>
            <Button
              onClick={handleEditTask}
              disabled={!editTaskTitle.trim() || isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HomePage;
