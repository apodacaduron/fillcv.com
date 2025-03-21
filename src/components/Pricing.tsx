
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PricingOption {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  recommended?: boolean;
}

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  
  const pricingOptions: PricingOption[] = [
    {
      id: 'free',
      name: 'Free',
      description: 'Basic CV analysis and feedback',
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        'CV analysis',
        'Basic feedback',
        '1 CV template',
        'Limited AI suggestions',
        'Email support'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Complete CV creation and optimization',
      monthlyPrice: 9.99,
      yearlyPrice: 7.99,
      recommended: true,
      features: [
        'Everything in Free',
        'Position-specific optimization',
        'All premium templates',
        'Unlimited CV generations',
        'Detailed AI-powered feedback',
        'Priority support'
      ]
    },
    {
      id: 'business',
      name: 'Business',
      description: 'For teams and businesses',
      monthlyPrice: 29.99,
      yearlyPrice: 24.99,
      features: [
        'Everything in Pro',
        'Team management',
        'Custom branding',
        'Analytics and reporting',
        'Multiple users (up to 5)',
        'Dedicated account manager'
      ]
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden" id="pricing">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[60%] bg-gradient-radial from-indigo-200/20 to-transparent rounded-full blur-3xl" />
      </div>
      
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <span className="text-sm font-medium text-primary px-3 py-1 rounded-full bg-primary/10 mb-4 inline-block">
            PRICING PLANS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Choose the perfect plan for your needs</h2>
          <p className="text-muted-foreground text-lg">
            Simple, transparent pricing that grows with you. Try any plan free for 7 days.
          </p>
          
          <div className="flex items-center justify-center mt-8 p-1 bg-muted rounded-full w-fit mx-auto">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full transition-all",
                billingCycle === 'monthly' 
                  ? "bg-white text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full transition-all",
                billingCycle === 'yearly' 
                  ? "bg-white text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Yearly
              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                20% off
              </span>
            </button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {pricingOptions.map((option, index) => (
            <div 
              key={option.id}
              className={cn(
                "rounded-xl p-6 border bg-white transition-all duration-300 animate-fade-up flex flex-col h-full relative",
                option.recommended 
                  ? "shadow-lg border-primary/20 scale-105 md:scale-110 z-10" 
                  : "border-border hover:shadow-md"
              )}
              style={{ "--index": index } as React.CSSProperties}
            >
              {option.recommended && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-bold">{option.name}</h3>
                <p className="text-muted-foreground text-sm mt-1">{option.description}</p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-end">
                  <span className="text-3xl sm:text-4xl font-bold">
                    ${billingCycle === 'monthly' ? option.monthlyPrice : option.yearlyPrice}
                  </span>
                  {option.monthlyPrice > 0 && (
                    <span className="text-muted-foreground text-sm ml-2 mb-1">
                      /{billingCycle === 'monthly' ? 'month' : 'month, billed yearly'}
                    </span>
                  )}
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {option.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mr-2" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-auto">
                <Button 
                  className={cn(
                    "w-full",
                    option.recommended 
                      ? "bg-primary hover:bg-primary/90" 
                      : option.id === 'free' 
                        ? "bg-muted hover:bg-muted/80 text-foreground"
                        : ""
                  )}
                  variant={option.id === 'free' ? "outline" : "default"}
                >
                  {option.id === 'free' ? 'Get Started' : 'Try Free for 7 Days'}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center animate-fade-up">
          <p className="text-muted-foreground">
            Need a custom solution for your organization?{' '}
            <a href="#" className="text-primary font-medium underline-offset-4 hover:underline">
              Contact our sales team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
