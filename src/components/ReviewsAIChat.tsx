import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, Play, FileText, Users, Target, CheckCircle, ArrowRight, ThumbsUp, MessageSquare, Lightbulb, BookOpen } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  type?: 'text' | 'review-data' | 'final-review';
}

interface ReviewData {
  name: string;
  title: string;
  selfReview: string;
  peerReviews: string;
  reviewQuestions: string;
  additionalDetails: string;
  additionalNotes: string;
}

type ReviewStep = 
  | 'welcome'
  | 'name-title'
  | 'self-review'
  | 'peer-reviews'
  | 'review-questions'
  | 'additional-details'
  | 'analyzing'
  | 'draft-review'
  | 'additional-notes'
  | 'final-review'
  | 'complete'
  // Self-review specific steps
  | 'self-name'
  | 'self-title'
  | 'self-content'
  | 'self-additional'
  | 'self-upload-questions'
  // Employee review specific steps
  | 'emp-name'
  | 'emp-title'
  | 'emp-self-review'
  | 'emp-peer-review'
  | 'emp-additional'
  | 'emp-upload-questions'
  // 1:1 conversation specific steps
  | 'oneonone-person'
  | 'oneonone-competency'
  | 'oneonone-examples'
  | 'oneonone-strengths'
  | 'oneonone-improvements'
  | 'oneonone-support'
  | 'oneonone-goals'
  // Career path specific steps
  | 'career-person'
  | 'career-target'
  | 'career-strengths'
  | 'career-gaps'
  | 'career-experiences'
  | 'career-support'
  | 'career-milestones';

const SUGGESTIONS = [
  {
    icon: <span className="text-2xl mr-2">✍️</span>,
    title: 'Write self-review',
    desc: 'Create a structured self-assessment using our level competencies',
    value: 'Help me write a self-review using the level competencies framework.'
  },
  {
    icon: <span className="text-2xl mr-2">👥</span>,
    title: 'Write review for an employee',
    desc: 'Draft a comprehensive performance review for a team member',
    value: 'Help me write a performance review for an employee using the levels framework.'
  },
  {
    icon: <span className="text-2xl mr-2">💬</span>,
    title: 'Ongoing performance conversations',
    desc: 'Structure ongoing development conversations using level competencies',
    value: 'Help me plan a 1:1 performance conversation with a team member.'
  },
  {
    icon: <span className="text-2xl mr-2">🎯</span>,
    title: 'Plan an employee\'s career path',
    desc: 'Create development roadmap using level competencies',
    value: 'Help me plan a career path for a team member using the levels framework.'
  },
];

const ReviewsAIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<ReviewStep>('welcome');
  const [reviewType, setReviewType] = useState<'self' | 'employee' | 'feedback' | 'career' | null>(null);
  const [reviewData, setReviewData] = useState<ReviewData>({
    name: '',
    title: '',
    selfReview: '',
    peerReviews: '',
    reviewQuestions: '',
    additionalDetails: '',
    additionalNotes: ''
  });
  const [draftReview, setDraftReview] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (hasStarted) scrollToBottom();
  }, [messages, hasStarted]);

  const addMessage = (content: string, role: 'user' | 'assistant', type: 'text' | 'review-data' | 'final-review' = 'text') => {
    const message: Message = {
      id: Date.now().toString(),
      content,
      role,
      timestamp: new Date(),
      type
    };
    setMessages(prev => [...prev, message]);
  };

  const handleGetStarted = () => {
    addMessage("Let's begin! First, I need the name and title of the individual being reviewed.\n\nPlease provide their full name and current job title.", 'assistant');
    setCurrentStep('name-title');
    setHasStarted(true);
  };

  // Function to process user input from the input field
  const processUserInput = async (userInput: string) => {
    if (!userInput.trim() || isLoading) return;
    addMessage(userInput, 'user');
    setInputValue('');
    setIsLoading(true);
    try {
      await processStep(userInput);
    } catch (error) {
      console.error('Error processing step:', error);
      addMessage("I'm sorry, I encountered an error. Please try again.", 'assistant');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await processUserInput(inputValue);
  };

  const handleSuggestion = (value: string) => {
    // Reset everything for a fresh start
    setMessages([]);
    setCurrentStep('welcome');
    setHasStarted(true);
    
    // Add user message and immediately start the flow
    addMessage(value, 'user');
    setIsLoading(true);
    
    // Determine which flow based on the suggestion value
    if (value.includes('self-review')) {
      setReviewType('self');
      setCurrentStep('self-name');
      addMessage("Let's help you write your self-review! First, what's your name?", 'assistant');
    } else if (value.includes('performance review for an employee')) {
      setReviewType('employee');
      setCurrentStep('emp-name');
      addMessage("Let's help you write a performance review for an employee! First, what's the employee's name?", 'assistant');
    } else if (value.includes('1:1 performance conversation')) {
      setReviewType('feedback');
      setCurrentStep('oneonone-person');
      addMessage("Let's plan a productive 1:1 performance conversation! Who is this conversation for? Please provide their name and current role/level.", 'assistant');
    } else if (value.includes('career path')) {
      setReviewType('career');
      setCurrentStep('career-person');
      addMessage("Let's create a career development plan for your team member! Who are you planning a career path for? Please provide their name and current role/level.", 'assistant');
    } else {
      // Default to employee review flow
      setReviewType('employee');
      setCurrentStep('name-title');
      addMessage("Let's begin! First, I need the name and title of the individual being reviewed.\n\nPlease provide their full name and current job title.", 'assistant');
    }
    
    setIsLoading(false);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      // Check file size (limit to 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (file.size > maxSize) {
        addMessage(`File "${file.name}" is too large. Please upload a file smaller than 10MB.`, 'assistant');
        return;
      }
      
      // Show loading state
      setInputValue(`[Reading file: ${file.name}...]`);
      setIsLoading(true);
      
      try {
        let fileContent = '';
        
                 // Hybrid approach: client-side for simple files, OpenAI for complex files
         if (file.type === 'text/plain' || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
           // Simple text files - process client-side
           fileContent = await readTextFile(file);
         } else if (file.type === 'application/pdf' || file.name.endsWith('.pdf') || 
                   file.type.includes('word') || file.name.endsWith('.docx') || file.name.endsWith('.doc') ||
                   file.type.startsWith('image/')) {
           // Complex files - send to OpenAI for processing
           fileContent = await processFileWithOpenAI(file);
         } else {
           // Unknown file types - try client-side text reading first
           try {
             fileContent = await readTextFile(file);
           } catch (error) {
             // If client-side fails, try OpenAI
             fileContent = await processFileWithOpenAI(file);
           }
         }
        
                 if (fileContent.trim()) {
           // Show the uploaded file in chat
           addMessage(`📎 Uploaded file: ${file.name}`, 'user');
           addMessage(fileContent, 'user');
           
           // Process the file content directly through the step processor
           setInputValue('');
           try {
             await processStep(fileContent);
           } catch (error) {
             console.error('Error processing file content:', error);
             addMessage("I'm sorry, I encountered an error processing the file content. Please try again.", 'assistant');
           }
         } else {
           setInputValue('');
           addMessage("I couldn't extract text from this file. Please try a different file or paste the content directly.", 'assistant');
         }
      } catch (error) {
        console.error('Error reading file:', error);
        setInputValue('');
        addMessage("There was an error reading the file. Please try again or paste the content directly.", 'assistant');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Helper function to read text files
  const readTextFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string || '');
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };



  // Helper function to process files with OpenAI
  const processFileWithOpenAI = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('action', 'extract-text');
      
      const response = await fetch('/api/process-file', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error?.includes('OpenAI API key')) {
          addMessage("I'm sorry, but the AI service is not currently configured. Please copy and paste the text content instead.", 'assistant');
        } else {
          throw new Error(errorData.error || 'Failed to process file');
        }
        return '';
      }

      const data = await response.json();
      return data.extractedText || '';
    } catch (error) {
      console.error('Error processing file with OpenAI:', error);
      addMessage("I had trouble processing this file. Please try copying and pasting the text content instead.", 'assistant');
      return '';
    }
  };

  const processStep = async (userInput: string) => {
    switch (currentStep) {
      // Self-review flow
      case 'self-name':
        setReviewData(prev => ({ ...prev, name: userInput }));
        addMessage("Great! Now, what's your current job title?", 'assistant');
        setCurrentStep('self-title');
        break;
        
      case 'self-title':
        setReviewData(prev => ({ ...prev, title: userInput }));
        addMessage("Perfect! Now, please provide your current self-review content. This should include your own assessment of your performance, achievements, and areas for growth.", 'assistant');
        setCurrentStep('self-content');
        break;
        
      case 'self-content':
        setReviewData(prev => ({ ...prev, selfReview: userInput }));
        addMessage("Thank you! Are there any additional details you would like to include? This could be recent projects, challenges you've overcome, or specific accomplishments you want to highlight.\n\nIf not, just say 'no' or 'none'.", 'assistant');
        setCurrentStep('self-additional');
        break;
        
      case 'self-additional':
        setReviewData(prev => ({ ...prev, additionalDetails: userInput }));
        addMessage("Excellent! Finally, please upload your company's current review questions. You can upload a file or paste the questions directly here.", 'assistant');
        setCurrentStep('self-upload-questions');
        break;
        
      case 'self-upload-questions':
        setReviewData(prev => ({ ...prev, reviewQuestions: userInput }));
        addMessage("Perfect! I'm now analyzing your information and will draft answers to your review questions. This may take a moment...", 'assistant');
        setCurrentStep('analyzing');
        
        // Call API to generate self-review
        try {
          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              message: 'Generate self-review',
              step: 'self-review-analyzing',
              reviewData: {
                ...reviewData,
                reviewQuestions: userInput
              },
              reviewType: 'self'
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            if (errorData.error?.includes('OpenAI API key')) {
              addMessage("I'm sorry, but the AI service is not currently configured. Please contact support to enable this feature.", 'assistant');
            } else {
              throw new Error(errorData.error || 'Failed to generate self-review');
            }
            setCurrentStep('self-upload-questions');
            return;
          }

          const data = await response.json();
          setDraftReview(data.response);
          addMessage(data.response, 'assistant', 'review-data');
          addMessage("I've drafted your self-review based on the information you provided. The answers are written in your voice and aligned with the level competencies for your role.\n\nWould you like to make any changes or refinements before finalizing?", 'assistant');
          setCurrentStep('additional-notes');
        } catch (error) {
          console.error('Error generating self-review:', error);
          addMessage("I'm sorry, I encountered an error while generating your self-review. Please try again.", 'assistant');
          setCurrentStep('self-upload-questions');
                 }
         break;
         
      // Employee review flow
      case 'emp-name':
        setReviewData(prev => ({ ...prev, name: userInput }));
        addMessage("Great! Now, what's their current job title?", 'assistant');
        setCurrentStep('emp-title');
        break;
        
      case 'emp-title':
        setReviewData(prev => ({ ...prev, title: userInput }));
        addMessage("Perfect! Now, please upload their current self-review. You can upload a file or paste the content directly here.", 'assistant');
        setCurrentStep('emp-self-review');
        break;
        
      case 'emp-self-review':
        setReviewData(prev => ({ ...prev, selfReview: userInput }));
        addMessage("Thank you! Now, please upload any peer review feedback about this employee. You can upload a file or paste the content directly here.", 'assistant');
        setCurrentStep('emp-peer-review');
        break;
        
      case 'emp-peer-review':
        setReviewData(prev => ({ ...prev, peerReviews: userInput }));
        addMessage("Excellent! Please upload any additional details you would like to add. This could include recent projects, specific achievements, challenges, or context that would help in writing the review.\n\nIf not, just say 'no' or 'none'.", 'assistant');
        setCurrentStep('emp-additional');
        break;
        
      case 'emp-additional':
        setReviewData(prev => ({ ...prev, additionalDetails: userInput }));
        addMessage("Finally, please upload your company's current review questions. You can upload a file or paste the questions directly here.", 'assistant');
        setCurrentStep('emp-upload-questions');
        break;
        
      case 'emp-upload-questions':
        setReviewData(prev => ({ ...prev, reviewQuestions: userInput }));
        addMessage("Perfect! I'm now analyzing all the information and will draft the employee review. This may take a moment...", 'assistant');
        setCurrentStep('analyzing');
        
        // Call API to generate employee review
        try {
          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              message: 'Generate employee review',
              step: 'employee-review-analyzing',
              reviewData: {
                ...reviewData,
                reviewQuestions: userInput
              },
              reviewType: 'employee'
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            if (errorData.error?.includes('OpenAI API key')) {
              addMessage("I'm sorry, but the AI service is not currently configured. Please contact support to enable this feature.", 'assistant');
            } else {
              throw new Error(errorData.error || 'Failed to generate employee review');
            }
            setCurrentStep('emp-upload-questions');
            return;
          }

          const data = await response.json();
          setDraftReview(data.response);
          addMessage(data.response, 'assistant', 'review-data');
          addMessage(`I've drafted the performance review for ${reviewData.name} based on all the information you provided. The review speaks directly to them with clarity, respect, and constructiveness, and is aligned with the level competencies for their role.\n\nWould you like to make any changes or refinements before finalizing?`, 'assistant');
          setCurrentStep('additional-notes');
        } catch (error) {
          console.error('Error generating employee review:', error);
          addMessage("I'm sorry, I encountered an error while generating the employee review. Please try again.", 'assistant');
          setCurrentStep('emp-upload-questions');
                 }
         break;
         
      // 1:1 Performance Conversation flow
      case 'oneonone-person':
        setReviewData(prev => ({ ...prev, name: userInput }));
        addMessage("Great! Now, what specific competency or area do you want to focus on in this conversation?\n\nFor example: 'Design Skills', 'Communication', 'Leadership', 'Problem Solving', 'Collaboration', etc. Think about their current level and what would be most valuable to discuss.", 'assistant');
        setCurrentStep('oneonone-competency');
        break;
        
      case 'oneonone-competency':
        setReviewData(prev => ({ ...prev, title: userInput })); // Using title field for competency
        addMessage("Perfect! Now, what recent examples or situations relate to this competency?\n\nPlease describe specific instances, projects, or behaviors you've observed that you want to discuss with them.", 'assistant');
        setCurrentStep('oneonone-examples');
        break;
        
      case 'oneonone-examples':
        setReviewData(prev => ({ ...prev, selfReview: userInput })); // Using selfReview field for examples
        addMessage("Excellent! What's going well in this area?\n\nDescribe the strengths you want to reinforce and positive behaviors you've noticed.", 'assistant');
        setCurrentStep('oneonone-strengths');
        break;
        
      case 'oneonone-strengths':
        setReviewData(prev => ({ ...prev, peerReviews: userInput })); // Using peerReviews field for strengths
        addMessage("Great! Now, what could be improved or developed further?\n\nWhat growth opportunities do you see in this competency area?", 'assistant');
        setCurrentStep('oneonone-improvements');
        break;
        
      case 'oneonone-improvements':
        setReviewData(prev => ({ ...prev, reviewQuestions: userInput })); // Using reviewQuestions field for improvements
        addMessage("Good! What support or resources do they need?\n\nHow can you help them develop in this area? What resources, training, or opportunities could be valuable?", 'assistant');
        setCurrentStep('oneonone-support');
        break;
        
      case 'oneonone-support':
        setReviewData(prev => ({ ...prev, additionalDetails: userInput }));
        addMessage("Excellent! Finally, what are the next steps or goals?\n\nWhat specific, actionable items do you want to establish for their development in this area?", 'assistant');
        setCurrentStep('oneonone-goals');
        break;
        
      case 'oneonone-goals':
        setReviewData(prev => ({ ...prev, additionalNotes: userInput }));
        addMessage("Perfect! I'm now creating your 1:1 conversation guide based on the level competencies. This will include talking points, coaching questions, and development suggestions.", 'assistant');
        setCurrentStep('analyzing');
        
        // Call API to generate 1:1 conversation guide
        try {
          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              message: 'Generate 1:1 conversation guide',
              step: 'oneonone-analyzing',
              reviewData: {
                name: reviewData.name,
                competency: reviewData.title, // competency stored in title field
                examples: reviewData.selfReview, // examples stored in selfReview field
                strengths: reviewData.peerReviews, // strengths stored in peerReviews field
                improvements: reviewData.reviewQuestions, // improvements stored in reviewQuestions field
                support: reviewData.additionalDetails,
                goals: userInput
              },
              reviewType: 'oneonone'
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            if (errorData.error?.includes('OpenAI API key')) {
              addMessage("I'm sorry, but the AI service is not currently configured. Please contact support to enable this feature.", 'assistant');
            } else {
              throw new Error(errorData.error || 'Failed to generate 1:1 conversation guide');
            }
            setCurrentStep('oneonone-goals');
            return;
          }

          const data = await response.json();
          setDraftReview(data.response);
          addMessage(data.response, 'assistant', 'review-data');
          addMessage(`I've created a comprehensive 1:1 conversation guide for your discussion with ${reviewData.name}. This includes specific talking points, coaching questions, and development suggestions based on the level competencies.\n\nWould you like to make any adjustments to the conversation plan?`, 'assistant');
          setCurrentStep('additional-notes');
        } catch (error) {
          console.error('Error generating 1:1 conversation guide:', error);
          addMessage("I'm sorry, I encountered an error while creating the conversation guide. Please try again.", 'assistant');
          setCurrentStep('oneonone-goals');
                 }
         break;
         
      // Career Path Planning flow
      case 'career-person':
        setReviewData(prev => ({ ...prev, name: userInput }));
        addMessage("Great! What level/role are they targeting next?\n\nFor example: 'Senior Product Designer', 'Lead Designer', 'Principal Designer', or describe the type of role they're interested in.", 'assistant');
        setCurrentStep('career-target');
        break;
        
      case 'career-target':
        setReviewData(prev => ({ ...prev, title: userInput })); // Using title field for target role
        addMessage("Perfect! What are their current strengths?\n\nDescribe the competencies they already excel at and the skills that make them successful in their current role.", 'assistant');
        setCurrentStep('career-strengths');
        break;
        
      case 'career-strengths':
        setReviewData(prev => ({ ...prev, selfReview: userInput })); // Using selfReview field for strengths
        addMessage("Excellent! What competencies do they need to develop?\n\nBased on their target role, what skills or competencies do they need to build or strengthen to be ready for the next level?", 'assistant');
        setCurrentStep('career-gaps');
        break;
        
      case 'career-gaps':
        setReviewData(prev => ({ ...prev, peerReviews: userInput })); // Using peerReviews field for gaps
        addMessage("Great! What experiences or opportunities do they need?\n\nWhat specific projects, stretch assignments, leadership opportunities, or cross-functional experiences would help them develop?", 'assistant');
        setCurrentStep('career-experiences');
        break;
        
      case 'career-experiences':
        setReviewData(prev => ({ ...prev, reviewQuestions: userInput })); // Using reviewQuestions field for experiences
        addMessage("Excellent! What support and resources can you provide?\n\nHow can you help them in their development? Consider mentoring, training, introductions, sponsorship, or other support you can offer.", 'assistant');
        setCurrentStep('career-support');
        break;
        
      case 'career-support':
        setReviewData(prev => ({ ...prev, additionalDetails: userInput }));
        addMessage("Perfect! Finally, what are the key milestones or indicators of progress?\n\nHow will you both know they're making progress and becoming ready for the next level? What specific achievements or demonstrations of competency should you look for?", 'assistant');
        setCurrentStep('career-milestones');
        break;
        
      case 'career-milestones':
        setReviewData(prev => ({ ...prev, additionalNotes: userInput }));
        addMessage("Excellent! I'm now creating a comprehensive career development roadmap based on the level competencies. This will include specific development areas, action plans, and progress indicators.", 'assistant');
        setCurrentStep('analyzing');
        
        // Call API to generate career development plan
        try {
          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              message: 'Generate career development plan',
              step: 'career-analyzing',
              reviewData: {
                name: reviewData.name,
                targetRole: reviewData.title, // target role stored in title field
                strengths: reviewData.selfReview, // strengths stored in selfReview field
                gaps: reviewData.peerReviews, // gaps stored in peerReviews field
                experiences: reviewData.reviewQuestions, // experiences stored in reviewQuestions field
                support: reviewData.additionalDetails,
                milestones: userInput
              },
              reviewType: 'career'
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            if (errorData.error?.includes('OpenAI API key')) {
              addMessage("I'm sorry, but the AI service is not currently configured. Please contact support to enable this feature.", 'assistant');
            } else {
              throw new Error(errorData.error || 'Failed to generate career development plan');
            }
            setCurrentStep('career-milestones');
            return;
          }

          const data = await response.json();
          setDraftReview(data.response);
          addMessage(data.response, 'assistant', 'review-data');
          addMessage(`I've created a comprehensive career development roadmap for ${reviewData.name}. This includes specific competency development areas, actionable steps, resource recommendations, and progress milestones based on the level competencies framework.\n\nWould you like to make any adjustments to the career development plan?`, 'assistant');
          setCurrentStep('additional-notes');
        } catch (error) {
          console.error('Error generating career development plan:', error);
          addMessage("I'm sorry, I encountered an error while creating the career development plan. Please try again.", 'assistant');
          setCurrentStep('career-milestones');
        }
        break;
           
      case 'name-title':
        const nameTitleParts = userInput.split(',').map(part => part.trim());
        if (nameTitleParts.length >= 2) {
          setReviewData(prev => ({ ...prev, name: nameTitleParts[0], title: nameTitleParts[1] }));
          addMessage(`Great! I have ${nameTitleParts[0]}'s information. Now I need their self-review.\n\nPlease provide their self-review content. This should include their own assessment of their performance, achievements, and areas for growth.`, 'assistant');
          setCurrentStep('self-review');
        } else {
          addMessage("Please provide both the name and title separated by a comma (e.g., 'John Smith, Senior Product Designer').", 'assistant');
        }
        break;

      case 'self-review':
        setReviewData(prev => ({ ...prev, selfReview: userInput }));
        addMessage("Thank you! Now I need the peer reviews.\n\nPlease provide feedback from colleagues, team members, or other stakeholders who have worked with this individual.", 'assistant');
        setCurrentStep('peer-reviews');
        break;

      case 'peer-reviews':
        setReviewData(prev => ({ ...prev, peerReviews: userInput }));
        addMessage("Excellent! Now I need the specific review questions from your organization.\n\nPlease provide the exact questions or prompts that need to be answered in this review.", 'assistant');
        setCurrentStep('review-questions');
        break;

      case 'review-questions':
        setReviewData(prev => ({ ...prev, reviewQuestions: userInput }));
        addMessage("Perfect! Is there any additional context or information you'd like me to consider when drafting the review?\n\nThis could include:\n• Recent projects or achievements\n• Team dynamics or collaboration\n• Specific challenges or opportunities\n• Career goals or aspirations\n\nIf not, just say 'no' or 'none'.", 'assistant');
        setCurrentStep('additional-details');
        break;

      case 'additional-details':
        setReviewData(prev => ({ ...prev, additionalDetails: userInput }));
        addMessage("Thank you! I'm now analyzing all the information and drafting the review. This may take a moment...", 'assistant');
        setCurrentStep('analyzing');
        
        // Call API to generate structured review
        try {
          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              message: 'Generate structured review',
              step: 'analyzing',
              reviewData 
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            if (errorData.error?.includes('OpenAI API key')) {
              addMessage("I'm sorry, but the AI service is not currently configured. Please contact support to enable this feature.", 'assistant');
            } else {
              throw new Error(errorData.error || 'Failed to generate review');
            }
            setCurrentStep('additional-details');
            return;
          }

          const data = await response.json();
          setDraftReview(data.response);
          addMessage(data.response, 'assistant', 'review-data');
          addMessage("I've drafted the review based on the information provided. Would you like to add any additional notes or comments before we finalize it?\n\nIf not, just say 'no' or 'ready to finalize'.", 'assistant');
          setCurrentStep('additional-notes');
        } catch (error) {
          console.error('Error generating review:', error);
          addMessage("I'm sorry, I encountered an error while generating the review. Please try again.", 'assistant');
          setCurrentStep('additional-details');
        }
        break;

      case 'additional-notes':
        setReviewData(prev => ({ ...prev, additionalNotes: userInput }));
        try {
          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              message: 'Generate final review',
              step: 'finalizing',
              reviewData: { 
                ...reviewData, 
                additionalNotes: userInput,
                draftReview: draftReview // Pass the draft review content
              }
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            if (errorData.error?.includes('OpenAI API key')) {
              addMessage("I'm sorry, but the AI service is not currently configured. Please contact support to enable this feature.", 'assistant');
            } else {
              throw new Error(errorData.error || 'Failed to generate final review');
            }
            return;
          }

          const data = await response.json();
          addMessage(data.response, 'assistant', 'final-review');
          addMessage("The review is now complete! You can copy the text above and use it for your submission.\n\nWould you like to start a new review for someone else?", 'assistant');
          setCurrentStep('complete');
        } catch (error) {
          console.error('Error generating final review:', error);
          addMessage("I'm sorry, I encountered an error while finalizing the review. Please try again.", 'assistant');
        }
        break;

      default:
        addMessage("I'm not sure what step we're on. Let's start over - would you like to begin a new review?", 'assistant');
        setCurrentStep('welcome');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

    const renderMessage = (message: Message) => {
    const isUser = message.role === 'user';

    return (
      <div key={message.id} className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
        <div className={`${isUser ? 'max-w-[80%]' : 'w-full'} ${isUser ? 'order-2' : 'order-1'}`}>
          <div className={`${isUser ? 'px-4 py-3 rounded-2xl bg-gray-100 text-gray-900 ml-auto' : 'py-3'}`}>
            <div className="whitespace-pre-wrap leading-relaxed text-[15px] text-gray-900">
              {message.content}
            </div>
          </div>
          
          {/* Timestamp */}
          <div className={`mt-1 text-xs text-gray-500 ${isUser ? 'text-right' : 'text-left'}`}>
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
    );
  };

    // Show welcome state or chat messages
  const showWelcome = !hasStarted;

  // Normal chat mode after first user input
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 pt-20 px-4 sm:px-6 lg:px-8">
        <article className="max-w-[680px] mx-auto">
          {showWelcome ? (
            // Welcome content
            <div>
              <div className="mb-2">
                <h1 className="text-[32px] font-normal text-[#1a1f36] tracking-[-0.4px] text-center font-fraunces" style={{ fontFamily: 'Fraunces, serif' }}>
                  How can I help you today?
                </h1>
              </div>

              <div className="text-center text-sm text-gray-500 mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
                ReviewsAI can help you write, improve, and analyze reviews for your team.
              </div>

              <div>
                <section className="mb-8">
                  <div className="relative bg-white/60 backdrop-blur-[2px] rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] ring-1 ring-black/[0.02] overflow-hidden" style={{
                    background: 'white',
                    position: 'relative'
                  }}>
                    <div className="absolute inset-0 rounded-xl" style={{
                      background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(219, 39, 119, 0.15), rgba(147, 51, 234, 0.15))',
                      padding: '1px',
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'exclude',
                      WebkitMaskComposite: 'xor',
                      opacity: 0.5
                    }}></div>
                    {SUGGESTIONS.map((s, i) => (
                      <button
                        key={i}
                        className={`relative block w-full group no-underline hover:no-underline text-left focus:outline-none px-6 py-6 hover:bg-[#f9f9f9] transition-colors ${
                          i < SUGGESTIONS.length - 1 ? 'border-b border-gray-200' : ''
                        }`}
                        onClick={() => handleSuggestion(s.value)}
                        type="button"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        <div className="flex items-center">
                          <div className="flex-shrink-0 text-2xl mr-3 sm:mr-4 text-gray-700">
                            {s.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-[15px] font-semibold text-[#1a1f36] leading-none mb-1.5">
                              {s.title}
                            </h3>
                            <p className="text-[13px] text-[#3c4257] leading-none">{s.desc}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </button>
                    ))}
                  </div>
                                 </section>

                 {/* Chat input field */}
                 <div className="pt-40">
                   <div className="flex items-center bg-white border-2 border-gray-300 rounded-full shadow-sm focus-within:!border-black transition-colors">
                     <div className="flex items-center pl-4 pr-2">
                       <div className="relative group">
                         <button 
                           type="button" 
                           onClick={handleFileUpload}
                           className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                         >
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                           </svg>
                         </button>
                         <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                           Upload files (images, PDFs, Word docs, text files)
                           <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                         </div>
                       </div>
                       <input
                         ref={fileInputRef}
                         type="file"
                         className="hidden"
                         accept=".txt,.pdf,.doc,.docx,.md,.rtf,.jpg,.jpeg,.png,.gif,.bmp,.webp,text/plain,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*"
                         onChange={handleFileChange}
                       />
                     </div>
                     <input
                       id="reviewsai-input"
                       type="text"
                       value={inputValue}
                       onChange={(e) => setInputValue(e.target.value)}
                       placeholder="Ask me anything about reviews"
                       className="flex-1 px-2 py-4 bg-transparent border-none focus:outline-none text-base"
                       disabled={isLoading}
                       autoFocus
                       style={{ fontFamily: 'Inter, sans-serif' }}
                       onKeyDown={(e) => {
                         if (e.key === 'Enter' && !e.shiftKey) {
                           e.preventDefault();
                           handleSubmit(e as any);
                         }
                       }}
                     />
                     <div className="flex items-center pr-4">
                       {inputValue.trim() && (
                         <button
                           onClick={handleSubmit}
                           disabled={isLoading}
                           className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all mr-2"
                         >
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                           </svg>
                         </button>
                       )}
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           ) : (
            // Chat messages
            <div>
              <div ref={chatContainerRef} className="h-[600px] overflow-y-auto mb-6 p-4">
                <div className="space-y-6">
                  {messages.map(renderMessage)}
                  {isLoading && (
                    <div className="flex justify-start mb-4">
                      <div className="w-full">
                        <div className="py-3">
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                            <span className="text-sm text-gray-600">
                              {currentStep === 'analyzing' ? 'Analyzing and drafting review...' : 'Thinking...'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Chat input field - same position as welcome screen */}
              <div className="pt-2">
                <div className="flex items-center bg-white border-2 border-gray-300 rounded-full shadow-sm focus-within:!border-black transition-colors">
                  <div className="flex items-center pl-4 pr-2">
                    <div className="relative group">
                      <button 
                        type="button" 
                        onClick={handleFileUpload}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                        Upload files (images, PDFs, Word docs, text files)
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept=".txt,.pdf,.doc,.docx,.md,.rtf,.jpg,.jpeg,.png,.gif,.bmp,.webp,text/plain,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={
                      showWelcome ? "Ask anything about reviews" :
                      currentStep === 'self-name' ? "Enter your name..." :
                      currentStep === 'self-title' ? "Enter your job title..." :
                      currentStep === 'self-content' ? "Paste your self-review content..." :
                      currentStep === 'self-additional' ? "Any additional details or 'none'..." :
                      currentStep === 'self-upload-questions' ? "Paste your company's review questions..." :
                      currentStep === 'emp-name' ? "Enter the employee's name..." :
                      currentStep === 'emp-title' ? "Enter their job title..." :
                      currentStep === 'emp-self-review' ? "Paste their self-review content..." :
                      currentStep === 'emp-peer-review' ? "Paste peer review feedback..." :
                      currentStep === 'emp-additional' ? "Any additional details or 'none'..." :
                      currentStep === 'emp-upload-questions' ? "Paste your company's review questions..." :
                      currentStep === 'oneonone-person' ? "Enter their name and role/level..." :
                      currentStep === 'oneonone-competency' ? "Enter competency area (e.g., 'Design Skills', 'Communication')..." :
                      currentStep === 'oneonone-examples' ? "Describe recent examples or situations..." :
                      currentStep === 'oneonone-strengths' ? "Describe what's going well..." :
                      currentStep === 'oneonone-improvements' ? "Describe areas for growth..." :
                      currentStep === 'oneonone-support' ? "Describe support or resources needed..." :
                      currentStep === 'oneonone-goals' ? "Describe next steps or goals..." :
                      currentStep === 'career-person' ? "Enter their name and current role/level..." :
                      currentStep === 'career-target' ? "Enter target role (e.g., 'Senior Product Designer')..." :
                      currentStep === 'career-strengths' ? "Describe their current strengths..." :
                      currentStep === 'career-gaps' ? "Describe competencies they need to develop..." :
                      currentStep === 'career-experiences' ? "Describe experiences or opportunities needed..." :
                      currentStep === 'career-support' ? "Describe support you can provide..." :
                      currentStep === 'career-milestones' ? "Describe progress indicators..." :
                      currentStep === 'name-title' ? "Enter name and title (e.g., 'John Smith, Senior Product Designer')" :
                      currentStep === 'self-review' ? "Paste the self-review content..." :
                      currentStep === 'peer-reviews' ? "Paste the peer review feedback..." :
                      currentStep === 'review-questions' ? "Paste the review questions..." :
                      currentStep === 'additional-details' ? "Any additional context or 'none'..." :
                      currentStep === 'additional-notes' ? "Any final notes or 'ready to finalize'..." :
                      "Ask me anything about reviews"
                    }
                    className="flex-1 px-2 py-4 bg-transparent border-none focus:outline-none text-base"
                    disabled={isLoading}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e as any);
                      }
                    }}
                  />
                  <div className="flex items-center pr-4">
                    {inputValue.trim() && (
                      <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all mr-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </article>
      </main>

                   {/* "Start New Review" button when complete */}
      {currentStep === 'complete' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 z-10">
          <div className="max-w-[680px] mx-auto text-center">
            <button
              onClick={() => {
                setCurrentStep('welcome');
                setMessages([]);
                setReviewType(null);
                setReviewData({
                  name: '',
                  title: '',
                  selfReview: '',
                  peerReviews: '',
                  reviewQuestions: '',
                  additionalDetails: '',
                  additionalNotes: ''
                });
                setDraftReview('');
                setHasStarted(false);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 font-medium"
            >
              <CheckCircle className="w-5 h-5" />
              Start New Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsAIChat; 