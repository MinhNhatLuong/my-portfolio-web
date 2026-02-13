import { ElementType } from "react";
import Image from "next/image";
import { MapPin, CircleDot, Flag, Globe } from "lucide-react";
import { AboutPageData } from "@/types";
import { urlFor } from "@/lib/sanity";

// Types helper for InfoBox
type LocalizedString = { en?: string; vi?: string; ja?: string };
type AboutTranslation = Record<string, string>;

interface InfoBoxProps {
  data: AboutPageData;
  t: AboutTranslation;
  getLoc: (obj?: LocalizedString) => string;
}

const InfoRow = ({
  label,
  icon: Icon,
  value,
  className,
}: {
  label: string;
  icon?: ElementType;
  value?: string;
  className?: string;
}) => {
  if (!value) return null;
  return (
    <div className="flex gap-3 py-1">
      <span className="font-bold w-24 shrink-0 text-muted-foreground text-xs uppercase tracking-wide pt-0.5">
        {label}
      </span>
      <span
        className={`flex-1 flex items-start gap-1.5 text-sm ${className || ""}`}
      >
        {Icon && <Icon size={14} className="mt-0.5 shrink-0" />}
        <span>{value}</span>
      </span>
    </div>
  );
};

export function DesktopInfoBox({ data, t, getLoc }: InfoBoxProps) {
  const info = data.infoBox;
  if (!info) return null;

  return (
    <div className="border border-border bg-card shadow-sm text-sm overflow-hidden rounded-sm">
      <div className="bg-secondary/50 p-2 font-bold text-center border-b border-border text-base">
        {info.name}
      </div>

      <div className="p-4 flex flex-col items-center border-b border-border bg-white dark:bg-black/20">
        {info.avatar ? (
          <div className="relative w-48 shadow-md border border-border p-1 bg-background">
            <div className="relative w-full h-auto overflow-hidden">
              <Image
                src={urlFor(info.avatar).width(400).url()}
                alt="Avatar"
                width={400}
                height={0}
                style={{ width: "100%", height: "auto" }}
                className="block"
              />
            </div>
          </div>
        ) : (
          <div className="w-40 h-40 bg-secondary mb-2" />
        )}

        <div className="flex flex-wrap justify-center gap-1 mt-3">
          {info.roles?.map((role, i) => (
            <span
              key={i}
              className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs font-bold rounded uppercase tracking-wider"
            >
              {role}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-2 bg-background">
        <InfoRow
          label={t.location}
          icon={MapPin}
          value={getLoc(info.location)}
        />
        <InfoRow
          label={t.status}
          icon={CircleDot}
          value={getLoc(info.status)}
          className="text-green-600 font-medium"
        />
        <InfoRow
          label="Nationality"
          icon={Flag}
          value={getLoc(info.nationality)}
        />

        {info.languages && info.languages.length > 0 && (
          <div className="pt-2 mt-2 border-t border-border/50">
            <div className="font-bold text-muted-foreground text-xs uppercase tracking-wide mb-2">
              Languages
            </div>
            <ul className="space-y-1.5">
              {info.languages.map((lang, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center text-sm"
                >
                  <div className="flex items-center gap-1.5 font-medium">
                    <Globe size={12} className="text-blue-500" />
                    {getLoc(lang.lang)}
                  </div>
                  <div className="text-xs text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
                    {lang.isNative ? t.native : getLoc(lang.level)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export function MobileInfoBox({ data, t, getLoc }: InfoBoxProps) {
  const info = data.infoBox;
  if (!info) return null;

  return (
    <div className="flex gap-4 items-start bg-card border border-border p-4 rounded-xl shadow-sm">
      {info.avatar && (
        <div className="relative w-24 shrink-0">
          <Image
            src={urlFor(info.avatar).width(200).url()}
            alt="Avatar"
            width={200}
            height={0}
            style={{ width: "100%", height: "auto" }}
            className="rounded-lg border border-border"
          />
        </div>
      )}
      <div className="min-w-0">
        <h2 className="font-bold text-xl leading-tight mb-2">{info.name}</h2>
        <div className="flex flex-wrap gap-1 mb-2">
          {info.roles?.map((role, i) => (
            <span
              key={i}
              className="px-1.5 py-0.5 bg-secondary text-secondary-foreground text-[10px] font-bold rounded uppercase"
            >
              {role}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin size={12} /> {getLoc(info.location)}
        </div>
      </div>
    </div>
  );
}