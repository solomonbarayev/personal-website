import { DeveloperHero } from "@/components/DeveloperHero";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <DeveloperHero
        name="Solomon Barayev"
        title="Full Stack Developer"
        description="Passionate about building beautiful, functional web applications with modern technologies. Focused on creating seamless user experiences and elegant solutions."
        profileImage="/profile.jpg"
        socialLinks={[
          {
            icon: <Github className="h-5 w-5" />,
            href: "https://github.com/solomonbarayev",
            label: "GitHub Profile",
          },
          {
            icon: <Twitter className="h-5 w-5" />,
            href: "https://twitter.com/solomonbarayev",
            label: "Twitter Profile",
          },
          {
            icon: <Linkedin className="h-5 w-5" />,
            href: "https://linkedin.com/in/solomonbarayev",
            label: "LinkedIn Profile",
          },
          {
            icon: <Mail className="h-5 w-5" />,
            href: "mailto:solomonbarayev@gmail.com",
            label: "Email Contact",
          },
        ]}
      />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">My Projects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Here are some of my recent projects and contributions. Feel free to explore and contribute!
            </p>
          </div>

          <ProjectsGrid username="solomonbarayev" />
        </div>
      </section>
    </main>
  );
}
