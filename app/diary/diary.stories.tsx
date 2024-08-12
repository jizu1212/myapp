import type { Meta, StoryObj } from "@storybook/react";

import Diary from "@/app/diary/diary";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Diary> = {
  title: "Component/Diary",

  component: Diary,
};

export default meta;
type Story = StoryObj<typeof Diary>;

export const FirstStory: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};
