
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-[30%] -right-[10%] w-[50%] h-[80%] bg-gradient-radial from-blue-200/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[80%] bg-gradient-radial from-indigo-200/20 to-transparent rounded-full blur-3xl" />
      </div>
      
      <div className="container px-4 mx-auto flex flex-col items-center text-center">
        <div className="inline-block animate-fade-in">
          <span className="inline-block py-1 px-3 mb-6 text-xs font-medium tracking-wider text-primary bg-primary/10 rounded-full">
            MAKE YOUR CV STAND OUT
          </span>
        </div>
        
        <h1 className="font-bold mb-6 max-w-4xl mx-auto animate-fade-up text-balance" style={{"--index": "1"} as React.CSSProperties}>
          Transform your resume with 
          <span className="text-gradient"> AI-powered </span>
          precision
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-up" style={{"--index": "2"} as React.CSSProperties}>
          Upload your CV, get tailored feedback, or generate a professionally designed resume that stands out to employers in seconds.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-3 w-full justify-center mb-12 animate-fade-up" style={{"--index": "3"} as React.CSSProperties}>
          <Button size="lg" asChild>
            <Link to="/dashboard" className="group">
              Get Started 
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/examples">See Examples</Link>
          </Button>
        </div>
        
        {/* Preview Image */}
        <div className="w-full max-w-5xl mx-auto relative animate-fade-up" style={{"--index": "4"} as React.CSSProperties}>
          <div className="aspect-[16/9] overflow-hidden rounded-xl shadow-2xl border border-black/5">
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="glass p-8 rounded-lg max-w-md text-left">
                <h3 className="text-xl font-medium mb-2">Preview Your New CV</h3>
                <p className="text-muted-foreground mb-4">Upload your existing CV or enter details to generate a professional, tailored resume.</p>
                <div className="h-10 w-3/4 bg-primary/10 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute -bottom-6 -left-6 sm:left-12 p-4 glass rounded-lg shadow-lg max-w-[200px] animate-float" style={{"--index": "1"} as React.CSSProperties}>
            <div className="h-2 w-full rounded-full bg-green-400 mb-2"></div>
            <div className="text-sm font-medium">AI Match Score: 94%</div>
            <p className="text-xs text-muted-foreground">Perfect for Software Engineer roles</p>
          </div>
          
          <div className="absolute -top-6 -right-6 sm:right-12 p-4 glass rounded-lg shadow-lg max-w-[200px] animate-float" style={{"--index": "2", "animationDelay": "1s"} as React.CSSProperties}>
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium text-sm">Templates</div>
              <span className="text-xs text-primary">15+</span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-5 h-5 rounded-sm bg-gray-200"></div>
              ))}
              <div className="w-5 h-5 rounded-sm bg-primary/20 flex items-center justify-center text-primary text-xs">+</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
