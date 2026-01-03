'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2, Calendar, Clock, Repeat, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getSmartReminderConfig } from '@/lib/actions';
import type { Loan, LoanStatus } from '@/lib/types';
import type { SmartReminderOutput, SmartReminderInput } from '@/ai/flows/smart-reminder-configuration';

type SmartReminderDialogProps = {
  loan: Loan;
  status: LoanStatus;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const riskProfileMapping: Record<LoanStatus, 'low' | 'medium' | 'high'> = {
  'On Track': 'low',
  'Due Soon': 'medium',
  'Overdue': 'high',
};

export default function SmartReminderDialog({ loan, status, open, onOpenChange }: SmartReminderDialogProps) {
  const [riskProfile, setRiskProfile] = useState<'low' | 'medium' | 'high'>(riskProfileMapping[status]);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SmartReminderOutput | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsLoading(true);
    setResult(null);

    const input: SmartReminderInput = {
      loanName: loan.name,
      emiAmount: loan.emi,
      dueDate: new Date().toISOString(), // Using current date as a placeholder for next due date
      riskProfile,
    };

    const response = await getSmartReminderConfig(input);

    if (response.success && response.data) {
      setResult(response.data);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error Generating Reminder',
        description: response.error,
      });
    }

    setIsLoading(false);
  };
  
  const handleOpenChange = (isOpen: boolean) => {
    if(!isOpen) {
        setResult(null);
        setRiskProfile(riskProfileMapping[status]);
    }
    onOpenChange(isOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>AI Smart Reminder</DialogTitle>
          <DialogDescription>
            Let AI suggest an optimal reminder schedule for your "{loan.name}" loan. Adjust your risk profile if needed.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label>Your Perceived Risk Profile</Label>
            <RadioGroup
              defaultValue={riskProfile}
              onValueChange={(value: 'low' | 'medium' | 'high') => setRiskProfile(value)}
              className="flex"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="low" />
                <Label htmlFor="low">Low</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="high" />
                <Label htmlFor="high">High</Label>
              </div>
            </RadioGroup>
          </div>

          {result && (
            <div className="p-4 bg-secondary rounded-lg space-y-3 text-sm">
                <h3 className="font-semibold text-foreground">Suggested Configuration</h3>
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary"/>
                    <span>First reminder: <strong>{result.reminderDaysBefore} days</strong> before due date.</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Repeat className="h-4 w-4 text-primary"/>
                    <span>Frequency: <strong>{result.reminderFrequency}</strong>.</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary"/>
                    <span>Time: Around <strong>{result.reminderTime}</strong>.</span>
                </div>
                 <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-primary mt-0.5 shrink-0"/>
                    <span>Details: <strong>{result.additionalDetails}</strong></span>
                </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleGenerate} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {result ? 'Regenerate' : 'Generate Suggestion'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
