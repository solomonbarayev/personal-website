"use client";

import { motion } from "framer-motion";
import { Star, GitFork, Code } from "lucide-react";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
}

interface RepositoryGridProps {
  repositories?: Repository[];
  username?: string;
  githubToken?: string;
}

async function fetchRepositories(username: string, githubToken?: string): Promise<Repository[]> {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (githubToken) {
      headers["Authorization"] = `Bearer ${githubToken}`;
    }

    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=12`, {
      headers,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch repositories");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }
}

function RepositoryCard({ repository }: { repository: Repository }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col p-6 border border-border bg-background hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-semibold text-lg text-foreground truncate">
            <a href={repository.html_url} target="_blank" rel="noreferrer" className="hover:underline">
              {repository.name}
            </a>
          </h3>
          <div className="flex items-center space-x-3">
            <div className="flex items-center text-muted-foreground">
              <Star className="h-4 w-4 mr-1 text-yellow-400" />
              <span className="text-sm">{repository.stargazers_count}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <GitFork className="h-4 w-4 mr-1" />
              <span className="text-sm">{repository.forks_count}</span>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">
          {repository.description || "No description provided"}
        </p>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {repository.topics &&
              repository.topics.slice(0, 3).map((topic) => (
                <Badge key={topic} variant="secondary" className="text-xs">
                  {topic}
                </Badge>
              ))}
            {repository.language && (
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-primary mr-1"></div>
                <span className="text-xs text-muted-foreground">{repository.language}</span>
              </div>
            )}
          </div>

          <Button variant="outline" size="sm" className="w-full mt-2" asChild>
            <a href={repository.html_url} target="_blank" rel="noreferrer" className="flex items-center justify-center">
              <Code className="h-4 w-4 mr-2" />
              View Repository
            </a>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

export function ProjectsGrid({ repositories = [], username, githubToken }: RepositoryGridProps) {
  const [repos, setRepos] = useState<Repository[]>(repositories);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasInitialFetch, setHasInitialFetch] = useState(false);

  useEffect(() => {
    if (username && !hasInitialFetch) {
      setLoading(true);
      setHasInitialFetch(true);

      fetchRepositories(username, githubToken)
        .then((data) => {
          setRepos(data);
        })
        .catch((error) => {
          console.error("Error fetching repositories:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [username, githubToken, hasInitialFetch]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="h-64 p-6 border border-border bg-background/50 animate-pulse">
            <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
            <div className="h-3 bg-muted rounded w-full mb-2"></div>
            <div className="h-3 bg-muted rounded w-5/6 mb-2"></div>
            <div className="h-3 bg-muted rounded w-4/6 mb-4"></div>
            <div className="flex gap-2 mt-auto">
              <div className="h-6 bg-muted rounded w-16"></div>
              <div className="h-6 bg-muted rounded w-16"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (repos.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-foreground">No repositories found</h3>
        <p className="text-muted-foreground mt-2">
          {username ? `${username} doesn't have any public repositories yet.` : "No repositories provided."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
      {repos.map((repo) => (
        <RepositoryCard key={repo.id} repository={repo} />
      ))}
    </div>
  );
}
