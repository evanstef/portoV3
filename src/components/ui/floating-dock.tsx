/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
    </>
  );
};

// const FloatingDockMobile = ({
//   items,
//   className,
// }: {
//   items: { title: string; icon: React.ReactNode; href: string }[];
//   className?: string;
// }) => {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className={cn("relative block md:hidden", className)}>
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             layoutId="nav"
//             className="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2">
//             {items.map((item, idx) => (
//               <motion.div
//                 key={item.title}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{
//                   opacity: 1,
//                   y: 0,
//                 }}
//                 exit={{
//                   opacity: 0,
//                   y: 10,
//                   transition: {
//                     delay: idx * 0.05,
//                   },
//                 }}
//                 transition={{ delay: (items.length - 1 - idx) * 0.05 }}>
//                 <Link
//                   href={item.href}
//                   key={item.title}
//                   className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-900 flex items-center justify-center">
//                   <div className="h-4 w-4">{item.icon}</div>
//                 </Link>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence>
//       <button
//         onClick={() => setOpen(!open)}
//         className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-800 flex items-center justify-center">
//         <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
//       </button>
//     </div>
//   );
// };

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto flex h-[60px] gap-4 items-end rounded-md bg-gray-300 dark:bg-gray-900 border border-gray-900 dark:border-gray-300 px-3 pb-3",
        className
      )}>
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname(); // Get current pathname
  const isActive = pathname === href;

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [35, 75, 35]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [35, 75, 35]);

  const widthTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [15, 35, 15]
  );
  const heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [15, 35, 15]
  );

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  // Determine background color based on active state
  const bgColor = isActive
    ? "bg-white dark:bg-black"
    : "bg-gray-900 dark:bg-gray-300";
  // Determine icon color based on active state
  const iconColorClass = isActive
    ? "text-gray-900 dark:text-gray-300"
    : "text-gray-300 dark:text-gray-900";

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`rounded-full flex items-center justify-center relative ${bgColor} transition-colors duration-200`}>
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-900 text-gray-300 dark:bg-gray-300 dark:text-gray-900 absolute left-1/2 -translate-x-1/2 -top-6 w-fit text-xs">
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className={`flex items-center justify-center ${iconColorClass} w-5 h-5`}>
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  );
}
