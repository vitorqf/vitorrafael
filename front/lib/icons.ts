import type { LucideIcon } from "lucide-react"
import {
  CarFront,
  Compass,
  Gauge,
  Github,
  Layers,
  Linkedin,
  Lock,
  Mail,
  MessagesSquare,
  ShieldCheck,
  Smartphone,
  Users,
  Wrench,
} from "lucide-react"
import type { MetricIconKey, SkillIconKey, SocialIconKey } from "@/lib/sanity/types"

const skillIconMap: Record<SkillIconKey, LucideIcon> = {
  layers: Layers,
  smartphone: Smartphone,
  "shield-check": ShieldCheck,
  gauge: Gauge,
  compass: Compass,
  wrench: Wrench,
}

const metricIconMap: Record<MetricIconKey, LucideIcon> = {
  users: Users,
  "car-front": CarFront,
  "messages-square": MessagesSquare,
  lock: Lock,
}

const socialIconMap: Record<SocialIconKey, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
}

export function getSkillIcon(icon: SkillIconKey): LucideIcon {
  return skillIconMap[icon] ?? Layers
}

export function getMetricIcon(icon: MetricIconKey): LucideIcon {
  return metricIconMap[icon] ?? Users
}

export function getSocialIcon(icon: SocialIconKey): LucideIcon {
  return socialIconMap[icon] ?? Mail
}
