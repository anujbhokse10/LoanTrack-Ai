'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  RadialBarChart,
  RadialBar,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLoanContext } from '@/contexts/loan-context';
import { useMemo } from 'react';
import { calculateRemainingBalance, formatCurrency } from '@/lib/utils';
import { addMonths, format } from 'date-fns';

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    if(payload[0].payload.name) { // Pie Chart
        return (
          <div className="rounded-lg border bg-background p-2 shadow-sm">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col space-y-1">
                <span className="text-[0.7rem] uppercase text-muted-foreground">
                  Loan
                </span>
                <span className="font-bold text-muted-foreground">
                  {payload[0].name}
                </span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-[0.7rem] uppercase text-muted-foreground">
                  Balance
                </span>
                <span className="font-bold">
                  {formatCurrency(payload[0].value)}
                </span>
              </div>
            </div>
          </div>
        );
    }
     if (payload[0].payload.month) { // Bar Chart
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
           <span className="font-bold">{formatCurrency(payload[0].value)}</span>
           <span className="text-sm text-muted-foreground"> in {label}</span>
        </div>
      );
    }
  }

  return null;
};

export default function Charts() {
  const { loans } = useLoanContext();

  const pieChartData = useMemo(() => {
    return loans.map(loan => ({
      name: loan.name,
      value: calculateRemainingBalance(loan),
    }));
  }, [loans]);

  const barChartData = useMemo(() => {
    if(loans.length === 0) return [];
    
    const monthlyPayments: { [key: string]: number } = {};
    const now = new Date();

    loans.forEach(loan => {
      const startDate = new Date(loan.startDate);
      for(let i = 0; i < loan.tenure; i++) {
        const paymentDate = addMonths(startDate, i);
        if(paymentDate > now) {
            const monthKey = format(paymentDate, 'MMM yyyy');
            if(!monthlyPayments[monthKey]) {
                monthlyPayments[monthKey] = 0;
            }
            monthlyPayments[monthKey] += loan.emi;
        }
      }
    });

    const next12Months = Array.from({length: 12}).map((_, i) => addMonths(now, i));
    
    return next12Months.map(date => {
        const monthKey = format(date, 'MMM yyyy');
        return {
            month: format(date, 'MMM'),
            totalEmi: monthlyPayments[monthKey] || 0
        }
    });

  }, [loans]);

  if(loans.length === 0) {
      return (
          <div className="flex flex-col gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Loan Distribution</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-48">
                    <p className="text-muted-foreground">No data to display.</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Upcoming Payments</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-48">
                    <p className="text-muted-foreground">No data to display.</p>
                </CardContent>
            </Card>
          </div>
      )
  }

  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Loan Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend iconSize={10} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Payments (12 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value: number) => `₹${value/1000}k`}/>
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--secondary))' }} />
              <Bar dataKey="totalEmi" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
