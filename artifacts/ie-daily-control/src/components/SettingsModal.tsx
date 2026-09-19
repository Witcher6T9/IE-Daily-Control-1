/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Settings, Layout, Palette, Check, Sliders, Monitor, Eye } from 'lucide-react';
import { ThemeType, DashboardLayout } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: ThemeType;
  onSelectTheme: (theme: ThemeType) => void;
  layout: DashboardLayout;
  onUpdateLayout: (layout: DashboardLayout) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onSelectTheme,
  layout,
  onUpdateLayout
}) => {
  if (!isOpen) return null;

  const themes: { id: ThemeType; label: string; desc: string; previewClass: string }[] = [
    {
      id: 'light',
      label: 'Standard Warm Cream (Default)',
      desc: 'Eye-comfortable warm neutral canvas optimized for long shift operations',
      previewClass: 'bg-[#f5f3ec] border-[#176f78] text-[#17343a]'
    },
    {
      id: 'dark',
      label: 'Night Shift Darkroom',
      desc: 'Low-glare high contrast slate theme for evening shifts and dimmer monitoring rooms',
      previewClass: 'bg-[#182026] border-teal-500 text-slate-100'
    },
    {
      id: 'forest',
      label: 'Lean Emerald Kaizen',
      desc: 'Crisp green hues highlighting continuous improvement and zero-defect focus',
      previewClass: 'bg-[#f0f7f3] border-emerald-700 text-emerald-950'
    },
    {
      id: 'sunset',
      label: 'Amber Production Floor',
      desc: 'Warm amber tones designed for high-density line management and urgent alerting',
      previewClass: 'bg-[#fffaf2] border-amber-600 text-amber-950'
    },
    {
      id: 'industrial',
      label: 'Industrial Monolith',
      desc: 'Technical steel and graphite theme inspired by modern Japanese sewing equipment',
      previewClass: 'bg-[#eef2f5] border-slate-700 text-slate-900'
    }
  ];

  const layoutToggles: { key: keyof DashboardLayout; label: string; desc: string }[] = [
    {
      key: 'showHero',
      label: 'Executive Overview Header Card',
      desc: 'Top summary banner with live date and real-time operational status badge'
    },
    {
      key: 'showStats',
      label: 'KPI Metrics & Attainment Strip',
      desc: '6 core factory indicators: Factory Eff %, Target vs Achieved, WIP buffer, Attendance'
    },
    {
      key: 'showQuickActions',
      label: 'Frontline Quick Actions Bar',
      desc: 'Fast shortcuts for checklist logging, daily report downloads, and team setup'
    },
    {
      key: 'showAbsents',
      label: 'Operator & Helper Absenteeism Breakdown',
      desc: 'Floor-by-floor manpower attendance rates with shortage impact analysis'
    },
    {
      key: 'showBalancingGraph',
      label: 'Line Balancing Loss & Bottleneck Alerts',
      desc: 'Real-time bottleneck warnings, cycle time deviations, and balancing status'
    },
    {
      key: 'showIO',
      label: 'Input / Output (I/O) Production Flow',
      desc: 'Hourly pacing tracking input vs output pieces with WIP threshold monitoring'
    },
    {
      key: 'showUpcoming',
      label: 'Upcoming Style Transitions & Changeover',
      desc: 'Notice board for next scheduled style inputs and pre-production sample readiness'
    }
  ];

  const handleToggleLayout = (key: keyof DashboardLayout) => {
    onUpdateLayout({
      ...layout,
      [key]: !layout[key]
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#fbfaf6] border border-[#d9d2c2] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e7e1d5] bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#176f78] text-white flex items-center justify-center shadow-xs">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold uppercase text-[#17343a]">
                System Preferences &amp; View Setup
              </h2>
              <p className="text-xs text-[#527078]">
                Configure dashboard widget visibility and operational color palette
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#527078] hover:text-[#17343a] hover:bg-[#f1eee6] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Theme Selector */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#17343a]">
              <Palette className="w-4 h-4 text-[#176f78]" />
              <span>Color Atmosphere &amp; Visual Theme</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {themes.map(t => {
                const isSelected = currentTheme === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => onSelectTheme(t.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start justify-between gap-2 ${
                      isSelected
                        ? 'border-[#176f78] ring-2 ring-[#176f78]/20 bg-white shadow-xs'
                        : 'border-[#d9d2c2] bg-white/70 hover:bg-white hover:border-[#527078]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className={`w-3 h-3 rounded-full border ${t.previewClass}`} />
                        <span className="font-bold text-xs text-[#17343a]">{t.label}</span>
                      </div>
                      <p className="text-[10px] text-[#527078] mt-1 leading-normal">{t.desc}</p>
                    </div>

                    {isSelected && (
                      <div className="w-4 h-4 rounded-full bg-[#176f78] text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dashboard Layout Toggles */}
          <div className="space-y-3 pt-4 border-t border-[#e7e1d5]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#17343a]">
                <Layout className="w-4 h-4 text-[#176f78]" />
                <span>Dashboard Widget Modules</span>
              </div>
              <span className="text-[10px] text-[#527078]">Toggle view visibility</span>
            </div>

            <div className="space-y-2">
              {layoutToggles.map(item => {
                const isChecked = layout[item.key];
                return (
                  <div
                    key={item.key}
                    onClick={() => handleToggleLayout(item.key)}
                    className="p-3 rounded-xl border border-[#d9d2c2] bg-white flex items-center justify-between gap-3 cursor-pointer hover:border-[#176f78] transition-all"
                  >
                    <div>
                      <div className="text-xs font-bold text-[#17343a]">{item.label}</div>
                      <p className="text-[10px] text-[#527078] mt-0.5">{item.desc}</p>
                    </div>

                    {/* Toggle Switch */}
                    <div
                      className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                        isChecked ? 'bg-[#176f78]' : 'bg-[#d9d2c2]'
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                          isChecked ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-[#e7e1d5] bg-white flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#176f78] text-white text-xs font-bold hover:bg-[#12555c] transition-colors cursor-pointer shadow-xs"
          >
            Apply &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
};
