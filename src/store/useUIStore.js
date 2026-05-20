import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useUIStore = create(
  persist(
    (set) => ({
      theme: 'dark',
      sidebarOpen: true,
      navSearchQuery: '',
      notifications: [],
      notifPanelOpen: false,
      activeModal: null,
      setTheme: (theme) => {
        if (typeof document !== 'undefined') document.documentElement.dataset.theme = theme
        set({ theme })
      },
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setNavSearchQuery: (navSearchQuery) => set({ navSearchQuery }),
      setNotifications: (notifications) => set({ notifications }),
      toggleNotifPanel: () => set((s) => ({ notifPanelOpen: !s.notifPanelOpen })),
      openModal: (name) => set({ activeModal: name }),
      closeModal: () => set({ activeModal: null }),
      clearAuthAndLogout: () => {
        if (typeof localStorage !== 'undefined') localStorage.removeItem('fg_auth')
      },
    }),
    {
      name: 'fg-ui-store',
      partialize: (state) => ({ theme: state.theme, sidebarOpen: state.sidebarOpen }),
    },
  ),
)

export default useUIStore