import React from 'react';
import { Monitor, Shield, Zap, Globe } from 'lucide-react';
import type { ServiceCard } from '../types';

const services: ServiceCard[] = [
  {
    title: 'Web Development',
    description: 'Custom websites built with modern technologies for optimal performance.',
    icon: 'Monitor'
  },
  {
    title: 'Cyber Security',
    description: 'Protect your digital assets with enterprise-grade security solutions.',
    icon: 'Shield'
  },
  {
    title: 'Fast Performance',
    description: 'Lightning-fast applications optimized for the best user experience.',
    icon: 'Zap'
  },
  {
    title: 'Global Reach',
    description: 'Expand your reach with international hosting and CDN solutions.',
    icon: 'Globe'
  }
];

const IconMap = {
  Monitor,
  Shield,
  Zap,
  Globe
};

export const Services: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = IconMap[service.icon as keyof typeof IconMap];
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};