"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface DeveloperHeroProps {
  name: string;
  title: string;
  description?: string;
  profileImage: string;
  socialLinks: SocialLink[];
}

export function DeveloperHero({ name, title, description, profileImage, socialLinks }: DeveloperHeroProps) {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-200 via-violet-400 to-indigo-600 opacity-90" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
          {/* Profile Image */}
          <div className="flex justify-center md:order-2">
            <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-white/20 shadow-xl sm:h-72 sm:w-72 md:h-80 md:w-80">
              <Image src={profileImage} alt={name} fill className="object-cover" priority />
            </div>
          </div>

          {/* Content */}
          <div className="text-center md:order-1 md:text-left">
            <Badge variant="outline" className="mb-4 bg-background/80 px-3 py-1 text-sm">
              Developer Portfolio
            </Badge>

            <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">{name}</h1>

            <h2 className="mb-6 text-xl font-medium text-white/90 sm:text-2xl">{title}</h2>

            {description && <p className="mb-8 max-w-lg text-white/80 md:mx-0 mx-auto">{description}</p>}

            {/* Social Links */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {socialLinks.map((link, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  className="bg-background/20 backdrop-blur-sm border-white/20 text-white hover:bg-background/30 hover:text-white"
                  asChild
                >
                  <a href={link.href} aria-label={link.label} target="_blank" rel="noopener noreferrer">
                    {link.icon}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
