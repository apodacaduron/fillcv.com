
import React from 'react';
import { 
  Upload, 
  FileText, 
  Zap, 
  Target, 
  LayoutTemplate, 
  CheckCircle2,
  MessageSquareText
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => (
  <div 
    className="p-6 rounded-xl backdrop-blur-sm border border-gray-200/50 bg-white/50 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-up"
    style={{ "--index": index } as React.CSSProperties}
  >
    <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-primary/10 text-primary">
      {icon}
    </div>
    <h3 className="text-xl font-medium mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: <Upload className="h-6 w-6" />,
      title: "Easy CV Upload",
      description: "Upload your existing CV in PDF format or input your details directly into our intuitive form."
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Detailed Analysis",
      description: "Receive a comprehensive analysis of your CV with specific improvement suggestions."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "AI-Powered Generation",
      description: "Generate a completely new, optimized CV based on your existing information and career goals."
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Position Targeting",
      description: "Tailor your CV specifically to match the requirements of your target job position."
    },
    {
      icon: <LayoutTemplate className="h-6 w-6" />,
      title: "Premium Templates",
      description: "Choose from a variety of professionally designed templates to make your CV stand out."
    },
    {
      icon: <MessageSquareText className="h-6 w-6" />,
      title: "Expert Feedback",
      description: "Get actionable feedback on your current CV to improve your chances of landing interviews."
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden" id="features">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[30%] -left-[10%] w-[40%] h-[60%] bg-gradient-radial from-blue-200/20 to-transparent rounded-full blur-3xl" />
      </div>
      
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <span className="text-sm font-medium text-primary px-3 py-1 rounded-full bg-primary/10 mb-4 inline-block">
            POWERFUL FEATURES
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything you need to create the perfect CV</h2>
          <p className="text-muted-foreground text-lg">
            Our platform combines AI technology with professional design to help you create a standout resume that gets results.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
        
        <div className="mt-20 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 sm:p-10 relative animate-fade-up">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">How it works</h3>
            <p className="text-muted-foreground mb-10">
              A simple three-step process to transform your resume
            </p>
            
            <div className="flex flex-col md:flex-row gap-8 md:gap-4 justify-between">
              {[
                {
                  step: "01",
                  title: "Upload your CV",
                  description: "Upload your existing resume or input your details"
                },
                {
                  step: "02",
                  title: "Choose your option",
                  description: "Get feedback or generate a new CV for your target role"
                },
                {
                  step: "03",
                  title: "Download & apply",
                  description: "Download your polished CV and start applying with confidence"
                }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold mb-4">
                    {item.step}
                  </div>
                  <h4 className="text-lg font-medium mb-2">{item.title}</h4>
                  <p className="text-muted-foreground text-center">{item.description}</p>
                  
                  {index < 2 && (
                    <div className="hidden md:block h-0.5 w-full md:w-24 bg-gray-200 absolute left-[calc(50%+4rem)] top-[3.5rem] transform -translate-x-1/2">
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
