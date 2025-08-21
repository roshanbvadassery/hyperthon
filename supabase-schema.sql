-- Hyperthon Registration Database Schema
-- Run this in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Cities table
CREATE TABLE cities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  date DATE NOT NULL,
  venue TEXT NOT NULL,
  available BOOLEAN DEFAULT true,
  max_capacity INTEGER DEFAULT 100,
  current_registrations INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Registrations table
CREATE TABLE registrations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  telegram TEXT,
  city TEXT NOT NULL REFERENCES cities(name) ON UPDATE CASCADE,
  experience_level TEXT NOT NULL CHECK (experience_level IN ('Beginner (0-1 years)', 'Intermediate (1-3 years)', 'Advanced (3-5 years)', 'Expert (5+ years)')),
  preferred_languages TEXT[] DEFAULT '{}',
  github_profile TEXT,
  linkedin_profile TEXT,
  agreed_to_terms BOOLEAN DEFAULT false NOT NULL,
  agreed_to_marketing BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Function to increment city registrations
CREATE OR REPLACE FUNCTION increment_city_registrations(city_name TEXT)
RETURNS void AS $$
BEGIN
  UPDATE cities 
  SET current_registrations = current_registrations + 1,
      updated_at = NOW()
  WHERE name = city_name;
END;
$$ LANGUAGE plpgsql;

-- Function to decrement city registrations (for deletions)
CREATE OR REPLACE FUNCTION decrement_city_registrations(city_name TEXT)
RETURNS void AS $$
BEGIN
  UPDATE cities 
  SET current_registrations = GREATEST(current_registrations - 1, 0),
      updated_at = NOW()
  WHERE name = city_name;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply the trigger to both tables
CREATE TRIGGER update_cities_updated_at 
  BEFORE UPDATE ON cities 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_registrations_updated_at 
  BEFORE UPDATE ON registrations 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Insert initial cities data
INSERT INTO cities (name, date, venue, available, max_capacity) VALUES
  ('Bangalore', '2025-08-10', 'Zo House', true, 150),
  ('Goa', '2025-08-16', 'Stay Vista', true, 100),
  ('Mumbai', '2025-08-17', 'TBD', false, 200),
  ('Pune', '2025-08-23', 'TBD', false, 120),
  ('Ahmedabad', '2025-08-24', 'TBD', false, 100),
  ('Delhi / Gurgaon', '2025-08-30', 'TBD', false, 180),
  ('Jaipur', '2025-08-31', 'Jaipur University', true, 120),
  ('Kochi', '2025-09-06', 'TBD', false, 80),
  ('Hyderabad', '2025-09-15', 'TBD', false, 150);

-- Create indexes for better performance
CREATE INDEX idx_registrations_email ON registrations(email);
CREATE INDEX idx_registrations_city ON registrations(city);
CREATE INDEX idx_registrations_created_at ON registrations(created_at);
CREATE INDEX idx_cities_name ON cities(name);
CREATE INDEX idx_cities_available ON cities(available);

-- Row Level Security (RLS) policies
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;

-- Policy for registrations - allow insert for everyone, select for authenticated users
CREATE POLICY "Anyone can register" ON registrations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can view registrations" ON registrations
  FOR SELECT USING (auth.role() = 'authenticated');

-- Policy for cities - allow select for everyone
CREATE POLICY "Anyone can view cities" ON cities
  FOR SELECT USING (true);

-- Admin policy (for service role)
CREATE POLICY "Service role can do everything on registrations" ON registrations
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can do everything on cities" ON cities
  FOR ALL USING (auth.role() = 'service_role');

-- Create a view for registration statistics
CREATE OR REPLACE VIEW registration_stats AS
SELECT 
  c.name as city,
  c.date,
  c.venue,
  c.available,
  c.max_capacity,
  c.current_registrations,
  ROUND((c.current_registrations::NUMERIC / c.max_capacity * 100), 2) as fill_percentage
FROM cities c
ORDER BY c.date;

-- Grant access to the view
GRANT SELECT ON registration_stats TO anon, authenticated;

