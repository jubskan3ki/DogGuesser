// src/components/Notif/Notif.tsx
import React from "react";
import "./Notif.css";

// Définir le type des props pour le composant Notif
export interface NotifProps {
  type?: string | null;
  message?: string | null;
  onClick?: () => void; // La prop onClick est une fonction optionnelle
}

const Notif: React.FC<NotifProps> = ({ type, message, onClick }) => {
  if (!type || !message) {
    return null; // Si type ou message est null, le composant Notif ne sera pas rendu
  }

  return (
    <div className={`Notif ${type}`} onClick={onClick}>
      <h4>{message}</h4>
    </div>
  );
};

export default Notif;
