import React from 'react';
import { Check } from 'lucide-react';
import type { PricingTier } from '../types';

const pricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    price: 29,
    features: [
      '5 Projects',
      '10GB Storage',
      'Basic Support',
      'Basic Analytics'
    ]
  },
  {
    name: 'Professional',
    price: 99,
    features: [
      'Unlimited Projects',
      '100GB Storage',
      'Priority Support',
      'Advanced Analytics',
      'Custom Domain'
    ],
    recommended: true
  },
  {
    name: 'Enterprise',
    price: 299,
    features: [
      'Unlimited Everything',
      'Dedicated Support',
      'Custom Solutions',
      'SLA Guarantee',
      'API Access'
    ]
  }
];

export const Pricing: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 ${
                tier.recommended
                  ? 'bg-blue-600 text-white ring-4 ring-blue-600 ring-offset-2'
                  : 'bg-gray-50'
              }`}
            >
              {tier.recommended && (
                <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold bg-blue-500 text-white mb-4">
                  Recommended
                </span>
              )}
              <h3 className="text-2xl font-bold">{tier.name}</h3>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold">${tier.price}</span>
                <span className={tier.recommended ? 'text-blue-100' : 'text-gray-500'}>
                  /month
                </span>
              </div>
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  tier.recommended
                    ? 'bg-white text-blue-600 hover:bg-gray-100'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};