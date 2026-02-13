"use client";

import { useState, useEffect, ElementType } from "react"; 
import { Mail, Phone, FileText, Copy, Check, ExternalLink } from "lucide-react";
import { FaFacebook, FaInstagram, FaXTwitter, FaLinkedin, FaGithub, FaYoutube, FaTiktok, FaDiscord, FaBehance, FaDribbble, FaTwitch } from "react-icons/fa6";
import Link from "next/link";
import { motion } from "framer-motion";

import { FullPageLoader } from "@/components/ui/loaders";
import { getContactData } from "@/lib/api";
import { ContactPageData } from "@/types";
import { useLanguage } from "@/context/language-context";
import { dictionaries } from "@/constants/translations";

const SOCIAL_ICONS: Record<string, ElementType> = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  x: FaXTwitter,
  linkedin: FaLinkedin,
  github: FaGithub,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  discord: FaDiscord,
  behance: FaBehance,
  dribbble: FaDribbble,
  twitch: FaTwitch,
};

export default function ContactPage() {
  const { language } = useLanguage();
  const t = dictionaries[language].contact;

  const [data, setData] = useState<ContactPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getContactData();
        setData(result);
      } catch (error) {
        console.error("Error fetching contact data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCopyEmail = () => {
    if (data?.workContact?.email) {
      navigator.clipboard.writeText(data.workContact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) return <FullPageLoader />;

  return (
    <div className="min-h-screen pb-20 pt-10">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* HEADER */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 leading-normal">
            {t.title}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* LEFT: WORK & CONTACT INFO */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-1.5 bg-blue-500 rounded-full"></div>
              <h2 className="text-2xl font-bold">{t.workTitle}</h2>
            </div>
            
            <div className="space-y-4">
              
              {/* Email Block */}
              {data?.workContact?.email && (
                <div className="p-6 rounded-2xl bg-secondary/30 border border-border hover:border-blue-500/50 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="p-2 md:p-3 bg-blue-500/10 text-blue-600 rounded-xl shrink-0">
                      <Mail className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground mb-1">{t.emailLabel}</p>
                      <p className="text-lg font-semibold break-all">
                        {data.workContact.email}
                      </p>
                    </div>
                    <button 
                      onClick={handleCopyEmail}
                      className="p-2 text-muted-foreground hover:text-blue-500 transition-colors shrink-0"
                      title={t.copyEmail}
                    >
                      {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                    </button>
                  </div>
                </div>
              )}

              {/* Phone Block */}
              {data?.workContact?.phone && (
                <div className="p-6 rounded-2xl bg-secondary/30 border border-border hover:border-green-500/50 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="p-2 md:p-3 bg-green-500/10 text-green-600 rounded-xl shrink-0">
                      <Phone className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground mb-1">{t.phoneLabel}</p>
                      <p className="text-lg font-semibold break-words">
                        {data.workContact.phone}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Resume Button */}
              {data?.workContact?.resume && (
                <Link 
                  href={`${data.workContact.resume}?dl=`} 
                  target="_blank"
                  className="flex items-center justify-center gap-2 w-full p-4 rounded-xl bg-foreground text-background font-bold hover:opacity-90 transition-opacity shadow-lg mt-2"
                >
                  <FileText size={20} />
                  {t.downloadCV}
                </Link>
              )}
            </div>
          </motion.div>

          {/* RIGHT: SOCIAL LINKS */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-1.5 bg-purple-500 rounded-full"></div>
              <h2 className="text-2xl font-bold">{t.socialTitle}</h2>
            </div>

            <p className="text-muted-foreground">
              {t.socialDesc}
            </p>

            <div className="grid grid-cols-2 gap-4">
              {data?.socialLinks?.map((social) => {
                if (!social || !social.platform) return null;

                const platformKey = social.platform.toLowerCase();
                const IconComponent = SOCIAL_ICONS[platformKey] || ExternalLink;
                
                return (
                  <Link 
                    key={social.platform}
                    href={social.url || "#"}
                    target="_blank"
                    className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:bg-secondary hover:scale-105 transition-all duration-300"
                  >
                    <div className="text-foreground">
                      <IconComponent size={24} />
                    </div>
                    <span className="font-medium capitalize">{social.platform}</span>
                  </Link>
                )
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}