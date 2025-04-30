import { IconLoader3 } from "@tabler/icons-react";

export default function LoadingScene() {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center h-screen w-screen z-50 bg-gray-300 text-gray-900 dark:bg-gray-900 dark:text-gray-300">
      <div className="flex items-center gap-2">
        <div>Loading</div>
        <IconLoader3 className="animate-spin" />
      </div>
    </div>
  );
}
