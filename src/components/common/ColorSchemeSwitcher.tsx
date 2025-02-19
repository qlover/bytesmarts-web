import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useCallback } from "react";
import { ThemeValueType } from "../ThemeContainer";
import { ThemeValues } from "../ThemeContainer/conts";
import IconFont from "./IconFont";
import { useApp } from "../app-provider";
import { appStore } from "@/store";

const iconFontsMaps = {
  [ThemeValues.LIGHT]: "icon-qingtian",
  [ThemeValues.DARK]: "icon-yueliang",
  [ThemeValues.SYSTEM]: "icon-system",
} as const;

export const ColorSchemeSwitcher = () => {
  const { theme, setTheme } = useApp();
  const fixScrollPadding = () => {
    if (document.documentElement.classList.contains("scroll-padding")) {
      document.documentElement.classList.remove("scroll-padding");
    } else {
      document.documentElement.classList.add("scroll-padding");
    }
  };
  console.log("theme", theme);

  const onChangeTheme = useCallback(
    (theme: ThemeValueType) => {
      return () => {
        setTheme(theme);
      };
    },
    [theme],
  );

  return (
    <DropdownMenu.Root onOpenChange={fixScrollPadding}>
      <DropdownMenu.Trigger className="flex h-8 items-center rounded-md bg-transparent px-3 text-text-primary  hover:bg-gray-50 hover:text-slate-500 dark:text-slate-500 dark:hover:bg-gray-900 dark:hover:text-slate-400">
        <span className="block w-4">
          <IconFont type={iconFontsMaps[theme]} />
        </span>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="z-100 rounded-md border border-gray-100 bg-gray-50 p-2 dark:border-gray-800 dark:bg-gray-900">
        <DropdownMenu.Item
          onSelect={onChangeTheme(ThemeValues.LIGHT)}
          className={`group flex h-8 cursor-pointer items-center space-x-4 rounded-md px-3 text-sm font-medium leading-none hover:outline-none ${
            theme == ThemeValues.LIGHT
              ? "bg-violet-50 text-violet-900 dark:bg-violet-500/20 dark:text-violet-50"
              : "text-slate-500 hover:bg-gray-50 hover:text-slate-600 dark:text-slate-400 dark:hover:bg-gray-900 dark:hover:text-slate-300"
          }`}
        >
          <span className="block w-4">
            <IconFont type="icon-qingtian" />
          </span>
          <span>Light</span>
        </DropdownMenu.Item>
        <DropdownMenu.Item
          onSelect={onChangeTheme(ThemeValues.DARK)}
          className={`group flex h-8 cursor-pointer items-center space-x-4 rounded-md bg-transparent px-3 text-sm font-medium leading-none hover:outline-none ${
            theme == ThemeValues.DARK
              ? "bg-violet-50 text-violet-900 dark:bg-violet-500/20 dark:text-violet-50"
              : "text-slate-500 hover:bg-gray-50 hover:text-slate-600 dark:text-slate-400 dark:hover:bg-gray-900 dark:hover:text-slate-300"
          }`}
        >
          <span className="block w-4">
            <IconFont type="icon-yueliang" />
          </span>
          <span>Dark</span>
        </DropdownMenu.Item>
        <DropdownMenu.Item
          onSelect={onChangeTheme(ThemeValues.SYSTEM)}
          className={`group flex h-8 cursor-pointer items-center space-x-4 rounded-md bg-transparent px-3 text-sm font-medium leading-none hover:outline-none ${
            theme == "system"
              ? "bg-violet-50 text-violet-900 dark:bg-violet-500/20 dark:text-violet-50"
              : "text-slate-500 hover:bg-gray-50 hover:text-slate-600 dark:text-slate-400 dark:hover:bg-gray-900 dark:hover:text-slate-300"
          }`}
        >
          <span className="block w-4">
            <IconFont type="icon-system" />
          </span>
          <span>System</span>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
