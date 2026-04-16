/* @/components/profiles/ProfileTabs.tsx */
'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { Package, Info, Users, Heart } from 'lucide-react'

interface ProfileTabsProps {
  username: string
  isOwnProfile: boolean
  productCount?: number
  followerCount?: number
  followingCount?: number
}

export default function ProfileTabs({
  username,
  isOwnProfile,
  productCount = 0,
  followerCount = 0,
  followingCount = 0,
}: ProfileTabsProps) {
  return (
    <Tabs defaultValue="products" className="mt-8">
      <TabsList className="w-full justify-start border-b border-white/10 bg-transparent p-0">
        <TabsTrigger
          value="products"
          className="data-[state=active]:border-b-2 data-[state=active]:border-cyan-400 data-[state=active]:text-cyan-400"
        >
          <Package className="mr-2 h-4 w-4" />
          Products
          {productCount > 0 && (
            <span className="ml-1 text-xs text-white/40">({productCount})</span>
          )}
        </TabsTrigger>

        <TabsTrigger
          value="about"
          className="data-[state=active]:border-b-2 data-[state=active]:border-cyan-400 data-[state=active]:text-cyan-400"
        >
          <Info className="mr-2 h-4 w-4" />
          About
        </TabsTrigger>

        {isOwnProfile && (
          <>
            <TabsTrigger
              value="followers"
              className="data-[state=active]:border-b-2 data-[state=active]:border-cyan-400 data-[state=active]:text-cyan-400"
            >
              <Users className="mr-2 h-4 w-4" />
              Followers
              <span className="ml-1 text-xs text-white/40">({followerCount})</span>
            </TabsTrigger>

            <TabsTrigger
              value="following"
              className="data-[state=active]:border-b-2 data-[state=active]:border-cyan-400 data-[state=active]:text-cyan-400"
            >
              <Heart className="mr-2 h-4 w-4" />
              Following
              <span className="ml-1 text-xs text-white/40">({followingCount})</span>
            </TabsTrigger>
          </>
        )}
      </TabsList>

      <TabsContent value="products" className="mt-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <p className="col-span-full text-center text-white/40">
            {productCount === 0
              ? 'No products yet.'
              : `Viewing ${productCount} products`}
          </p>
        </div>
      </TabsContent>

      <TabsContent value="about" className="mt-6">
        <div className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white">About</h3>
          <p className="text-white/60">
            This is where the user's bio and extended profile information will appear.
            Coming soon.
          </p>
        </div>
      </TabsContent>

      {isOwnProfile && (
        <>
          <TabsContent value="followers" className="mt-6">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center text-white/40">
              Follower list coming soon.
            </div>
          </TabsContent>

          <TabsContent value="following" className="mt-6">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center text-white/40">
              Following list coming soon.
            </div>
          </TabsContent>
        </>
      )}
    </Tabs>
  )
}