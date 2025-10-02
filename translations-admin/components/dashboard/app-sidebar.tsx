"use client"

import * as React from "react"
import {
  Home,
  Globe,
  Type,
  Image,
  MessageSquare,
  DollarSign,
  Users,
  HelpCircle,
  Mail,
  Navigation,
  Layout,
  ChevronRight,
  Settings,
  LogOut,
  Zap
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu data structure
const data = {
  sections: [
    {
      title: "Vue d'ensemble",
      items: [
        {
          title: "Dashboard",
          url: "/",
          icon: Home,
          isActive: true,
        },
        {
          title: "Toutes les sections",
          url: "/all",
          icon: Globe,
          category: "all",
          description: "Voir toutes les traductions"
        }
      ],
    },
    {
      title: "Contenu de la page",
      items: [
        {
          title: "Métadonnées",
          url: "/metadata",
          icon: Globe,
          category: "metadata",
          description: "Titre et description SEO"
        },
        {
          title: "Header",
          url: "/navigation", 
          icon: Navigation,
          category: "navigation",
          description: "Header et liens de navigation"
        },
        {
          title: "Footer",
          url: "/footer",
          icon: Layout,
          category: "footer",
          description: "Pied de page"
        },
        {
          title: "Section Hero",
          url: "/hero",
          icon: Zap,
          category: "hero",
          description: "Bannière principale d'accueil"
        },
        {
          title: "Fonctionnalités",
          url: "/features",
          icon: Type,
          category: "features",
          description: "Avantages et caractéristiques"
        },
        {
          title: "Comment ça marche",
          url: "/how-it-works",
          icon: MessageSquare,
          category: "howItWorks",
          description: "Étapes du processus"
        },
        {
          title: "Témoignages",
          url: "/testimonials",
          icon: Users,
          category: "testimonials",
          description: "Avis et retours clients"
        },
        {
          title: "Tarification",
          url: "/pricing",
          icon: DollarSign,
          category: "pricing",
          description: "Plans et prix"
        },
        {
          title: "FAQ",
          url: "/faq",
          icon: HelpCircle,
          category: "faq",
          description: "Questions fréquentes"
        },
        {
          title: "Contact",
          url: "/contact",
          icon: Mail,
          category: "contact",
          description: "Formulaire de contact"
        },
        {
          title: "Partenaires",
          url: "/partners",
          icon: Image,
          category: "partners",
          description: "Logos des partenaires"
        }
      ],
    },
  ],
}

interface AppSidebarProps {
  activeSection?: string
  onSectionChange?: (section: string) => void
}

export function AppSidebar({ activeSection = "", onSectionChange }: AppSidebarProps) {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Globe className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Bizuri Admin</span>
            <span className="truncate text-xs text-muted-foreground">Gestion des traductions</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="custom-scrollbar">
        {data.sections.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.category ? activeSection === item.category : item.url === "/"}
                      onClick={() => {
                        if (item.category && onSectionChange) {
                          onSectionChange(item.category)
                        }
                      }}
                    >
                      <div className="w-full flex items-center gap-2">
                        <item.icon />
                        <div className="flex-1 text-left">
                          <div className="font-medium">{item.title}</div>
                          {item.description && (
                            <div className="text-xs text-muted-foreground">{item.description}</div>
                          )}
                        </div>
                        {item.category && (
                          <ChevronRight className="size-4 opacity-50" />
                        )}
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings />
              <span>Paramètres</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <LogOut />
              <span>Déconnexion</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="px-4 py-2 text-xs text-muted-foreground">
          Version 1.0.0
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
