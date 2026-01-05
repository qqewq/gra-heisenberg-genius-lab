import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { t } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { Globe, Atom, LogOut } from 'lucide-react';

export function Header() {
  const { language, toggleLanguage } = useLanguage();
  const { user, signOut } = useAuth();

  return (
    <header className="relative py-8 px-4 overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Atom className="w-10 h-10 text-primary animate-float" />
              <div className="absolute inset-0 blur-xl bg-primary/30 animate-pulse" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              {t('header.title', language)}
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="gap-2 border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300"
            >
              <Globe className="w-4 h-4" />
              <span className="font-mono">{language.toUpperCase()}</span>
            </Button>
            
            {user && (
              <Button
                variant="ghost"
                size="sm"
                onClick={signOut}
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {language === 'ru' ? 'Выйти' : 'Logout'}
                </span>
              </Button>
            )}
          </div>
        </div>
        
        <p className="text-muted-foreground text-center md:text-left max-w-2xl">
          {t('header.subtitle', language)}
        </p>
      </div>
    </header>
  );
}
