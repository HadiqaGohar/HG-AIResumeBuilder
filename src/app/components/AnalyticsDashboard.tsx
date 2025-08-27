'use client';

import React, { useState } from 'react';
import { FiTrendingUp, FiUsers, FiFileText, FiStar, FiTarget, FiAward } from 'react-icons/fi';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface AnalyticsData {
  totalResumes: number;
  successRate: number;
  avgATSScore: number;
  popularTemplates: { id: string; name: string; usage: number }[];
  skillTrends: { skill: string; growth: number }[];
  userSatisfaction: number;
}

export default function AnalyticsDashboard() {
  const [analytics] = useState<AnalyticsData>({
    totalResumes: 12847,
    successRate: 94.2,
    avgATSScore: 87.5,
    popularTemplates: [
      { id: '1', name: 'Modern Professional', usage: 34.2 },
      { id: '2', name: 'Classic Business', usage: 28.7 },
      { id: '3', name: 'Creative Designer', usage: 18.9 },
    ],
    skillTrends: [
      { skill: 'AI/ML', growth: 156 },
      { skill: 'React', growth: 89 },
      { skill: 'Python', growth: 67 },
    ],
    userSatisfaction: 4.8,
  });

  const StatCard = ({ icon: Icon, title, value, subtitle, color }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          </div>
          <div className={`p-3 rounded-full ${color.replace('text-', 'bg-').replace('-600', '-100')}`}>
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Platform Analytics</h2>
        <p className="text-gray-600">Real-time insights into resume building trends</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={FiFileText}
          title="Total Resumes Created"
          value={analytics.totalResumes.toLocaleString()}
          subtitle="+12% this month"
          color="text-blue-600"
        />
        <StatCard
          icon={FiTrendingUp}
          title="Success Rate"
          value={`${analytics.successRate}%`}
          subtitle="Job application success"
          color="text-green-600"
        />
        <StatCard
          icon={FiTarget}
          title="Avg ATS Score"
          value={`${analytics.avgATSScore}%`}
          subtitle="Applicant Tracking System"
          color="text-purple-600"
        />
        <StatCard
          icon={FiStar}
          title="User Satisfaction"
          value={`${analytics.userSatisfaction}/5`}
          subtitle="Based on user reviews"
          color="text-yellow-600"
        />
      </div>

      {/* Charts and Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Templates */}
        <Card className={undefined}>
          <CardHeader className={undefined}>
            <CardTitle className="flex items-center">
              <FiAward className="w-5 h-5 mr-2 text-purple-600" />
              Popular Templates
            </CardTitle>
          </CardHeader>
          <CardContent className={undefined}>
            <div className="space-y-4">
              {analytics.popularTemplates.map((template) => (
                <div key={template.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-bold text-purple-600">#{template.id}</span>
                    </div>
                    <span className="font-medium text-gray-800">{template.name}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                        style={{ width: `${template.usage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-600">{template.usage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skill Trends */}
        <Card className={undefined}>
          <CardHeader className={undefined}>
            <CardTitle className="flex items-center">
              <FiTrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Trending Skills
            </CardTitle>
          </CardHeader>
          <CardContent className={undefined}>
            <div className="space-y-4">
              {analytics.skillTrends.map((skill, index) => (
                <div key={skill.skill} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-bold text-green-600">{index + 1}</span>
                    </div>
                    <span className="font-medium text-gray-800">{skill.skill}</span>
                  </div>
                  <div className="flex items-center">
                    <FiTrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm font-semibold text-green-600">+{skill.growth}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Activity Feed */}
      <Card className={undefined}>
        <CardHeader className={undefined}>
          <CardTitle className="flex items-center">
            <FiUsers className="w-5 h-5 mr-2 text-blue-600" />
            Live Activity
          </CardTitle>
        </CardHeader>
        <CardContent className={undefined}>
          <div className="space-y-3">
            {[
              { action: 'Resume created', template: 'Modern Professional', time: '2 minutes ago' },
              { action: 'Template selected', template: 'Creative Designer', time: '5 minutes ago' },
              { action: 'Resume optimized', template: 'Classic Business', time: '8 minutes ago' },
              { action: 'PDF downloaded', template: 'Modern Professional', time: '12 minutes ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                  <span className="text-sm text-gray-800">
                    <span className="font-medium">{activity.action}</span> using {activity.template}
                  </span>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}