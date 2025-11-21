"use client"

import { ShortsPlayer } from "@/components/shorts-player"

// Mock data - replace with actual API calls
const mockShorts = [
  {
    id: "short-1",
    videoUrl: "/shorts/video1.mp4",
    title: "Amazing cooking trick! 🍳",
    description: "This changed my life! Quick and easy cooking hack you need to try #cooking #foodhack",
    likes: 125000,
    comments: 3420,
    shares: 8900,
    channel: {
      name: "FoodMaster",
      avatar: "/placeholder.svg?text=FM",
      isVerified: true,
    },
    music: {
      name: "Cooking Vibes",
      artist: "Kitchen Beats",
    },
  },
  {
    id: "short-2",
    videoUrl: "/shorts/video2.mp4",
    title: "Mind-blowing magic trick ✨",
    description: "Can you figure out how I did this? Comment your guesses below! #magic #illusion",
    likes: 89000,
    comments: 2150,
    shares: 5600,
    channel: {
      name: "MagicMike",
      avatar: "/placeholder.svg?text=MM",
      isVerified: true,
    },
    music: {
      name: "Mystery Theme",
      artist: "Enchanted",
    },
  },
  {
    id: "short-3",
    videoUrl: "/shorts/video3.mp4",
    title: "Cute puppy compilation 🐕",
    description: "These puppies will make your day! Which one is your favorite? #dogs #cute #puppies",
    likes: 245000,
    comments: 5890,
    shares: 12300,
    channel: {
      name: "PawsomePets",
      avatar: "/placeholder.svg?text=PP",
      isVerified: false,
    },
  },
  {
    id: "short-4",
    videoUrl: "/shorts/video4.mp4",
    title: "Quick fitness routine 💪",
    description: "5-minute workout you can do anywhere! No equipment needed #fitness #workout #health",
    likes: 67000,
    comments: 1240,
    shares: 3400,
    channel: {
      name: "FitLife",
      avatar: "/placeholder.svg?text=FL",
      isVerified: true,
    },
    music: {
      name: "Workout Pump",
      artist: "Gym Beats",
    },
  },
  {
    id: "short-5",
    videoUrl: "/shorts/video5.mp4",
    title: "Travel destination goals 🌴",
    description: "Would you visit this place? Tag someone you'd take here! #travel #vacation #paradise",
    likes: 189000,
    comments: 4320,
    shares: 9800,
    channel: {
      name: "WanderlustWorld",
      avatar: "/placeholder.svg?text=WW",
      isVerified: true,
    },
    music: {
      name: "Tropical Vibes",
      artist: "Island Dreams",
    },
  },
]

export default function ShortsPage() {
  return (
    <div className="h-screen w-full bg-black overflow-hidden">
      <ShortsPlayer shorts={mockShorts} />
    </div>
  )
}
