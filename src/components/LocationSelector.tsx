'use client';

import { useState } from 'react';
import { bdLocations } from '@/data/bdLocations';

export default function LocationSelector({ onSelectLocation }: { onSelectLocation: (loc: string) => void }) {
    const [selectedDivision, setSelectedDivision] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedArea, setSelectedArea] = useState('');

    const currentDistricts = bdLocations.find((d) => d.division === selectedDivision)?.districts || [];
    const currentAreas = currentDistricts.find((d) => d.name === selectedDistrict)?.areas || [];

    const handleAreaChange = (areaName: string, areaBn: string) => {
        setSelectedArea(areaName);
        const fullLocation = `${areaBn} (${areaName}), ${selectedDistrict}, ${selectedDivision}`;
        onSelectLocation(fullLocation);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select
                value={selectedDivision}
                onChange={(e) => {
                    setSelectedDivision(e.target.value);
                    setSelectedDistrict('');
                    setSelectedArea('');
                }}
                className="bg-slate-900 border border-slate-700 p-2.5 rounded-lg text-white text-sm"
            >
                <option value="">বিভাগ নির্বাচন করুন</option>
                {bdLocations.map((loc) => (
                    <option key={loc.division} value={loc.division}>
                        {loc.divisionBn} ({loc.division})
                    </option>
                ))}
            </select>

            <select
                value={selectedDistrict}
                disabled={!selectedDivision}
                onChange={(e) => {
                    setSelectedDistrict(e.target.value);
                    setSelectedArea('');
                }}
                className="bg-slate-900 border border-slate-700 p-2.5 rounded-lg text-white text-sm disabled:opacity-50"
            >
                <option value="">জেলা নির্বাচন করুন</option>
                {currentDistricts.map((dist) => (
                    <option key={dist.name} value={dist.name}>
                        {dist.nameBn} ({dist.name})
                    </option>
                ))}
            </select>

            <select
                value={selectedArea}
                disabled={!selectedDistrict}
                onChange={(e) => {
                    const areaObj = currentAreas.find((a) => a.name === e.target.value);
                    if (areaObj) handleAreaChange(areaObj.name, areaObj.nameBn);
                }}
                className="bg-slate-900 border border-slate-700 p-2.5 rounded-lg text-white text-sm disabled:opacity-50"
            >
                <option value="">এলাকা / থানা নির্বাচন করুন</option>
                {currentAreas.map((area) => (
                    <option key={area.name} value={area.name}>
                        {area.nameBn} ({area.name})
                    </option>
                ))}
            </select>
        </div>
    );
}