// Metrics — replace with `*[_type == "metric"]` Sanity query later.
import type { LucideIcon } from "lucide-react"
import { Users, CarFront, MessagesSquare, Lock } from "lucide-react"

export type Metric = {
  id: string
  value: string
  label: { en: string; "pt-BR": string }
  icon: LucideIcon
}

export const metrics: Metric[] = [
  {
    id: "concurrent-users",
    value: "3M+",
    label: {
      en: "Concurrent users simulated under load",
      "pt-BR": "Usuários simultâneos simulados em carga",
    },
    icon: Users,
  },
  {
    id: "drivers",
    value: "100k",
    label: {
      en: "Drivers targeted by mobile product",
      "pt-BR": "Motoristas alvo do produto mobile",
    },
    icon: CarFront,
  },
  {
    id: "whatsapp",
    value: "10+",
    label: {
      en: "WhatsApp groups automated for promotions",
      "pt-BR": "Grupos de WhatsApp automatizados para promoções",
    },
    icon: MessagesSquare,
  },
  {
    id: "concurrency",
    value: "Redis",
    label: {
      en: "High-concurrency APIs with distributed locks",
      "pt-BR": "APIs de alta concorrência com locks distribuídos",
    },
    icon: Lock,
  },
]