-- Create a function to get registration analytics
CREATE OR REPLACE FUNCTION get_registration_analytics()
RETURNS TABLE (
  total_registrations BIGINT,
  registrations_today BIGINT,
  registrations_this_week BIGINT,
  most_popular_city TEXT,
  avg_registrations_per_day NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  WITH stats AS (
    SELECT 
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE DATE(created_at) = CURRENT_DATE) as today,
      COUNT(*) FILTER (WHERE created_at >= DATE_TRUNC('week', CURRENT_DATE)) as this_week,
      city,
      DATE(created_at) as reg_date
    FROM registrations
    GROUP BY city, DATE(created_at)
  ),
  city_counts AS (
    SELECT city, COUNT(*) as city_total
    FROM registrations
    GROUP BY city
    ORDER BY city_total DESC
    LIMIT 1
  ),
  daily_avg AS (
    SELECT AVG(daily_count) as avg_daily
    FROM (
      SELECT DATE(created_at), COUNT(*) as daily_count
      FROM registrations
      GROUP BY DATE(created_at)
    ) daily_stats
  )
  SELECT 
    (SELECT COUNT(*) FROM registrations)::BIGINT,
    (SELECT COUNT(*) FROM registrations WHERE DATE(created_at) = CURRENT_DATE)::BIGINT,
    (SELECT COUNT(*) FROM registrations WHERE created_at >= DATE_TRUNC('week', CURRENT_DATE))::BIGINT,
    (SELECT city FROM city_counts),
    (SELECT ROUND(avg_daily::NUMERIC, 2) FROM daily_avg);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION get_registration_analytics() TO anon, authenticated;

-- VOTING SYSTEM SCHEMA
-- ====================

-- Voting rounds table
CREATE TABLE voting_rounds (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT false,
  is_registration_open BOOLEAN DEFAULT true,
  is_voting_open BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Voting participants table
CREATE TABLE voting_participants (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  round_id UUID NOT NULL REFERENCES voting_rounds(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(round_id, name)
);

-- Votes table
CREATE TABLE votes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  round_id UUID NOT NULL REFERENCES voting_rounds(id) ON DELETE CASCADE,
  voter_name TEXT NOT NULL,
  voted_for_id UUID NOT NULL REFERENCES voting_participants(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(round_id, voter_name)
);

-- Add updated_at triggers for voting tables
CREATE TRIGGER update_voting_rounds_updated_at 
  BEFORE UPDATE ON voting_rounds 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for voting tables
CREATE INDEX idx_voting_participants_round_id ON voting_participants(round_id);
CREATE INDEX idx_votes_round_id ON votes(round_id);
CREATE INDEX idx_votes_voted_for_id ON votes(voted_for_id);
CREATE INDEX idx_votes_voter_name ON votes(voter_name);

-- RLS policies for voting tables
ALTER TABLE voting_rounds ENABLE ROW LEVEL SECURITY;
ALTER TABLE voting_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Anyone can view active rounds and participants
CREATE POLICY "Anyone can view voting rounds" ON voting_rounds
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view participants" ON voting_participants
  FOR SELECT USING (true);

-- Anyone can register as participant (when registration is open)
CREATE POLICY "Anyone can register as participant" ON voting_participants
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM voting_rounds 
      WHERE id = round_id AND is_registration_open = true
    )
  );

-- Anyone can vote (when voting is open and they haven't voted yet)
CREATE POLICY "Anyone can vote" ON votes
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM voting_rounds 
      WHERE id = round_id AND is_voting_open = true
    )
  );

-- Service role can do everything on voting tables
CREATE POLICY "Service role can do everything on voting_rounds" ON voting_rounds
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can do everything on voting_participants" ON voting_participants
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can do everything on votes" ON votes
  FOR ALL USING (auth.role() = 'service_role');

-- View for voting results
CREATE OR REPLACE VIEW voting_results AS
SELECT 
  vr.id as round_id,
  vr.name as round_name,
  vp.id as participant_id,
  vp.name as participant_name,
  COUNT(v.id) as vote_count
FROM voting_rounds vr
LEFT JOIN voting_participants vp ON vr.id = vp.round_id
LEFT JOIN votes v ON vp.id = v.voted_for_id
GROUP BY vr.id, vr.name, vp.id, vp.name
ORDER BY vr.created_at DESC, COUNT(v.id) DESC;

-- Grant access to the voting results view
GRANT SELECT ON voting_results TO anon, authenticated; 