import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"

export const statuses = [
  {
    value: "todo",
    label: "Todo",
    color: "text-green-500",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "In Progress",
    color: "text-yellow-500",
    icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "Done",
    color: "text-violet-500",
    icon: CheckCircledIcon,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];