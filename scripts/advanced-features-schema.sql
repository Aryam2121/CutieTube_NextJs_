-- Create live streaming tables
CREATE TABLE IF NOT EXISTS live_streams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  stream_key TEXT UNIQUE NOT NULL,
  is_live BOOLEAN DEFAULT false,
  viewer_count INTEGER DEFAULT 0,
  chat_enabled BOOLEAN DEFAULT true,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  ended_at TIMESTAMP WITH TIME ZONE
);

-- Create stream chat table
CREATE TABLE IF NOT EXISTS stream_chat (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stream_id UUID REFERENCES live_streams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  is_super_chat BOOLEAN DEFAULT false,
  amount DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create subscription tiers table
CREATE TABLE IF NOT EXISTS subscription_tiers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  channel_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  benefits TEXT[] NOT NULL,
  color TEXT DEFAULT 'blue',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create channel subscriptions table
CREATE TABLE IF NOT EXISTS channel_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  subscriber_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  channel_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  tier_id UUID REFERENCES subscription_tiers(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('active', 'cancelled', 'expired')) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(subscriber_id, channel_id)
);

-- Create donations table
CREATE TABLE IF NOT EXISTS donations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  recipient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  message TEXT,
  is_anonymous BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create video analytics table
CREATE TABLE IF NOT EXISTS video_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  video_id UUID REFERENCES videos(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  event_type TEXT CHECK (event_type IN ('view', 'like', 'share', 'comment', 'watch_time')) NOT NULL,
  watch_duration INTEGER, -- in seconds
  device_type TEXT,
  country_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  data JSONB,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create content reports table
CREATE TABLE IF NOT EXISTS content_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reporter_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  content_type TEXT CHECK (content_type IN ('video', 'comment', 'user')) NOT NULL,
  content_id UUID NOT NULL,
  reason TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('pending', 'reviewed', 'resolved', 'rejected')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS for new tables
ALTER TABLE live_streams ENABLE ROW LEVEL SECURITY;
ALTER TABLE stream_chat ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE channel_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_reports ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Live streams are viewable by everyone" ON live_streams FOR SELECT USING (true);
CREATE POLICY "Users can manage their own live streams" ON live_streams FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Stream chat is viewable by everyone" ON stream_chat FOR SELECT USING (true);
CREATE POLICY "Users can send chat messages" ON stream_chat FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Subscription tiers are viewable by everyone" ON subscription_tiers FOR SELECT USING (true);
CREATE POLICY "Users can manage their own subscription tiers" ON subscription_tiers FOR ALL USING (auth.uid() = channel_id);

CREATE POLICY "Users can view their own subscriptions" ON channel_subscriptions FOR SELECT USING (auth.uid() = subscriber_id OR auth.uid() = channel_id);
CREATE POLICY "Users can manage their own subscriptions" ON channel_subscriptions FOR ALL USING (auth.uid() = subscriber_id);

CREATE POLICY "Users can view donations they sent or received" ON donations FOR SELECT USING (auth.uid() = donor_id OR auth.uid() = recipient_id);
CREATE POLICY "Users can send donations" ON donations FOR INSERT WITH CHECK (auth.uid() = donor_id);

CREATE POLICY "Video analytics are viewable by video owners" ON video_analytics FOR SELECT USING (
  EXISTS (SELECT 1 FROM videos WHERE videos.id = video_analytics.video_id AND videos.user_id = auth.uid())
);
CREATE POLICY "Analytics can be inserted by anyone" ON video_analytics FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Content reports are viewable by moderators and reporters" ON content_reports FOR SELECT USING (auth.uid() = reporter_id);
CREATE POLICY "Users can create content reports" ON content_reports FOR INSERT WITH CHECK (auth.uid() = reporter_id);
