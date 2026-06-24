import { useState, useEffect } from 'react';
import { UserProgress } from '../types';

export const useUserProgress = () => {
  const [progress, setProgress] = useState<UserProgress>({
    completedDays: [],
    currentDay: 1,
    streak: 0,
    examScore: 0,
    passedExam: false,
    username: ''
  });
  
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sahamMasterProgress');
      if (saved) {
        const parsed = JSON.parse(saved);
        const sanitizedProgress: UserProgress = {
          completedDays: Array.isArray(parsed.completedDays) ? parsed.completedDays : [],
          currentDay: typeof parsed.currentDay === 'number' ? parsed.currentDay : 1,
          streak: typeof parsed.streak === 'number' ? parsed.streak : 0,
          examScore: typeof parsed.examScore === 'number' ? parsed.examScore : 0,
          passedExam: !!parsed.passedExam,
          username: parsed.username || '',
          examDate: parsed.examDate || undefined
        };

        setProgress(sanitizedProgress);

        if (!sanitizedProgress.username || sanitizedProgress.username === 'Trader') {
          setShowOnboarding(true);
        }
      } else {
        setShowOnboarding(true);
      }
    } catch (error) {
      console.error("Gagal memuat progress, menggunakan default:", error);
      setShowOnboarding(true);
    }

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem('sahamMasterProgress', JSON.stringify(newProgress));
  };

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    setDeferredPrompt(null);
    setShowInstallBtn(false);
  };

  return {
    progress,
    setProgress: saveProgress,
    showOnboarding,
    setShowOnboarding,
    showInstallBtn,
    handleInstallClick
  };
};
