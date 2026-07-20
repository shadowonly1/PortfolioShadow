import type { ComponentType } from "react";
import { DiIllustrator, DiPhotoshop } from "react-icons/di";
import { FaJava } from "react-icons/fa6";
import {
  SiDart,
  SiExpress,
  SiFirebase,
  SiFlutter,
  SiGit,
  SiJavascript,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiTypescript,
} from "react-icons/si";
import { LayoutTemplate, Palette, Server } from "lucide-react";

export type TechIconEntry = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: ComponentType<any>;
  color: string;
};

const table: Record<string, TechIconEntry> = {
  JavaScript: { Icon: SiJavascript, color: "#F7DF1E" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  PHP: { Icon: SiPhp, color: "#8892BF" },
  Python: { Icon: SiPython, color: "#3776AB" },
  Dart: { Icon: SiDart, color: "#0175C2" },
  Java: { Icon: FaJava, color: "#ED8B00" },
  Laravel: { Icon: SiLaravel, color: "#FF2D20" },
  "Next.js": { Icon: SiNextdotjs, color: "#FFFFFF" },
  React: { Icon: SiReact, color: "#61DAFB" },
  Flutter: { Icon: SiFlutter, color: "#02569B" },
  "Express.js": { Icon: SiExpress, color: "#FFFFFF" },
  Firebase: { Icon: SiFirebase, color: "#FFCA28" },
  MySQL: { Icon: SiMysql, color: "#4479A1" },
  PostgreSQL: { Icon: SiPostgresql, color: "#4169E1" },
  MongoDB: { Icon: SiMongodb, color: "#47A248" },
  Redis: { Icon: SiRedis, color: "#DC382D" },
  Git: { Icon: SiGit, color: "#F05032" },
  "Déploiement VPS": { Icon: Server, color: "#7B85FF" },
  "Adobe Photoshop": { Icon: DiPhotoshop, color: "#31A8FF" },
  "Adobe Illustrator": { Icon: DiIllustrator, color: "#FF9A00" },
  "Adobe InDesign": { Icon: LayoutTemplate, color: "#FF3366" },
  Canva: { Icon: Palette, color: "#00C4CC" },
};

const fallback: TechIconEntry = { Icon: Server, color: "#7B85FF" };

export function getTechIcon(name: string): TechIconEntry {
  return table[name] ?? fallback;
}
