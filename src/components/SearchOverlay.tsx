import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const suggestions = [
    'Desert Tours',
    'Luxury Riads',
    'Atlas Mountains',
    'Marrakech Experience',
    'Sahara Adventures',
    'Royal Cities',
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 gap-0 bg-background/95 backdrop-blur-xl border-0 shadow-2xl">
        <div className="relative">
          {/* Search Header */}
          <div className="flex items-center p-6 border-b border-border/20">
            <Search className="w-6 h-6 text-muted-foreground mr-4" />
            <input
              type="text"
              placeholder="Rechercher une destination ou expérience..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-lg font-light text-foreground placeholder:text-muted-foreground outline-none"
              autoFocus
            />
            <button
              onClick={onClose}
              className="ml-4 p-2 hover:bg-muted/50 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Results */}
          <div className="p-6 max-h-96 overflow-y-auto">
            {searchQuery.length === 0 ? (
              <div>
                <h3 className="font-elegant text-lg mb-4 text-foreground">Suggestions populaires</h3>
                <div className="space-y-3">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="w-full text-left p-3 rounded-lg hover:bg-muted/30 transition-colors group"
                      onClick={() => {
                        setSearchQuery(suggestion);
                        // Handle search logic here
                      }}
                    >
                      <div className="flex items-center">
                        <Search className="w-4 h-4 text-muted-foreground mr-3 group-hover:text-primary transition-colors" />
                        <span className="font-light text-foreground group-hover:text-primary transition-colors">
                          {suggestion}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-elegant text-lg mb-4 text-foreground">Résultats pour "{searchQuery}"</h3>
                <div className="text-muted-foreground font-light">
                  Aucun résultat trouvé. Essayez une autre recherche.
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchOverlay;