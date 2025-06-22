-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON videos FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_playlists_updated_at BEFORE UPDATE ON playlists FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_content_reports_updated_at BEFORE UPDATE ON content_reports FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Function to update video counts
CREATE OR REPLACE FUNCTION update_video_counts()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE profiles SET video_count = video_count + 1 WHERE id = NEW.user_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE profiles SET video_count = video_count - 1 WHERE id = OLD.user_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

-- Create trigger for video counts
CREATE TRIGGER update_video_counts_trigger
    AFTER INSERT OR DELETE ON videos
    FOR EACH ROW EXECUTE PROCEDURE update_video_counts();

-- Function to update subscriber counts
CREATE OR REPLACE FUNCTION update_subscriber_counts()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE profiles SET subscriber_count = subscriber_count + 1 WHERE id = NEW.channel_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE profiles SET subscriber_count = subscriber_count - 1 WHERE id = OLD.channel_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

-- Create trigger for subscriber counts
CREATE TRIGGER update_subscriber_counts_trigger
    AFTER INSERT OR DELETE ON subscriptions
    FOR EACH ROW EXECUTE PROCEDURE update_subscriber_counts();

-- Function to update video likes/dislikes
CREATE OR REPLACE FUNCTION update_video_likes()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        IF NEW.is_like THEN
            UPDATE videos SET likes = likes + 1 WHERE id = NEW.video_id;
        ELSE
            UPDATE videos SET dislikes = dislikes + 1 WHERE id = NEW.video_id;
        END IF;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        IF OLD.is_like THEN
            UPDATE videos SET likes = likes - 1 WHERE id = OLD.video_id;
        ELSE
            UPDATE videos SET dislikes = dislikes - 1 WHERE id = OLD.video_id;
        END IF;
        RETURN OLD;
    ELSIF TG_OP = 'UPDATE' THEN
        IF OLD.is_like != NEW.is_like THEN
            IF NEW.is_like THEN
                UPDATE videos SET likes = likes + 1, dislikes = dislikes - 1 WHERE id = NEW.video_id;
            ELSE
                UPDATE videos SET likes = likes - 1, dislikes = dislikes + 1 WHERE id = NEW.video_id;
            END IF;
        END IF;
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

-- Create trigger for video likes
CREATE TRIGGER update_video_likes_trigger
    AFTER INSERT OR UPDATE OR DELETE ON video_likes
    FOR EACH ROW EXECUTE PROCEDURE update_video_likes();

-- Function to update comment likes/dislikes
CREATE OR REPLACE FUNCTION update_comment_likes()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        IF NEW.is_like THEN
            UPDATE comments SET likes = likes + 1 WHERE id = NEW.comment_id;
        ELSE
            UPDATE comments SET dislikes = dislikes + 1 WHERE id = NEW.comment_id;
        END IF;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        IF OLD.is_like THEN
            UPDATE comments SET likes = likes - 1 WHERE id = OLD.comment_id;
        ELSE
            UPDATE comments SET dislikes = dislikes - 1 WHERE id = OLD.comment_id;
        END IF;
        RETURN OLD;
    ELSIF TG_OP = 'UPDATE' THEN
        IF OLD.is_like != NEW.is_like THEN
            IF NEW.is_like THEN
                UPDATE comments SET likes = likes + 1, dislikes = dislikes - 1 WHERE id = NEW.comment_id;
            ELSE
                UPDATE comments SET likes = likes - 1, dislikes = dislikes + 1 WHERE id = NEW.comment_id;
            END IF;
        END IF;
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

-- Create trigger for comment likes
CREATE TRIGGER update_comment_likes_trigger
    AFTER INSERT OR UPDATE OR DELETE ON comment_likes
    FOR EACH ROW EXECUTE PROCEDURE update_comment_likes();

-- Function to update playlist video counts
CREATE OR REPLACE FUNCTION update_playlist_counts()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE playlists SET video_count = video_count + 1 WHERE id = NEW.playlist_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE playlists SET video_count = video_count - 1 WHERE id = OLD.playlist_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

-- Create trigger for playlist counts
CREATE TRIGGER update_playlist_counts_trigger
    AFTER INSERT OR DELETE ON playlist_videos
    FOR EACH ROW EXECUTE PROCEDURE update_playlist_counts();

-- Function to calculate trending scores
CREATE OR REPLACE FUNCTION calculate_trending_score(
    video_views BIGINT,
    video_likes INTEGER,
    video_comments INTEGER,
    upload_date TIMESTAMP WITH TIME ZONE
)
RETURNS DECIMAL AS $$
DECLARE
    hours_since_upload DECIMAL;
    engagement_rate DECIMAL;
    time_decay DECIMAL;
    trending_score DECIMAL;
BEGIN
    -- Calculate hours since upload
    hours_since_upload := EXTRACT(EPOCH FROM (NOW() - upload_date)) / 3600;
    
    -- Calculate engagement rate (likes + comments per view)
    IF video_views > 0 THEN
        engagement_rate := (video_likes + video_comments)::DECIMAL / video_views;
    ELSE
        engagement_rate := 0;
    END IF;
    
    -- Apply time decay (newer videos get higher scores)
    time_decay := EXP(-hours_since_upload / 24.0); -- Decay over 24 hours
    
    -- Calculate final trending score
    trending_score := (video_views * 0.6 + video_likes * 10 + video_comments * 20) * engagement_rate * time_decay;
    
    RETURN trending_score;
END;
$$ language 'plpgsql';
