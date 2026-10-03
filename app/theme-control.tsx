"use client";
import { useSyncExternalStore } from "react";
type Theme = "system" | "light" | "dark";
const eventName = "cartograph-theme";
function readTheme(): Theme {
  const theme = document.documentElement.dataset.theme;
  return theme === "light" || theme === "dark" ? theme : "system";
}
function subscribe(callback: () => void) {
  window.addEventListener(eventName, callback);
  return () => window.removeEventListener(eventName, callback);
}
export function ThemeControl() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "system");
  return <label className="theme-control">Theme
    <select value={theme} onChange={(event) => {
      const value = event.target.value;
      document.documentElement.dataset.theme = value;
      try { localStorage.setItem("cartograph-theme", value); } catch { /* The current tab still works when storage is unavailable. */ }
      window.dispatchEvent(new Event(eventName));
    }}>
      <option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option>
    </select>
  </label>;
}
