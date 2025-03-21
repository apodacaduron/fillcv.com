
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

interface ProcessOptionsProps {
  processType: 'feedback' | 'generate';
  setProcessType: (type: 'feedback' | 'generate') => void;
  position: string;
  setPosition: (position: string) => void;
}

const ProcessOptions = ({ 
  processType, 
  setProcessType, 
  position, 
  setPosition 
}: ProcessOptionsProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">What would you like to do?</h3>
        <RadioGroup defaultValue="feedback" onValueChange={(v) => setProcessType(v as 'feedback' | 'generate')}>
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-3 rounded-lg border p-4">
              <RadioGroupItem value="feedback" id="feedback" />
              <Label htmlFor="feedback" className="flex-1 cursor-pointer">
                <div className="font-medium">Get Feedback</div>
                <div className="text-muted-foreground text-sm">
                  Receive detailed feedback and suggestions to improve your existing CV
                </div>
              </Label>
            </div>
            
            <div className="flex items-center space-x-3 rounded-lg border p-4">
              <RadioGroupItem value="generate" id="generate" />
              <Label htmlFor="generate" className="flex-1 cursor-pointer">
                <div className="font-medium">Generate New CV</div>
                <div className="text-muted-foreground text-sm">
                  Create a completely new CV based on your information and chosen template
                </div>
              </Label>
            </div>
          </div>
        </RadioGroup>
      </div>
      
      <div>
        <Label htmlFor="position">
          Target Position <span className="text-muted-foreground">(Optional)</span>
        </Label>
        <Input 
          id="position" 
          placeholder="e.g. Software Engineer, Marketing Manager, etc." 
          className="mt-1"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <p className="text-sm text-muted-foreground mt-2">
          Adding a target position helps us tailor the content specifically for that role
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch id="ats-optimize" />
        <Label htmlFor="ats-optimize">Optimize for ATS (Applicant Tracking Systems)</Label>
      </div>
    </div>
  );
};

export default ProcessOptions;
