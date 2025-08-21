-- ===============================================
-- VOTING SYSTEM - COMPLETE SQL SCHEMA
-- ===============================================
-- Copy and paste this entire file into your Supabase SQL Editor
-- This creates everything needed for the blind voting system

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===============================================
-- UTILITY FUNCTIONS
-- ===============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ===============================================
-- VOTING TABLES
-- ===============================================

-- Voting rounds table
CREATE TABLE IF NOT EXISTS voting_rounds (
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
CREATE TABLE IF NOT EXISTS voting_participants (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  round_id UUID NOT NULL REFERENCES voting_rounds(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(round_id, name)
);

-- Votes table
CREATE TABLE IF NOT EXISTS votes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  round_id UUID NOT NULL REFERENCES voting_rounds(id) ON DELETE CASCADE,
  voter_name TEXT NOT NULL,
  voted_for_id UUID NOT NULL REFERENCES voting_participants(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(round_id, voter_name)
);

-- ===============================================
-- TRIGGERS
-- ===============================================

-- Add updated_at trigger for voting_rounds
DROP TRIGGER IF EXISTS update_voting_rounds_updated_at ON voting_rounds;
CREATE TRIGGER update_voting_rounds_updated_at 
  BEFORE UPDATE ON voting_rounds 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- ===============================================
-- INDEXES FOR PERFORMANCE
-- ===============================================

-- Indexes for voting_participants
CREATE INDEX IF NOT EXISTS idx_voting_participants_round_id ON voting_participants(round_id);
CREATE INDEX IF NOT EXISTS idx_voting_participants_name ON voting_participants(name);

-- Indexes for votes
CREATE INDEX IF NOT EXISTS idx_votes_round_id ON votes(round_id);
CREATE INDEX IF NOT EXISTS idx_votes_voted_for_id ON votes(voted_for_id);
CREATE INDEX IF NOT EXISTS idx_votes_voter_name ON votes(voter_name);

-- Indexes for voting_rounds
CREATE INDEX IF NOT EXISTS idx_voting_rounds_active ON voting_rounds(is_active);
CREATE INDEX IF NOT EXISTS idx_voting_rounds_registration ON voting_rounds(is_registration_open);
CREATE INDEX IF NOT EXISTS idx_voting_rounds_voting ON voting_rounds(is_voting_open);

-- ===============================================
-- ROW LEVEL SECURITY (RLS)
-- ===============================================

-- Enable RLS on all voting tables
ALTER TABLE voting_rounds ENABLE ROW LEVEL SECURITY;
ALTER TABLE voting_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- ===============================================
-- RLS POLICIES
-- ===============================================

-- Voting Rounds Policies
DROP POLICY IF EXISTS "Anyone can view voting rounds" ON voting_rounds;
CREATE POLICY "Anyone can view voting rounds" ON voting_rounds
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service role can do everything on voting_rounds" ON voting_rounds;
CREATE POLICY "Service role can do everything on voting_rounds" ON voting_rounds
  FOR ALL USING (auth.role() = 'service_role');

-- Voting Participants Policies
DROP POLICY IF EXISTS "Anyone can view participants" ON voting_participants;
CREATE POLICY "Anyone can view participants" ON voting_participants
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can register as participant" ON voting_participants;
CREATE POLICY "Anyone can register as participant" ON voting_participants
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM voting_rounds 
      WHERE id = round_id AND is_registration_open = true
    )
  );

DROP POLICY IF EXISTS "Service role can do everything on voting_participants" ON voting_participants;
CREATE POLICY "Service role can do everything on voting_participants" ON voting_participants
  FOR ALL USING (auth.role() = 'service_role');

-- Votes Policies
DROP POLICY IF EXISTS "Anyone can vote" ON votes;
CREATE POLICY "Anyone can vote" ON votes
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM voting_rounds 
      WHERE id = round_id AND is_voting_open = true
    )
  );

DROP POLICY IF EXISTS "Service role can do everything on votes" ON votes;
CREATE POLICY "Service role can do everything on votes" ON votes
  FOR ALL USING (auth.role() = 'service_role');

-- ===============================================
-- VIEWS FOR RESULTS
-- ===============================================

-- Drop existing view if it exists
DROP VIEW IF EXISTS voting_results;

-- Create voting results view
CREATE VIEW voting_results AS
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

-- ===============================================
-- PERMISSIONS
-- ===============================================

-- Grant access to the voting results view
GRANT SELECT ON voting_results TO anon, authenticated;

-- Grant usage on sequences (needed for inserts)
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- ===============================================
-- SAMPLE DATA (OPTIONAL - REMOVE IF NOT NEEDED)
-- ===============================================

-- Uncomment the lines below if you want to create a sample voting round for testing

-- INSERT INTO voting_rounds (name, description, is_active, is_registration_open) 
-- VALUES ('Test Speed Coding Round', 'A sample voting round for testing the system', true, true);

-- ===============================================
-- VERIFICATION QUERIES
-- ===============================================

-- Run these queries after executing the schema to verify everything is working:

-- 1. Check if tables exist
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE 'voting_%';

-- 2. Check if indexes exist
-- SELECT indexname FROM pg_indexes WHERE tablename LIKE 'voting_%';

-- 3. Check if policies exist
-- SELECT schemaname, tablename, policyname FROM pg_policies WHERE tablename LIKE 'voting_%';

-- 4. Test the view
-- SELECT * FROM voting_results LIMIT 5;

-- ===============================================
-- END OF VOTING SYSTEM SCHEMA
-- =============================================== 