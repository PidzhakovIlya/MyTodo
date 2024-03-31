import type {Meta, StoryObj} from "@storybook/react";
import {fn} from "@storybook/test";
import {Task} from "../components/Task/Task";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Task> = {
    title: "TODOLIST/Task",
    component: Task,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: "centered",
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        removeTask: {
            description: "Delete task",
            action: "click"
        },
        changeTaskStatus: {
            description: "Task status changed",
            action: "click"
        },
        changeTaskTitle: {
            description: "Title changed",
            action: "Title changed inside Task"
        },

    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: {
        task: {id: "12wsdewfijdei", title: "JS", isDone: false},
        todolistId: "fgdosrg8rgjuh"
    }
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskStories: Story = {}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
