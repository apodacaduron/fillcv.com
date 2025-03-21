
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Button,
  Card,
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Upload,
  FileText,
  ArrowRight,
  Layout,
  User,
  Mail,
  Phone,
  Link2,
  Briefcase,
  GraduationCap,
  Award,
  Languages,
  LayoutTemplate,
  Terminal
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Template {
  id: string;
  name: string;
  description: string;
  preview: React.ReactNode;
}

const Dashboard = () => {
  const [uploadMethod, setUploadMethod] = useState<'upload' | 'text'>('upload');
  const [processType, setProcessType] = useState<'feedback' | 'generate'>('feedback');
  const [position, setPosition] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('minimal');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setLoading(false);
      toast({
        title: processType === 'feedback' ? "Feedback Generated" : "CV Generated",
        description: processType === 'feedback' 
          ? "Your CV feedback is ready to view!" 
          : "Your new CV has been created successfully!",
      });
    }, 2000);
  };

  const templates: Template[] = [
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Clean and modern design with a focus on readability',
      preview: (
        <div className="bg-white h-full w-full p-2 rounded flex flex-col gap-1">
          <div className="h-4 w-1/2 bg-gray-900 rounded-sm"></div>
          <div className="h-2 w-3/4 bg-gray-300 rounded-sm"></div>
          <div className="h-1 w-full bg-gray-200 rounded-sm my-1"></div>
          <div className="h-2 w-1/2 bg-gray-300 rounded-sm"></div>
          <div className="h-2 w-2/3 bg-gray-300 rounded-sm"></div>
          <div className="h-2 w-3/4 bg-gray-300 rounded-sm"></div>
        </div>
      )
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Traditional layout ideal for corporate positions',
      preview: (
        <div className="bg-white h-full w-full p-2 rounded flex flex-col gap-1">
          <div className="bg-blue-600 h-5 w-full mb-1"></div>
          <div className="h-3 w-1/2 bg-gray-900 rounded-sm"></div>
          <div className="h-2 w-2/3 bg-gray-300 rounded-sm"></div>
          <div className="flex gap-1 mt-1">
            <div className="h-full w-1/3 flex flex-col gap-1">
              <div className="h-2 w-full bg-gray-200 rounded-sm"></div>
              <div className="h-2 w-full bg-gray-200 rounded-sm"></div>
            </div>
            <div className="h-full w-2/3 flex flex-col gap-1">
              <div className="h-2 w-full bg-gray-300 rounded-sm"></div>
              <div className="h-2 w-full bg-gray-300 rounded-sm"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Bold design for standing out in creative fields',
      preview: (
        <div className="bg-white h-full w-full p-2 rounded flex flex-col gap-1">
          <div className="h-6 w-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-sm mb-1"></div>
          <div className="flex gap-1">
            <div className="h-10 w-1/3 rounded-full bg-gray-200"></div>
            <div className="h-full w-2/3 flex flex-col gap-1 justify-center">
              <div className="h-3 w-full bg-gray-900 rounded-sm"></div>
              <div className="h-2 w-2/3 bg-gray-300 rounded-sm"></div>
            </div>
          </div>
          <div className="h-1 w-full bg-gray-200 rounded-sm my-1"></div>
          <div className="h-2 w-full bg-gray-300 rounded-sm"></div>
        </div>
      )
    },
    {
      id: 'technical',
      name: 'Technical',
      description: 'Optimized for tech roles with skills emphasis',
      preview: (
        <div className="bg-white h-full w-full p-2 rounded flex flex-col gap-1">
          <div className="flex gap-1">
            <div className="h-full w-2/3 flex flex-col gap-1">
              <div className="h-3 w-3/4 bg-gray-900 rounded-sm"></div>
              <div className="h-2 w-full bg-gray-300 rounded-sm"></div>
            </div>
            <div className="h-full w-1/3 flex flex-col gap-1">
              <div className="h-2 w-full bg-gray-800 rounded-sm"></div>
              <div className="h-2 w-full bg-gray-200 rounded-sm"></div>
            </div>
          </div>
          <div className="h-1 w-full bg-gray-200 rounded-sm my-1"></div>
          <div className="flex flex-wrap gap-1 mt-1">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-2 w-1/5 bg-blue-200 rounded-full"></div>
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 animate-fade-up">
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">
                Upload your CV and let our AI tools help you land your dream job
              </p>
            </div>
            
            <Card className="shadow-sm border-gray-200/70 overflow-hidden animate-fade-up">
              <CardHeader className="bg-gray-50/50">
                <CardTitle>Create or Improve Your CV</CardTitle>
                <CardDescription>
                  Upload your existing CV or input your information to get started
                </CardDescription>
              </CardHeader>
              
              <form onSubmit={handleSubmit}>
                <CardContent className="pt-6">
                  <Tabs defaultValue="upload" className="w-full" onValueChange={(v) => setUploadMethod(v as 'upload' | 'text')}>
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="upload" className="flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        Upload CV
                      </TabsTrigger>
                      <TabsTrigger value="text" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Enter Details
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="upload" className="space-y-4">
                      <div className="border-2 border-dashed rounded-lg p-8 text-center bg-gray-50/50">
                        <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-1">Upload your CV</h3>
                        <p className="text-muted-foreground text-sm mb-4">PDF format recommended (max 5MB)</p>
                        
                        <Input 
                          id="cv-upload" 
                          type="file" 
                          accept=".pdf,.doc,.docx,.txt" 
                          className="hidden"
                          onChange={handleFileChange}
                        />
                        <Label htmlFor="cv-upload" asChild>
                          <Button type="button" variant="outline" className="mt-2">
                            Select File
                          </Button>
                        </Label>
                        
                        {file && (
                          <div className="mt-4 p-3 bg-primary/10 rounded-lg text-sm flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" />
                            <span className="font-medium">{file.name}</span>
                            <span className="text-muted-foreground ml-auto">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </span>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="text" className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="fullname">Full Name</Label>
                            <Input 
                              id="fullname" 
                              placeholder="John Doe"
                              className="mt-1"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email" 
                              type="email"
                              placeholder="john@example.com" 
                              className="mt-1"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input 
                              id="phone" 
                              placeholder="+1 (555) 123-4567" 
                              className="mt-1"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="website">Website/LinkedIn</Label>
                            <Input 
                              id="website" 
                              placeholder="linkedin.com/in/johndoe" 
                              className="mt-1"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="experience">Professional Experience</Label>
                            <Textarea 
                              id="experience" 
                              placeholder="Describe your work experience..." 
                              className="mt-1 h-32"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="education">Education</Label>
                            <Textarea 
                              id="education" 
                              placeholder="List your educational background..." 
                              className="mt-1 h-20"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="skills">Skills</Label>
                        <Textarea 
                          id="skills" 
                          placeholder="List your key skills separated by commas..." 
                          className="mt-1"
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <Separator className="my-6" />
                  
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
                    
                    {processType === 'generate' && (
                      <div>
                        <h3 className="text-lg font-medium mb-4">Choose a Template</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {templates.map((template) => (
                            <div 
                              key={template.id}
                              className={`cursor-pointer transition-all duration-200 rounded-lg overflow-hidden ${
                                selectedTemplate === template.id 
                                  ? 'ring-2 ring-primary scale-105' 
                                  : 'ring-1 ring-gray-200 hover:ring-gray-300'
                              }`}
                              onClick={() => setSelectedTemplate(template.id)}
                            >
                              <div className="aspect-[3/4] bg-gray-50">
                                {template.preview}
                              </div>
                              <div className="p-3 bg-white border-t border-gray-100">
                                <h4 className="font-medium text-sm">{template.name}</h4>
                                <p className="text-xs text-muted-foreground mt-1 truncate">
                                  {template.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="ats-optimize" />
                      <Label htmlFor="ats-optimize">Optimize for ATS (Applicant Tracking Systems)</Label>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between border-t bg-gray-50/50 py-4">
                  <Button variant="outline" type="button" asChild>
                    <Link to="/">Cancel</Link>
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={loading || (uploadMethod === 'upload' && !file)}
                    className="flex items-center gap-2"
                  >
                    {loading ? 'Processing...' : processType === 'feedback' ? 'Get Feedback' : 'Generate CV'}
                    {!loading && <ArrowRight className="h-4 w-4" />}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
