/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, User, Mail, BadgeCheck, Check, Save } from 'lucide-react';
import { UserProfile, RoleTier } from '../types';
import { ROLE_TIERS } from '../mockData';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
}

const TIER_TO_ROLE: Record<string, UserProfile['role']> = {
  tier_0: 'admin',
  tier_1: 'hod',
  tier_2: 'manager',
  tier_3: 'assistant_manager',
  tier_4: 'officer'
};

export const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile
}) => {
  const [name, setName] = useState<string>(profile.name);
  const [email, setEmail] = useState<string>(profile.email);
  const [employeeId, setEmployeeId] = useState<string>(profile.employeeId || 'IE-9042');
  const [assignedUnit, setAssignedUnit] = useState<string>(profile.assignedUnit || 'Unit 01 (Sewing)');
  const [shift, setShift] = useState<string>(profile.shift || 'General Shift (8:00 AM - 5:00 PM)');
  const [selectedTierId, setSelectedTierId] = useState<string>(profile.tierId || 'tier_1');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentRoleTier: RoleTier =
    ROLE_TIERS.find(r => r.id === selectedTierId) || ROLE_TIERS[1];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const systemRole = TIER_TO_ROLE[selectedTierId] || 'officer';
    onUpdateProfile({
      ...profile,
      name: name.trim(),
      email: email.trim(),
      employeeId: employeeId.trim(),
      assignedUnit: assignedUnit.trim(),
      shift: shift.trim(),
      jobTitle: currentRoleTier.name,
      tierId: selectedTierId,
      role: systemRole
    });
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#fbfaf6] border border-[#d9d2c2] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e7e1d5] bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#176f78] text-white flex items-center justify-center shadow-xs">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold uppercase text-[#17343a]">
                Industrial Engineer Profile
              </h2>
              <p className="text-xs text-[#527078]">
                Role permissions, authorization tier, and floor credential settings
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

        {/* Scrollable Form Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Identity Preview Card */}
          <div className="p-4 rounded-xl bg-white border border-[#d9d2c2] flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#176f78] to-[#17343a] text-white flex items-center justify-center font-display text-xl font-bold shadow-xs">
              {name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#17343a]">{name}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#dceceb] text-[#176f78] border border-[#b2d6d8]">
                  {currentRoleTier.shortCode} • Level {currentRoleTier.level}
                </span>
              </div>
              <p className="text-xs text-[#527078]">{currentRoleTier.name}</p>
              <div className="flex items-center gap-2 mt-1 text-[11px] text-[#527078] flex-wrap">
                <span className="font-mono-numbers">{employeeId}</span>
                <span>•</span>
                <span>{assignedUnit}</span>
                <span>•</span>
                <span className="text-[#176f78] font-bold">{shift}</span>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold uppercase text-[#527078] mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#d9d2c2] text-xs text-[#17343a] bg-white focus:outline-hidden focus:ring-1 focus:ring-[#176f78]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-[#527078] mb-1">
                  Employee ID
                </label>
                <input
                  type="text"
                  required
                  value={employeeId}
                  onChange={e => setEmployeeId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#d9d2c2] text-xs text-[#17343a] bg-white focus:outline-hidden focus:ring-1 focus:ring-[#176f78]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-[#527078] mb-1">
                  Assigned Factory Unit
                </label>
                <input
                  type="text"
                  required
                  value={assignedUnit}
                  onChange={e => setAssignedUnit(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#d9d2c2] text-xs text-[#17343a] bg-white focus:outline-hidden focus:ring-1 focus:ring-[#176f78]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-[#527078] mb-1">
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#527078]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-xl border border-[#d9d2c2] text-xs text-[#17343a] bg-white focus:outline-hidden focus:ring-1 focus:ring-[#176f78]"
                />
              </div>
            </div>

            {/* Assigned Shift Selection */}
            <div>
              <label className="block text-[11px] font-bold uppercase text-[#527078] mb-1">
                Assigned Operational Shift
              </label>
              <select
                value={shift}
                onChange={e => setShift(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#d9d2c2] text-xs text-[#17343a] bg-white focus:outline-hidden focus:ring-1 focus:ring-[#176f78]"
              >
                <option value="General Shift (8:00 AM - 5:00 PM)">General Shift 8:00 AM to 5:00 PM (Standard Default)</option>
                <option value="Shift 02 (Evening Overtime 17:00 - 21:00)">Shift 02 (Evening Overtime 17:00 - 21:00)</option>
                <option value="Shift 03 (Night Shift 21:00 - 05:00)">Shift 03 (Night Shift 21:00 - 05:00)</option>
              </select>
            </div>

            {/* Role Tier Selection */}
            <div>
              <label className="block text-[11px] font-bold uppercase text-[#527078] mb-1">
                Authorization Role Tier
              </label>
              <select
                value={selectedTierId}
                onChange={e => setSelectedTierId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#d9d2c2] text-xs text-[#17343a] bg-white focus:outline-hidden focus:ring-1 focus:ring-[#176f78]"
              >
                {ROLE_TIERS.map(tier => (
                  <option key={tier.id} value={tier.id}>
                    {tier.shortCode} - {tier.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Permission Badges */}
          <div className="p-3.5 rounded-xl bg-[#f1eee6] border border-[#d9d2c2] space-y-2">
            <span className="text-[10px] font-bold uppercase text-[#527078] block">
              Active Role Privileges:
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-[#17343a]">
                <BadgeCheck
                  className={`w-4 h-4 ${
                    currentRoleTier.canManageLines ? 'text-[#176f78]' : 'text-[#527078]/40'
                  }`}
                />
                <span className={currentRoleTier.canManageLines ? 'font-bold' : 'text-[#527078]'}>
                  Manage Lines &amp; Data
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[#17343a]">
                <BadgeCheck
                  className={`w-4 h-4 ${
                    currentRoleTier.canEditLineData ? 'text-[#176f78]' : 'text-[#527078]/40'
                  }`}
                />
                <span className={currentRoleTier.canEditLineData ? 'font-bold' : 'text-[#527078]'}>
                  Run IE Simulator
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[#17343a]">
                <BadgeCheck
                  className={`w-4 h-4 ${
                    currentRoleTier.canApproveChecklist ? 'text-emerald-700' : 'text-[#527078]/40'
                  }`}
                />
                <span className={currentRoleTier.canApproveChecklist ? 'font-bold' : 'text-[#527078]'}>
                  Signoff Handoff Audits
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[#17343a]">
                <BadgeCheck
                  className={`w-4 h-4 ${
                    currentRoleTier.canExport ? 'text-[#176f78]' : 'text-[#527078]/40'
                  }`}
                />
                <span className={currentRoleTier.canExport ? 'font-bold' : 'text-[#527078]'}>
                  Export Production Reports
                </span>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[#d9d2c2] text-xs text-[#527078] hover:bg-[#f1eee6] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#176f78] text-white text-xs font-bold hover:bg-[#12555c] transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Update Profile</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
