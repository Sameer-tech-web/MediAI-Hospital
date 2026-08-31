import React, { useState } from 'react';

import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Patients from './components/Patients';
import AddPatient from './components/AddPatient';
import PatientProfile from './components/PatientProfile';
import DoctorPanel from './components/DoctorPanel';
import NursePanel from './components/NursePanel';
import StaffAttendance from './components/StaffAttendance'; // 1. Component Import Fix
import Laboratory from './components/Laboratory';
import AIAssistant from './components/AIAssistant';
import Reports from './components/Reports';
import Settings from './components/Settings';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('Admin');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleLoginSuccess = (role) => {
    setUserRole(role);
    setIsLoggedIn(true);
    setActiveTab('dashboard');
  };

  // Staff Login
  if (!isLoggedIn) {
    return (
      <Login
        onLoginSuccess={handleLoginSuccess}
        onOpenPatientPortal={() => alert("Patient Portal coming soon!")}
      />
    );
  }

  // Hospital Administrative Application
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />;

      case 'patients':
        return (
          <Patients
            setActiveTab={setActiveTab}
            setSelectedPatient={setSelectedPatient}
          />
        );

      case 'add-patient':
        return <AddPatient setActiveTab={setActiveTab} />;

      case 'patient-profile':
        return (
          <PatientProfile
            patient={selectedPatient}
            setActiveTab={setActiveTab}
          />
        );

      case 'doctor':
        return <DoctorPanel />;

      case 'nurse':
        return <NursePanel />;

      // 2. Staff Attendance Route Case Added Here!
      case 'staff-attendance':
      case 'attendance':
        return <StaffAttendance />;

      case 'laboratory':
        return <Laboratory />;

      case 'ai-assistant':
        return <AIAssistant />;

      case 'reports':
        return <Reports />;

      case 'settings':
        return <Settings />;

      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen bg-medWhite font-sans overflow-hidden select-none">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar userRole={userRole} />

        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
