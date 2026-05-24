'use client'

import React, { useState, useEffect } from 'react'
import ServiceHealthWidget, { Service } from '@/components/ServiceHealthWidget'
import { Activity, Database, Cloud, Github } from 'lucide-react'

export default function Page() {
  const [services, setServices] = useState<Service[]>([
    { name: 'Firebase Auth', status: 'operational', icon: <Activity size={16} />, latency: '12ms', lastSync: 'Just now', errorLogs: [], latencyHistory: Array.from({length: 12}, (_, i) => ({time: i.toString(), value: 12})) },
    { name: 'Firestore DB', status: 'operational', icon: <Database size={16} />, latency: '35ms', lastSync: '2s ago', errorLogs: [], latencyHistory: Array.from({length: 12}, (_, i) => ({time: i.toString(), value: 35})) },
    { name: 'Cloud Run', status: 'operational', icon: <Cloud size={16} />, latency: '89ms', lastSync: '10s ago', errorLogs: ['Connection timeout at 10:00 AM'], latencyHistory: Array.from({length: 12}, (_, i) => ({time: i.toString(), value: 89})) },
    { name: 'GitHub Sync', status: 'operational', icon: <Github size={16} />, latency: '45ms', lastSync: '1m ago', errorLogs: [], latencyHistory: Array.from({length: 12}, (_, i) => ({time: i.toString(), value: 45})) },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setServices(prev => prev.map(s => {
        const newStatus = Math.random() > 0.95 ? (Math.random() > 0.5 ? 'degraded' : 'operational') : s.status;
        const newLatency = Math.floor(20 + Math.random() * 50);
        return { 
          ...s, 
          status: newStatus,
          latency: `${newLatency}ms`,
          latencyHistory: [...s.latencyHistory.slice(1), {time: Date.now().toString(), value: newLatency}]
        }
      }))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const operationalCount = services.filter(s => s.status === 'operational').length
  const healthPercentage = Math.round((operationalCount / services.length) * 100)

  return (
    <div className="flex flex-col h-screen w-full bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Top Navigation / Brand Bar */}
      <header className="h-16 flex items-center justify-between px-8 bg-white border-b border-slate-200 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight">Nisar AI Studio</h1>
            <p className="text-xs text-indigo-600 font-medium tracking-wide uppercase">Super AI Toolbox Orchestrator</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          {/* System Status Notification Bar */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-semibold text-slate-700">{healthPercentage}% Operational</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-sm text-slate-600 font-medium">Firebase Connected</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-sm text-slate-600 font-medium">GitHub Sync Active</span>
          </div>
          <button className="px-4 py-2 bg-slate-900 text-white rounded-md text-sm font-semibold hover:bg-slate-800">
            Deploy Production
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar / Nav */}
        <aside className="w-72 bg-slate-50 border-r border-slate-200 flex flex-col p-6">
          <div className="mb-8">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Specification</h2>
            <nav className="space-y-1">
              <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-slate-900 bg-slate-200/50 rounded-md">4.1 Versioning</a>
              <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-slate-600 hover:bg-white rounded-md">4.2 Format</a>
              <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-slate-600 hover:bg-white rounded-md">4.3 Document Structure</a>
              <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-slate-600 hover:bg-white rounded-md">4.4 Data Types</a>
              <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-slate-600 hover:bg-white rounded-md">4.7.1 OpenAPI Object</a>
            </nav>
          </div>

          <div className="mt-auto p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
            <h3 className="text-xs font-bold text-indigo-900 mb-1">Project Stack</h3>
            <p className="text-[11px] text-indigo-700 leading-relaxed">
              Project: super-ai-toolbox<br/>
              ID: studio-920d46dd-8266<br/>
              AdSense: pub-8918609159122844
            </p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col p-10 bg-white overflow-y-auto">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 mb-2 tracking-wide uppercase">
              <span>Section 4.4</span>
              <span className="text-slate-300 px-1">/</span>
              <span>Core Logic</span>
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">Primitive Data Types</h2>
            
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Primitive data types in the OAS are based on the types supported by the JSON Schema Specification Wright Draft 00. Primitives have an optional modifier property: <code className="px-1.5 py-0.5 bg-slate-100 text-slate-800 rounded">format</code>.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Type</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Format</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Comments</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-700">
                  <tr className="border-b border-slate-200 bg-white">
                    <td className="px-6 py-4 font-mono text-indigo-600">integer</td>
                    <td className="px-6 py-4 font-mono">int32</td>
                    <td className="px-6 py-4 italic text-slate-500">signed 32 bits</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-6 py-4 font-mono text-indigo-600">integer</td>
                    <td className="px-6 py-4 font-mono">int64</td>
                    <td className="px-6 py-4 italic text-slate-500">signed 64 bits (long)</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-white">
                    <td className="px-6 py-4 font-mono text-indigo-600">string</td>
                    <td className="px-6 py-4 font-mono">date-time</td>
                    <td className="px-6 py-4 italic text-slate-500">RFC3339 Section 5.6</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-6 py-4 font-mono text-indigo-600">string</td>
                    <td className="px-6 py-4 font-mono">password</td>
                    <td className="px-6 py-4 italic text-slate-500">UI hint to obscure input</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ServiceHealthWidget services={services} />

            {/* Action Panel */}
            <div className="mt-10 p-6 bg-slate-900 rounded-2xl text-white flex items-center justify-between">
              <div>
                <h4 className="font-bold mb-1">Auto Sync Engine Enabled</h4>
                <p className="text-slate-400 text-sm">Detecting resources across Firebase, Vercel, and GitHub.</p>
              </div>
              <div className="flex gap-3">
                <button className="px-5 py-2.5 bg-indigo-500 text-white rounded-lg font-medium text-sm hover:bg-indigo-600 transition-colors">Validate Schema</button>
                <button className="px-5 py-2.5 bg-slate-800 text-white rounded-lg font-medium text-sm hover:bg-slate-700 transition-colors border border-slate-700">View Changes</button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer Status Bar */}
      <footer className="h-10 bg-slate-100 border-t border-slate-200 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Orchestration Engine v2.4.1</span>
          <span className="text-[10px] text-slate-400">|</span>
          <span className="text-[10px] text-slate-500 font-mono">MASTER EXECUTION DIRECTIVE: ACTIVE</span>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            <span className="text-[10px] text-slate-600 font-medium uppercase">Realtime Listeners On</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
