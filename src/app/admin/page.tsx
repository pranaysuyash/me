"use client";

import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { FilePen, Folder, History, Settings, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  
  // In a real app, this would check NextAuth session
  useEffect(() => {
    // Simulate auth check
    setIsAuthorized(false);
  }, []);
  
  if (isAuthorized === null) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex justify-center items-center h-64">
            <p>Loading...</p>
          </div>
        </div>
      </PageLayout>
    );
  }
  
  if (isAuthorized === false) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-16 md:py-24 max-w-md">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <ShieldAlert className="mr-2 h-5 w-5 text-destructive" />
                Restricted Area
              </CardTitle>
              <CardDescription className="text-center">
                This area is restricted to authorized administrators.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-muted-foreground">
                Please log in with GitHub to access the admin panel. Only authorized email addresses
                in the ADMIN_EMAILS environment variable can access this area.
              </p>
              <div className="flex justify-center">
                <Button disabled>
                  Sign in with GitHub
                </Button>
              </div>
              <p className="text-xs text-center text-muted-foreground">
                Note: Authentication is disabled in this demo. In a production deployment, this would
                be protected by NextAuth.js with GitHub OAuth.
              </p>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
            Admin Dashboard
          </h1>
          
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <Card className="animate-card-hover">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Folder className="mr-2 h-5 w-5 text-primary" />
                  Projects
                </CardTitle>
                <CardDescription>
                  Manage portfolio projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Add, edit, or remove projects from your portfolio.
                </p>
                <Button asChild>
                  <Link href="/admin/projects">
                    Manage Projects
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="animate-card-hover">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FilePen className="mr-2 h-5 w-5 text-primary" />
                  Tools
                </CardTitle>
                <CardDescription>
                  Manage tools and utilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Add, edit, or remove tools and micro-SaaS products.
                </p>
                <Button asChild>
                  <Link href="/admin/tools">
                    Manage Tools
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="animate-card-hover">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <History className="mr-2 h-5 w-5 text-primary" />
                  Timeline
                </CardTitle>
                <CardDescription>
                  Manage experience timeline
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Add, edit, or remove items from your professional timeline.
                </p>
                <Button asChild>
                  <Link href="/admin/timeline">
                    Manage Timeline
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="animate-card-hover">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5 text-primary" />
                  Settings
                </CardTitle>
                <CardDescription>
                  Manage site settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Configure site metadata, social links, and other settings.
                </p>
                <Button asChild>
                  <Link href="/admin/settings">
                    Manage Settings
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}