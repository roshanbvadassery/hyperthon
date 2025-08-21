-- Voting System Schema (Standalone)
-- Run this in your Supabase SQL Editor if you only want the voting system

-- Enable necessary extensions (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the update function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

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