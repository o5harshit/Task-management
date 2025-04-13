import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
  } from "@/components/ui/dropdown-menu";
  import { Button } from "@/components/ui/button";
  import { apiClient } from "@/lib/api-client";
  
  function TaskStatusDropdown({ taskId, currentStatus, onStatusChange }) {
    const handleStatusChange = async (newStatus) => {
      try {
        const res = await apiClient.patch(`/task/update-status/${taskId}`, {
          status: newStatus,
        }, { withCredentials: true });
  
        // Call the parent to update UI
        if (onStatusChange) {
          onStatusChange(newStatus);
        }
      } catch (err) {
        console.error("Failed to update task status", err);
      }
    };
  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Change Task Status</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {["todo", "in-progress", "done"].map((option) => (
            <DropdownMenuItem
              key={option}
              onClick={() => handleStatusChange(option)}
            >
              {option.toUpperCase()}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  
  export default TaskStatusDropdown;
  