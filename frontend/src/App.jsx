// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { AuthProvider } from './contexts/AuthContext';

// Layouts - TODO: Реализовать эти компоненты
import { MainLayout } from './components/ui/Layout/MainLayout';
// import { AdminLayout } from './components/ui/Layout/AdminLayout';
// import { ParticipantLayout } from './components/ui/Layout/ParticipantLayout';

// Pages - TODO: Реализовать эти страницы
import { HomePage } from './pages/HomePage';
import { HackathonListPage } from './pages/HackathonListPage';
import { HackathonDetailPage } from './pages/HackathonDetailPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';

import { 
  NotImplemented, 
  NotFound404,
  ComingSoon,
  ErrorState 
} from './components/shared/PlaceholderComponent';

// Participant Pages - TODO: Реализовать эти страницы
// import { ParticipantDashboard } from './pages/participant/Dashboard';
// import { TeamProjectPage } from './pages/participant/TeamProjectPage';

// Expert Pages - TODO: Реализовать эти страницы
// import { ExpertDashboard } from './pages/expert/Dashboard';
// import { ExpertAssessmentPage } from './pages/expert/AssessmentPage';

// Admin Pages - TODO: Реализовать эти страницы
// import { AdminDashboard } from './pages/admin/Dashboard';
// import { AdminHackathonsPage } from './pages/admin/HackathonsPage';
// import { AdminUsersPage } from './pages/admin/UsersPage';
// import { AdminAnalyticsPage } from './pages/admin/AnalyticsPage';

// Protected Route Component - TODO: Реализовать
import { ProtectedRoute } from './components/shared/ProtectedRoute';

// Временные заглушки для нереализованных компонентов
const TempComponent = ({ name, type = 'not-implemented' }) => {
  const Component = {
    'not-implemented': NotImplemented,
    '404': NotFound404,
    'coming-soon': ComingSoon,
    'error': ErrorState
  }[type];

  return <Component title={`${name} - В разработке`} />;
};

function App() {
  return (
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="hackathons" element={<HackathonListPage />} />
              <Route path="hackathons/:id" element={<HackathonDetailPage />} />
              <Route path="register/:hackathonId" element={<RegistrationPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="/profile" element={
              <ProtectedRoute allowedRoles={['participant', 'team_lead', 'expert', 'judge', 'admin', 'organizer']}>
                <ProfilePage />
              </ProtectedRoute>
            } />
          </Route>
            {/* Participant Routes - TODO: Реализовать полноценную структуру */}
            <Route path="/participant" element={
              <ProtectedRoute allowedRoles={['participant', 'team_lead']}>
                <MainLayout>
                  <TempComponent name="Participant Dashboard" />
                </MainLayout>
              </ProtectedRoute>
            }>
              <Route index element={<TempComponent name="Participant Dashboard" />} />
              {/* <Route path="project/:hackathonId" element={<TeamProjectPage />} /> */}
              {/* <Route path="checkpoints/:hackathonId" element={<CheckpointsPage />} /> */}
            </Route>

            {/* Expert Routes - TODO: Реализовать полноценную структуру */}
            <Route path="/expert" element={
              <ProtectedRoute allowedRoles={['expert', 'judge']}>
                <MainLayout>
                  <TempComponent name="Expert Dashboard" />
                </MainLayout>
              </ProtectedRoute>
            }>
              <Route index element={<TempComponent name="Expert Dashboard" />} />
              {/* <Route path="assessment/:hackathonId" element={<ExpertAssessmentPage />} /> */}
              {/* <Route path="projects/:hackathonId" element={<ExpertProjectsPage />} /> */}
            </Route>

            {/* Admin Routes - TODO: Реализовать полноценную структуру */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin', 'organizer']}>
                <MainLayout>
                  <TempComponent name="Admin Dashboard" />
                </MainLayout>
              </ProtectedRoute>
            }>

            
             
              <Route index element={<TempComponent name="Admin Dashboard" />} />
              {/* <Route path="hackathons" element={<AdminHackathonsPage />} /> */}
              {/* <Route path="hackathons/:id" element={<AdminHackathonDetailPage />} /> */}
              {/* <Route path="users" element={<AdminUsersPage />} /> */}
              {/* <Route path="analytics" element={<AdminAnalyticsPage />} /> */}
              {/* <Route path="criteria" element={<AdminCriteriaPage />} /> */}
            </Route>
         
            {/* Fallback */}
            <Route path="*" element={
            <MainLayout>
              <NotFound404 
                title="Страница не найдена" 
                description="Возможно, страница была перемещена или вы ввели неверный адрес."
                showHomeButton={true}
              />
            </MainLayout>
} />
          </Routes>
        </Router>
      </AuthProvider>
  );
}

export default App;
