import React from 'react';
import { Button } from '@/components/ui/button';
import { User, Heart, LayoutGrid, Users, Ring } from 'lucide-react';

export const ProfileTabs = () => {
  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full max-w-3xl">
        <div className="flex justify-center w-full overflow-x-auto py-2 scrollbar-none">
          <div className="inline-flex items-center gap-1 border rounded-lg p-1 mx-auto">
            <Button variant="ghost" size="sm" className="whitespace-nowrap">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Overview</span>
              </div>
            </Button>
            <Button variant="ghost" size="sm" className="whitespace-nowrap">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span className="hidden sm:inline">Values</span>
              </div>
            </Button>
            <Button variant="ghost" size="sm" className="whitespace-nowrap">
              <div className="flex items-center gap-2">
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">Lifestyle</span>
              </div>
            </Button>
            <Button variant="ghost" size="sm" className="whitespace-nowrap">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Family</span>
              </div>
            </Button>
            <Button variant="ghost" size="sm" className="whitespace-nowrap">
              <div className="flex items-center gap-2">
                <Ring className="w-4 h-4" />
                <span className="hidden sm:inline">Marriage</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};