import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StatsOverview from '@/components/dashboard/StatsOverview';
import RecentActivity from '@/components/dashboard/RecentActivity';
import QuickActions from '@/components/dashboard/QuickActions';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-primary-foreground">
          <h1 className="font-serif text-3xl font-bold mb-2">
            Bienvenue dans votre espace vendeur
          </h1>
          <p className="text-primary-foreground/80 text-lg">
            Gérez vos offres de voyage et suivez vos performances
          </p>
        </div>

        {/* Stats Overview */}
        <StatsOverview />

        {/* Quick Actions and Recent Activity */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;