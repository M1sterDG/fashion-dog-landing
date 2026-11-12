import {
  Bathtub,
  Broom,
  ChatCircleText,
  Clock,
  Cloud,
  CreditCard,
  DeviceMobile,
  Dog,
  Drop,
  Ear,
  Eye,
  Feather,
  Flask,
  Heart,
  Money,
  PawPrint,
  Receipt,
  Scissors,
  ShieldCheck,
  Snowflake,
  Stethoscope,
  Sun,
  Tag,
  WhatsappLogo,
  Wind,
} from '@phosphor-icons/react'

// Mapa de nombre a icono Phosphor, para usar los nombres que están en content.js
const map = {
  Bathtub, Broom, ChatCircleText, Clock, Cloud, CreditCard, DeviceMobile, Dog, Drop, Ear, Eye, Feather,
  Flask, Heart, Money, PawPrint, Receipt, Scissors, ShieldCheck, Snowflake, Stethoscope, Sun,
  Tag, WhatsappLogo, Wind,
}

export function Icon({ name, ...props }) {
  const C = map[name] ?? PawPrint
  return <C aria-hidden="true" {...props} />
}
