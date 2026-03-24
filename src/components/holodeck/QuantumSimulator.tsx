// src/components/holodeck/QuantumSimulator.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Slider } from '@/components/ui/Slider';
import Tabs from '@/components/ui/Tabs';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Heart, 
  Shield,
  Loader2,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';

// Simulator logic (ported to TypeScript)
interface SimulationState {
  day: number;
  users: number;
  creators: number;
  vendors: number;
  totalEarnings: number;
  residualPerUser: number;
  adPayoutPerOptIn: number;
  platformRevenue: number;
  mutualAidFund: number;
  residualPool: number;
  history: {
    days: number[];
    residualPerUser: number[];
    adPayouts: number[];
    platformRevenue: number[];
    population: number[];
  };
}

export function QuantumSimulator() {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [state, setState] = useState<SimulationState | null>(null);
  const [simulationComplete, setSimulationComplete] = useState(false);

  // Simulator parameters
  const [params, setParams] = useState({
    initialUsers: 100,
    initialCreators: 10,
    initialVendors: 5,
    userGrowthRate: 0.001,
    creatorGrowthRate: 0.0005,
    vendorGrowthRate: 0.0003,
    creatorFee: 30,
    vendorFee: 7.5,
    residualToUsers: 100,
    adOptInRate: 30,
  });

  const runSimulation = () => {
    // Implementation of the quantum economy simulation
    // This is the TypeScript version of the Python code
    const days = 365 * 10; // 10 years
    const history = {
      days: [],
      residualPerUser: [],
      adPayouts: [],
      platformRevenue: [],
      population: [],
    };
    
    let users = params.initialUsers;
    let creators = params.initialCreators;
    let vendors = params.initialVendors;
    let totalEarnings = 0;
    
    for (let day = 0; day < days; day++) {
      // Growth
      users += users * params.userGrowthRate;
      creators += creators * params.creatorGrowthRate;
      vendors += vendors * params.vendorGrowthRate;
      
      // Sales simulation
      const dailySales = users * 0.01; // 1% of users buy something
      const avgPrice = 25;
      const creatorSales = dailySales * (creators / (creators + vendors)) * 0.7;
      const vendorSales = dailySales * (vendors / (creators + vendors)) * 0.7;
      
      const creatorRevenue = creatorSales * avgPrice;
      const vendorRevenue = vendorSales * avgPrice;
      const platformFee = (creatorRevenue * params.creatorFee / 100) + 
                          (vendorRevenue * params.vendorFee / 100);
      
      // Residual pool
      const residualPool = platformFee * 0.333; // 1/3 of platform fee
      const residualPerUser = residualPool / users;
      
      // Ad revenue
      const adRevenue = users * 0.5; // $0.50 per user
      const adSurplus = adRevenue * 0.8; // 20% operational costs
      const optInUsers = users * (params.adOptInRate / 100);
      const adPayout = adSurplus / optInUsers;
      
      // Update totals
      totalEarnings += residualPerUser * users + adPayout * optInUsers;
      
      // Store history
      if (day % 365 === 0) { // Store yearly data
        history.days.push(day / 365);
        history.residualPerUser.push(residualPerUser);
        history.adPayouts.push(adPayout);
        history.platformRevenue.push(platformFee);
        history.population.push(users);
      }
    }
    
    setState({
      day: days,
      users: Math.floor(users),
      creators: Math.floor(creators),
      vendors: Math.floor(vendors),
      totalEarnings,
      residualPerUser: history.residualPerUser[history.residualPerUser.length - 1],
      adPayoutPerOptIn: history.adPayouts[history.adPayouts.length - 1],
      platformRevenue: history.platformRevenue[history.platformRevenue.length - 1],
      mutualAidFund: history.platformRevenue[history.platformRevenue.length - 1] * 0.333,
      residualPool: history.residualPerUser[history.residualPerUser.length - 1] * users,
      history,
    });
    
    setSimulationComplete(true);
  };

  const runSimulationAsync = async () => {
    setSimulationComplete(false);
    // Simulate async calculation
    setTimeout(() => {
      runSimulation();
    }, 100);
  };

  if (!state) {
    return (
      <div className="space-y-8">
        <Card className="p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Quantum Economy Simulator</h3>
          <p className="text-white/60 mb-8">
            Configure the parameters and run the simulation to see the future of the sanctuary economy.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-white/60 mb-2 block">Initial Users</label>
                <Slider
                  value={params.initialUsers}
                  onChange={(v) => setParams({ ...params, initialUsers: v })}
                  min={10}
                  max={1000}
                  step={10}
                  showValue={true}
                />
              </div>
              <div>
                <label className="text-sm text-white/60 mb-2 block">Creator Fee (%)</label>
                <Slider
                  value={params.creatorFee}
                  onChange={(v) => setParams({ ...params, creatorFee: v })}
                  min={10}
                  max={50}
                  step={5}
                  showValue={true}
                />
              </div>
              <div>
                <label className="text-sm text-white/60 mb-2 block">User Growth Rate (%)</label>
                <Slider
                  value={params.userGrowthRate * 100}
                  onChange={(v) => setParams({ ...params, userGrowthRate: v / 100 })}
                  min={0}
                  max={1}
                  step={0.1}
                  showValue={true}
                  formatValue={(v) => `${v}%`}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-white/60 mb-2 block">Initial Creators</label>
                <Slider
                  value={params.initialCreators}
                  onChange={(v) => setParams({ ...params, initialCreators: v })}
                  min={0}
                  max={200}
                  step={5}
                  showValue={true}
                />
              </div>
              <div>
                <label className="text-sm text-white/60 mb-2 block">Vendor Fee (%)</label>
                <Slider
                  value={params.vendorFee}
                  onChange={(v) => setParams({ ...params, vendorFee: v })}
                  min={0}
                  max={20}
                  step={1}
                  showValue={true}
                />
              </div>
              <div>
                <label className="text-sm text-white/60 mb-2 block">Ad Opt-in Rate (%)</label>
                <Slider
                  value={params.adOptInRate}
                  onChange={(v) => setParams({ ...params, adOptInRate: v })}
                  min={0}
                  max={100}
                  step={5}
                  showValue={true}
                />
              </div>
            </div>
          </div>
          
          <Button onClick={runSimulationAsync} size="lg">
            Run 10-Year Simulation
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <Users className="text-cyan-400 mx-auto mb-2" size={24} />
          <div className="text-2xl font-bold text-white">{state.users.toLocaleString()}</div>
          <div className="text-xs text-white/40">Total Users</div>
        </Card>
        <Card className="p-4 text-center">
          <TrendingUp className="text-purple-400 mx-auto mb-2" size={24} />
          <div className="text-2xl font-bold text-white">${state.totalEarnings.toLocaleString()}</div>
          <div className="text-xs text-white/40">Total Earnings</div>
        </Card>
        <Card className="p-4 text-center">
          <Heart className="text-pink-400 mx-auto mb-2" size={24} />
          <div className="text-2xl font-bold text-white">${state.residualPerUser.toFixed(2)}</div>
          <div className="text-xs text-white/40">Monthly Dignity</div>
        </Card>
        <Card className="p-4 text-center">
          <DollarSign className="text-green-400 mx-auto mb-2" size={24} />
          <div className="text-2xl font-bold text-white">${state.adPayoutPerOptIn.toFixed(2)}</div>
          <div className="text-xs text-white/40">Monthly Ad Payout</div>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-white font-bold mb-4">Universal Basic Dignity</h3>
          <div className="h-48 flex items-end gap-2">
            {state.history.residualPerUser.map((value, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-cyan-500/50 to-cyan-400 rounded-t"
                style={{ height: `${(value / Math.max(...state.history.residualPerUser)) * 100}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-white/40">
            <span>Year 1</span>
            <span>Year 5</span>
            <span>Year 10</span>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-white font-bold mb-4">Population Growth</h3>
          <div className="h-48 flex items-end gap-2">
            {state.history.population.map((value, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-purple-500/50 to-purple-400 rounded-t"
                style={{ height: `${(value / Math.max(...state.history.population)) * 100}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-white/40">
            <span>Year 1</span>
            <span>Year 5</span>
            <span>Year 10</span>
          </div>
        </Card>
      </div>
      
      {/* Projections Table */}
      <Card className="p-6">
        <h3 className="text-white font-bold mb-4">10-Year Projections</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-2 text-white/60">Year</th>
              <th className="text-right py-2 text-white/60">Users</th>
              <th className="text-right py-2 text-white/60">Monthly Dignity</th>
              <th className="text-right py-2 text-white/60">Monthly Ad Payout</th>
            </tr>
          </thead>
          <tbody>
            {state.history.days.map((year, i) => (
              <tr key={year} className="border-b border-white/5">
                <td className="py-2 text-white">Year {Math.floor(year)}</td>
                <td className="py-2 text-right text-white/80">{Math.floor(state.history.population[i]).toLocaleString()}</td>
                <td className="py-2 text-right text-cyan-400">${state.history.residualPerUser[i].toFixed(2)}</td>
                <td className="py-2 text-right text-purple-400">${state.history.adPayouts[i].toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      
      {/* Run Again Button */}
      <div className="text-center">
        <Button onClick={runSimulationAsync} variant="outline">
          <RefreshCw size={16} className="mr-2" />
          Run Again
        </Button>
      </div>
    </div>
  );
}