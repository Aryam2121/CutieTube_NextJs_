-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Videos policies
CREATE POLICY "Public videos are viewable by everyone" ON videos FOR SELECT USING (
  visibility = 'public' AND status = 'published' OR auth.uid() = user_id
);
CREATE POLICY "Users can insert their own videos" ON videos FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own videos" ON videos FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own videos" ON videos FOR DELETE USING (auth.uid() = user_id);

-- Playlists policies
CREATE POLICY "Public playlists are viewable by everyone" ON playlists FOR SELECT USING (
  is_public = true OR auth.uid() = user_id
);
CREATE POLICY "Users can insert their own playlists" ON playlists FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own playlists" ON playlists FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own playlists" ON playlists FOR DELETE USING (auth.uid() = user_id);

-- Playlist videos policies
CREATE POLICY "Playlist videos are viewable based on playlist visibility" ON playlist_videos FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM playlists 
    WHERE playlists.id = playlist_videos.playlist_id 
    AND (playlists.is_public = true OR playlists.user_id = auth.uid())
  )
);
CREATE POLICY "Users can manage their own playlist videos" ON playlist_videos FOR ALL USING (
  EXISTS (
    SELECT 1 FROM playlists 
    WHERE playlists.id = playlist_videos.playlist_id 
    AND playlists.user_id = auth.uid()
  )
);

-- Comments policies
CREATE POLICY "Comments are viewable by everyone" ON comments FOR SELECT USING (true);
CREATE POLICY "Users can insert their own comments" ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own comments" ON comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own comments" ON comments FOR DELETE USING (auth.uid() = user_id);

-- Subscriptions policies
CREATE POLICY "Users can view their own subscriptions" ON subscriptions FOR SELECT USING (
  auth.uid() = subscriber_id OR auth.uid() = channel_id
);
CREATE POLICY "Users can manage their own subscriptions" ON subscriptions FOR ALL USING (auth.uid() = subscriber_id);

-- Video likes policies
CREATE POLICY "Video likes are viewable by everyone" ON video_likes FOR SELECT USING (true);
CREATE POLICY "Users can manage their own video likes" ON video_likes FOR ALL USING (auth.uid() = user_id);

-- Comment likes policies
CREATE POLICY "Comment likes are viewable by everyone" ON comment_likes FOR SELECT USING (true);
CREATE POLICY "Users can manage their own comment likes" ON comment_likes FOR ALL USING (auth.uid() = user_id);

-- Watch history policies
CREATE POLICY "Users can view their own watch history" ON watch_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own watch history" ON watch_history FOR ALL USING (auth.uid() = user_id);

-- Watch later policies
CREATE POLICY "Users can view their own watch later list" ON watch_later FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own watch later list" ON watch_later FOR ALL USING (auth.uid() = user_id);

-- Downloads policies
CREATE POLICY "Users can view their own downloads" ON downloads FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own downloads" ON downloads FOR ALL USING (auth.uid() = user_id);

-- Live streams policies
CREATE POLICY "Live streams are viewable by everyone" ON live_streams FOR SELECT USING (true);
CREATE POLICY "Users can manage their own live streams" ON live_streams FOR ALL USING (auth.uid() = user_id);

-- Stream chat policies
CREATE POLICY "Stream chat is viewable by everyone" ON stream_chat FOR SELECT USING (true);
CREATE POLICY "Users can send chat messages" ON stream_chat FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Subscription tiers policies
CREATE POLICY "Subscription tiers are viewable by everyone" ON subscription_tiers FOR SELECT USING (true);
CREATE POLICY "Users can manage their own subscription tiers" ON subscription_tiers FOR ALL USING (auth.uid() = channel_id);

-- Channel subscriptions policies
CREATE POLICY "Users can view their own channel subscriptions" ON channel_subscriptions FOR SELECT USING (
  auth.uid() = subscriber_id OR auth.uid() = channel_id
);
CREATE POLICY "Users can manage their own channel subscriptions" ON channel_subscriptions FOR ALL USING (
  auth.uid() = subscriber_id
);

-- Donations policies
CREATE POLICY "Users can view donations they sent or received" ON donations FOR SELECT USING (
  auth.uid() = donor_id OR auth.uid() = recipient_id
);
CREATE POLICY "Users can send donations" ON donations FOR INSERT WITH CHECK (auth.uid() = donor_id);

-- Video analytics policies
CREATE POLICY "Video analytics are viewable by video owners" ON video_analytics FOR SELECT USING (
  EXISTS (SELECT 1 FROM videos WHERE videos.id = video_analytics.video_id AND videos.user_id = auth.uid())
);
CREATE POLICY "Analytics can be inserted by anyone" ON video_analytics FOR INSERT WITH CHECK (true);

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- Content reports policies
CREATE POLICY "Content reports are viewable by reporters and moderators" ON content_reports FOR SELECT USING (
  auth.uid() = reporter_id OR auth.uid() = moderator_id
);
CREATE POLICY "Users can create content reports" ON content_reports FOR INSERT WITH CHECK (auth.uid() = reporter_id);

-- Search history policies
CREATE POLICY "Users can view their own search history" ON search_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own search history" ON search_history FOR ALL USING (auth.uid() = user_id);

-- Trending videos policies
CREATE POLICY "Trending videos are viewable by everyone" ON trending_videos FOR SELECT USING (true);
