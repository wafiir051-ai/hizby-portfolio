"use client";

import ProfileCard from "@/components/ProfileCard";
import { PROFILE } from "@/content";

/** Kartu profil holografik (React Bits ProfileCard) di pojok kiri atas sidebar. */
export default function SideCard({ title }: { title: string }) {
  return (
    <div className="side-card">
      <div className="side-card__inner">
        <ProfileCard
          avatarUrl={PROFILE.photo}
          name={PROFILE.name}
          title={title}
          handle="Aisyi-Hizby"
          status="Murid kelas 11 RPL"
          contactText="Hubungi"
          theme="dark"
          radius={10}
          holo={0.9}
          glare={0.6}
          intro={false}
          onContactClick={() => window.dispatchEvent(new CustomEvent("goto", { detail: "kontak" }))}
        />
      </div>
    </div>
  );
}
