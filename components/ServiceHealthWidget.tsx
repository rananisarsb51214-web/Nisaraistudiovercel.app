'use client'

import React, { useState } from 'react'
import { Activity, Database, Cloud, Github, X, Download } from 'lucide-react'

// Define service types
export type ServiceStatus = 'operational' | 'degraded' | 'down'

export interface Service {
  name: string
  status: ServiceStatus
  icon: React.ReactNode
  latency: string
  lastSync: string
  errorLogs: string[]
  latencyHistory: { time: string; value: number }[]
}

interface ServiceHealthWidgetProps {
  services: Service[]
}

import { LineChart, Line, ResponsiveContainer } from 'recharts'

export default function ServiceHealthWidget({ services }: ServiceHealthWidgetProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [serviceNotifications, setServiceNotifications] = useState<Record<string, {email: boolean, push: boolean}>>({})

  const toggleServiceNotification = (serviceName: string, type: 'email' | 'push') => {
    setServiceNotifications(prev => ({
      ...prev,
      [serviceName]: {
        ...prev[serviceName] ?? { email: false, push: false },
        [type]: !prev[serviceName]?.[type]
      }
    }))
  }

  const handleDownloadLogs = () => {
    if (!selectedService) return;
    const data = {
      service: selectedService.name,
      errorLogs: selectedService.errorLogs,
      latencyHistory: selectedService.latencyHistory,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedService.name.toLowerCase().replace(/\s+/g, '-')}-logs.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: ServiceStatus) => {
    switch (status) {
      case 'operational': return 'text-emerald-500'
      case 'degraded': return 'text-amber-500'
      default: return 'text-rose-500'
    }
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mt-8">
      <h3 className="text-lg font-bold text-slate-900 mb-4">System Health</h3>
      <div className="grid grid-cols-2 gap-4">
        {services.map(service => (
          <div 
            key={service.name} 
            className="flex flex-col p-4 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-300 transition-colors cursor-pointer"
            onClick={() => setSelectedService(service)}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-md bg-white ${getStatusColor(service.status)}`}>
                {service.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-900">{service.name}</span>
                <span className={`text-[11px] font-medium uppercase tracking-wider ${getStatusColor(service.status)}`}>
                  {service.status}
                </span>
              </div>
            </div>
            <div className="h-16 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={service.latencyHistory}>
                  <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>

      {selectedService && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl border border-slate-100 overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">{selectedService.name} Details</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadLogs}
                  className="p-1 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
                  title="Download Logs"
                >
                  <Download size={20} />
                </button>
                <button 
                  onClick={() => setSelectedService(null)}
                  className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-slate-500"/>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Latency</p>
                  <p className="text-sm font-semibold text-slate-900">{selectedService.latency}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Last Sync</p>
                  <p className="text-sm font-semibold text-slate-900">{selectedService.lastSync}</p>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">Error Logs</p>
                <div className="bg-slate-950 text-slate-300 p-4 rounded-lg font-mono text-xs max-h-40 overflow-y-auto">
                  {selectedService.errorLogs.length > 0 ? (
                    selectedService.errorLogs.map((log, i) => <p key={i}>&gt; {log}</p>)
                  ) : (
                    <p className="text-slate-500 italic">No recent errors.</p>
                  )}
                </div>
              </div>
              
              <div className="pt-2">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">Notifications</p>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      checked={serviceNotifications[selectedService.name]?.email ?? false}
                      onChange={() => toggleServiceNotification(selectedService.name, 'email')}
                    />
                    <span className="text-sm text-slate-700 group-hover:text-indigo-600">Email Alerts</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      checked={serviceNotifications[selectedService.name]?.push ?? false}
                      onChange={() => toggleServiceNotification(selectedService.name, 'push')}
                    />
                    <span className="text-sm text-slate-700 group-hover:text-indigo-600">Push Alerts</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
