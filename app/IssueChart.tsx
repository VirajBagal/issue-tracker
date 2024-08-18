'use client';

import { Card } from '@radix-ui/themes';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface IssueChartProps {
  open: number;
  inProgress: number;
  done: number;
}

const IssueChart = ({ open, inProgress, done }: IssueChartProps) => {
  const data = [
    { label: 'Open', value: open },
    { label: 'In Progress', value: inProgress },
    { label: 'Done', value: done },
  ];

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar dataKey="value" style={{fill: 'var(--accent-9)'}} barSize={60} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;