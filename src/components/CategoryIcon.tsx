import {
  Sun,
  Moon,
  Heart,
  Sparkles,
  Home,
  Zap,
  Users,
  Cake,
  Gift,
  Calendar,
  BookOpen,
  MessageCircle,
  Droplets,
  type LucideProps,
} from 'lucide-react'
import type { ComponentType } from 'react'

const ICONS: Record<string, ComponentType<LucideProps>> = {
  Sun,
  Moon,
  Heart,
  Sparkles,
  Home,
  Zap,
  Users,
  Cake,
  Gift,
  Calendar,
  BookOpen,
  MessageCircle,
  Droplets,
}

type Props = LucideProps & { name: string }

export default function CategoryIcon({ name, ...props }: Props) {
  const Icon = ICONS[name] ?? MessageCircle
  return <Icon strokeWidth={1.75} {...props} />
}
